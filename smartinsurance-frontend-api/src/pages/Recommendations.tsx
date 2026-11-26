import React, { useState } from "react";
import "./Recommendations.css";

const RECO_API = "http://localhost:8000/recommend";

const clamp = (v:number, a=0, b=1) => Math.max(a, Math.min(b, v));

const scoreToPercent = (score:number) => {
  // If backend uses 0..1 scale, convert to percent; if already 0..100, normalize.
  if (score === null || score === undefined || isNaN(score)) return 0;
  if (score > 5) { // probably already 0..100
    return clamp(score, 0, 100);
  }
  return clamp(score * 100, 0, 100);
};

const Recommendations: React.FC = () => {
  const [age, setAge] = useState<number>(30);
  const [gender, setGender] = useState<string>("male");
  const [marital, setMarital] = useState<string>("single");
  const [budget, setBudget] = useState<number>(40000);
  const [dependents, setDependents] = useState<number>(0);
  const [prefHosp, setPrefHosp] = useState<string>("");
  const [wantsMaternity, setWantsMaternity] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [recs, setRecs] = useState<any[]>([]);

  const handleSubmit = async (e?:React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true); setError(""); setRecs([]); setNote("");
    try {
      const payload = {
        age,
        gender,
        annual_budget: budget,
        marital_status: marital,
        dependents_count: dependents,
        preexisting_conditions: [],
        preferred_hospitals: prefHosp.split(",").map(s=>s.trim()).filter(Boolean),
        location: "Delhi",
        wants_maternity: wantsMaternity,
        policy_type_preference: "any"
      };

      const res = await fetch(RECO_API, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API ${res.status}: ${text}`);
      }
      const data = await res.json();
      setNote(data.note || "");
      const normalized = (data.recommendations || []).map((r:any) => {
        // normalize common fields to UI keys
        const policy_name = r.product_name || r.policy_name || r.name || "Unnamed Policy";
        const premium = r.premium_yearly ?? r.premium ?? null;
        const coverage = r.sum_insured ?? r.coverage ?? null;
        const insurer = r.insurer ?? r.provider ?? "";
        const hospital_network = r.network_hospitals ?? r.hospital_network ?? (r.reasons ? r.reasons.join(", ") : "Not Provided");
        const score = (typeof r.score === "number") ? r.score : (r.score?.value ?? 0);
        const reasons = r.reasons || [];
        const policy_type = r.policy_type ?? "";
        return { policy_name, premium, coverage, insurer, hospital_network, score, reasons, policy_type };
      });
      setRecs(normalized);
    } catch (err:any) {
      console.error(err);
      setError(err.message || "Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rec-root">
      <header className="rec-header">
        <h1>Health Insurance Recommendations</h1>
        <p className="muted">Personalized plans based on your inputs</p>
      </header>

      <form className="rec-form" onSubmit={handleSubmit}>

        <div className="form-row">
          <label>Age</label>
          <input type="number" min={0} value={age} onChange={e=>setAge(Number(e.target.value))} />
        </div>

        <div className="form-row">
          <label>Gender</label>
          <select value={gender} onChange={e=>setGender(e.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-row">
          <label>Marital status</label>
          <select value={marital} onChange={e=>setMarital(e.target.value)}>
            <option value="single">Single</option>
            <option value="married">Married</option>
          </select>
        </div>

        <div className="form-row">
          <label>Annual budget (₹)</label>
          <input type="number" min={0} value={budget} onChange={e=>setBudget(Number(e.target.value))} />
        </div>

        <div className="form-row">
          <label>Dependents</label>
          <input type="number" min={0} value={dependents} onChange={e=>setDependents(Number(e.target.value))} />
        </div>

        <div className="form-row full">
          <label>Preferred hospitals (comma separated)</label>
          <input type="text" value={prefHosp} onChange={e=>setPrefHosp(e.target.value)} placeholder="City Hospital A, City Hospital B" />
        </div>

        <div className="form-row">
          <label>Maternity cover</label>
          <select value={String(wantsMaternity)} onChange={e=>setWantsMaternity(e.target.value === "true")}>
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="form-actions">
          <button className="btn-primary" type="submit" disabled={loading}>{loading ? "Searching..." : "Get Recommendations"}</button>
          <button type="button" className="btn-ghost" onClick={()=>{
            setRecs([]); setError(""); setNote("");
          }}>Clear</button>
        </div>
      </form>

      {note && <div className="info-note">{note}</div>}
      {error && <div className="error">{error}</div>}

      <section className="results">
        {recs.length === 0 ? (
          <div className="empty">No recommendations yet — fill the form and click <strong>Get Recommendations</strong>.</div>
        ) : (
          <>
            <div className="results-grid">
              {recs.map((r, i) => {
                const pct = scoreToPercent(Number(r.score));
                const scoreLabel = (pct>=99) ? `${pct.toFixed(0)}%` : `${pct.toFixed(1)}%`;
                return (
                  <article key={i} className="card">
                    <div className="card-head">
                      <div className="policy-title">{r.policy_name}</div>
                      <div className="badges">
                        {r.insurer && <span className="badge">{r.insurer}</span>}
                        {r.policy_type && <span className="badge light">{r.policy_type}</span>}
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="row"><strong>Premium:</strong> {r.premium ? `₹${Number(r.premium).toLocaleString()}` : "₹N/A"}</div>
                      <div className="row"><strong>Coverage:</strong> {r.coverage ? `₹${Number(r.coverage).toLocaleString()}` : "₹N/A"}</div>
                      <div className="row"><strong>Hospital Network:</strong> <span className="muted-small">{r.hospital_network || "Not Provided"}</span></div>

                      <div className="score-wrap">
                        <div className="score-left"><strong>Score:</strong> <span className="score-num">{typeof r.score === "number" ? r.score.toFixed(3) : String(r.score)}</span></div>
                        <div className="score-bar" aria-hidden>
                          <div className="score-fill" style={{width: `${pct}%`, background: `linear-gradient(90deg, #2ECC71, #2E86DE)`}} />
                        </div>
                        <div className="score-percent">{scoreLabel}</div>
                      </div>

                      {r.reasons && r.reasons.length>0 && (
                        <div className="reasons">
                          <strong>Reasons:</strong>
                          <ul>
                            {r.reasons.map((x:any, idx:number)=>(<li key={idx}>{String(x)}</li>))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Recommendations;
