# ml/train_model_xgb.py
import pandas as pd
import numpy as np
import json
import os
import joblib
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier

DATA_CSV = "../data/products.csv"
OUT_DIR = "."
MODEL_OUT = os.path.join(OUT_DIR, "model.pkl")
FEATURES_OUT = os.path.join(OUT_DIR, "feature_columns.json")

def load_products():
    df = pd.read_csv(DATA_CSV)
    numeric_cols = [
        'premium_yearly','sum_insured','min_age','max_age',
        'waiting_period_months','co_pay_percent'
    ]
    for c in numeric_cols:
        if c in df.columns:
            df[c] = pd.to_numeric(df[c], errors='coerce').fillna(0.0)
    return df

def list_field_to_set(s):
    if pd.isna(s) or s == "":
        return set()
    return set([x.strip().lower() for x in str(s).split("|")])

def make_user_profile():
    age = np.random.randint(18,65)
    gender = np.random.choice(['male','female'])
    budget = np.random.randint(4000,60000)
    dependents = np.random.choice([0,1,2])
    wants_maternity = (gender=='female' and age<=45 and np.random.rand()<0.3)
    preexisting = []
    if np.random.rand() < 0.2:
        preexisting = [np.random.choice(['diabetes','hypertension','thyroid'])]
    preferred = []
    if np.random.rand() < 0.7:
        preferred = [f"city hospital {chr(ord('a')+np.random.randint(0,12))}".title()]
    return {
        'age': int(age),
        'gender': str(gender),
        'annual_budget': float(budget),
        'dependents_count': int(dependents),
        'wants_maternity': bool(wants_maternity),
        'preexisting_conditions': preexisting,
        'preferred_hospitals': preferred,
        'location': 'Delhi'
    }

def build_features_for_pair(user, prod):
    prod_hosp = list_field_to_set(prod.get('network_hospitals',''))
    user_hosp = set([h.strip().lower() for h in user['preferred_hospitals']])
    overlap = len(prod_hosp & user_hosp)

    covers_preexist = 1 if str(prod.get('covers_preexisting','')).lower()=='yes' else 0
    covers_maternity = 1 if str(prod.get('covers_maternity','')).lower()=='yes' else 0
    family_policy = 1 if str(prod.get('policy_type','')).lower()=='family' else 0

    premium = float(prod.get('premium_yearly', 0.0))
    sum_ins = float(prod.get('sum_insured', 0.0))
    budget = float(user['annual_budget'])
    budget_ok = 1 if premium <= budget else 0
    budget_diff_rel = (budget - premium) / max(1.0, budget)

    age_eligible = 1 if (prod.get('min_age',0) <= user['age'] <= prod.get('max_age',999)) else 0
    value_ratio = sum_ins / max(1.0, premium)

    return {
        'budget_ok': budget_ok,
        'budget_diff_rel': budget_diff_rel,
        'age_eligible': age_eligible,
        'network_overlap': overlap,
        'covers_preexisting': covers_preexist,
        'covers_maternity': covers_maternity,
        'family_policy': family_policy,
        'dependents': float(user.get('dependents_count',0)),
        'wants_maternity': 1.0 if user.get('wants_maternity') else 0.0,
        'preexisting_count': float(len(user.get('preexisting_conditions',[]))),
        'value_ratio': value_ratio,
        'waiting_months': float(prod.get('waiting_period_months',0.0)),
        'co_pay': float(prod.get('co_pay_percent',0.0)),
        'premium': premium,
        'sum_insured': sum_ins
    }

def synthetic_label(user, prod, feats):
    score = 0.0
    score += 1.0 * feats['budget_ok']
    score += 0.8 * feats['age_eligible']
    if feats['preexisting_count'] > 0 and feats['covers_preexisting'] == 0:
        score -= 1.0
    if user['wants_maternity']:
        score += 0.5 * feats['covers_maternity']
    score += 0.2 * min(3, feats['network_overlap'])
    score += 0.1 * (feats['value_ratio'] / 10000.0)
    score += np.random.normal(0, 0.2)
    return 1 if score > 0.6 else 0

def generate_training_data(products, n=2000):
    rows = []
    for _ in range(n):
        user = make_user_profile()
        for _, prod in products.iterrows():
            feats = build_features_for_pair(user, prod)
            label = synthetic_label(user, prod, feats)
            feats['label'] = label
            rows.append(feats)
    return pd.DataFrame(rows)

def main():
    products = load_products()
    print("Products loaded:", len(products))
    dataset = generate_training_data(products, n=2000)  # adjust n if needed
    feature_cols = [c for c in dataset.columns if c != 'label']
    X = dataset[feature_cols].fillna(0.0)
    y = dataset['label'].astype(int)

    # Save feature list for API
    with open(FEATURES_OUT, "w") as f:
        json.dump(feature_cols, f)
    print("Features saved to", FEATURES_OUT)

    # Train an XGBoost classifier
    model = XGBClassifier(n_estimators=200, max_depth=6, use_label_encoder=False, eval_metric='auc', verbosity=0)
    model.fit(X, y)
    joblib.dump(model, MODEL_OUT)
    print("Model saved to:", MODEL_OUT)

if __name__ == "__main__":
    main()
