from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import pandas as pd
import numpy as np
import joblib, json, os
from fastapi.middleware.cors import CORSMiddleware

PROD_CSV = "../data/products.csv"
MODEL_PATH = "../ml/model.pkl"
FEATURES_PATH = "../ml/feature_columns.json"

app = FastAPI(title="SmartInsurance ML Recommender")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# Load Products
# -----------------------
products_df = pd.read_csv(PROD_CSV)

num_cols = [
    "premium_yearly","sum_insured","min_age","max_age",
    "waiting_period_months","co_pay_percent"
]

for c in num_cols:
    products_df[c] = pd.to_numeric(products_df[c], errors="coerce").fillna(0.0)

# -----------------------
# Load Model
# -----------------------
model = None
feature_columns = None

if os.path.exists(MODEL_PATH) and os.path.exists(FEATURES_PATH):
    try:
        model = joblib.load(MODEL_PATH)
        with open(FEATURES_PATH, "r") as f:
            feature_columns = json.load(f)
        print("Loaded ML model and feature metadata.")
    except Exception as e:
        print("Model load error:", e)


def parse_list_field(s):
    if pd.isna(s) or s == "":
        return []
    return [x.strip().lower() for x in str(s).split("|")]


# -----------------------
# Request Model
# -----------------------
class UserReq(BaseModel):
    age: int
    gender: str
    marital_status: str
    annual_budget: float
    dependents_count: int = 0
    preexisting_conditions: List[str] = []
    preferred_hospitals: List[str] = []
    location: str = "Delhi"
    wants_maternity: bool = False
    policy_type_preference: str = "any"


# -----------------------
# Feature Builder
# -----------------------
def pair_features(user, prod):
    prod_hosp = set(parse_list_field(prod.get("network_hospitals","")))
    user_hosp = set([h.strip().lower() for h in user.get("preferred_hospitals",[])])
    overlap = len(prod_hosp & user_hosp)

    covers_preexist = 1 if str(prod.get("covers_preexisting","")).lower()=="yes" else 0
    covers_maternity = 1 if str(prod.get("covers_maternity","")).lower()=="yes" else 0
    family_policy = 1 if str(prod.get("policy_type","")).lower()=="family" else 0

    premium = float(prod.get("premium_yearly",0))
    sum_ins = float(prod.get("sum_insured",0))
    budget = float(user["annual_budget"])

    budget_ok = 1 if premium <= budget else 0
    budget_diff_rel = (budget - premium) / max(1.0, budget)

    age_ok = 1 if (prod["min_age"] <= user["age"] <= prod["max_age"]) else 0

    value_ratio = sum_ins / max(1.0, premium)

    return {
        "budget_ok": budget_ok,
        "budget_diff_rel": budget_diff_rel,
        "age_eligible": age_ok,
        "network_overlap": overlap,
        "covers_preexisting": covers_preexist,
        "covers_maternity": covers_maternity,
        "family_policy": family_policy,
        "dependents": user.get("dependents_count",0),
        "wants_maternity": 1 if user.get("wants_maternity") else 0,
        "preexisting_count": len(user.get("preexisting_conditions",[])),
        "value_ratio": value_ratio,
        "waiting_months": prod.get("waiting_period_months",0),
        "co_pay": prod.get("co_pay_percent",0),
        "premium": premium,
        "sum_insured": sum_ins
    }


# -----------------------
# Fallback Rule-Based Score
# -----------------------
def fallback_score(f):
    score = 0
    score += 0.35 * f["budget_ok"]
    score += 0.30 * min(1, f["network_overlap"] / 3)
    cov = 0
    if f["wants_maternity"] and f["covers_maternity"]: cov+=1
    if f["preexisting_count"]==0 or f["covers_preexisting"]: cov+=1
    if f["dependents"]>0 and f["family_policy"]: cov+=1
    score += 0.15 * (cov/3)
    score += 0.10 * min(1, f["value_ratio"] / 500)
    score += 0.10 * (1 - min(36, f["waiting_months"]) / 36)
    if f["co_pay"] > 20: score -= 0.02
    return max(0, score)


# -----------------------
# Main Recommendation API
# -----------------------
@app.post("/recommend")
def recommend(user: UserReq, top_n: int = 6):

    u = user.dict()

    df = products_df.copy()

    df = df[(df["min_age"] <= u["age"]) & (df["max_age"] >= u["age"])]
    df = df[df["premium_yearly"] <= u["annual_budget"]]

    if df.empty:
        df = products_df[(products_df["min_age"] <= u["age"]) & (products_df["max_age"] >= u["age"])]
        df = df[df["premium_yearly"] <= u["annual_budget"]*1.5]
        note = "No exact matches — relaxed budget filter applied."
    else:
        note = "Filtered by hard constraints."

    all_rows = []
    for _, prod in df.iterrows():
        feats = pair_features(u, prod)

        # ML score
        if model is not None:
            x = [feats.get(c,0.0) for c in feature_columns]
            try:
                raw = float(model.predict_proba([x])[0][1])
            except:
                raw = fallback_score(feats)
        else:
            raw = fallback_score(feats)

        all_rows.append({
            "product_name": prod["product_name"],
            "insurer": prod.get("insurer",""),
            "premium_yearly": prod["premium_yearly"],
            "sum_insured": prod["sum_insured"],
            "policy_type": prod.get("policy_type",""),
            "hospital_network": prod.get("network_hospitals",""),
            "raw": raw,
            "reasons": [
                f"Premium: ₹{int(prod['premium_yearly'])}",
                f"Coverage: ₹{int(prod['sum_insured'])}",
                f"Network hospitals: {prod.get('network_hospitals','')}"
            ]
        })

    # -----------------------
    # Normalize scores (fix 100% issue)
    # -----------------------
    raw_scores = [x["raw"] for x in all_rows]
    smin = min(raw_scores)
    smax = max(raw_scores)

    for r in all_rows:
        if smax == smin:
            r["score"] = 0.5
        else:
            r["score"] = (r["raw"] - smin) / (smax - smin)

    final = sorted(all_rows, key=lambda x: x["score"], reverse=True)[:top_n]

    return {
        "note": note,
        "recommendations": final
    }


@app.get("/health")
def health():
    return {"status": "ok", "products_loaded": len(products_df)}
