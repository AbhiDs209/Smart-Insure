SMART INSURE


SmartInsurance – Personalized Insurance Recommendation System
SmartInsurance is a web-based insurance discovery and recommendation project. Users can explore insurance information, compare plans, and request personalized health-insurance recommendations based on details such as age, annual budget, dependents, preferred hospitals, and maternity-cover requirements.

The project combines a React + TypeScript frontend with a Python FastAPI backend. The recommendation API uses a trained machine-learning model when the model files are available and falls back to a rule-based scoring method otherwise.
Key Features
- Personalized recommendations: Submit a user profile to receive a ranked list of eligible insurance plans.
- Budget and age filtering: The API filters plans using the applicant's age and annual premium budget.
- Plan comparison and discovery: Frontend pages provide plan-comparison and insurance-information experiences.
- Recommendation details: Results can include insurer, annual premium, sum insured, policy type, hospital network, score, and explanation strings.
- ML-backed scoring: The API loads a serialized model and feature metadata when available.
- Fallback recommendations: A rule-based score is used if the model is unavailable or prediction fails.
- Health endpoint: A simple endpoint reports API status and the number of loaded products.
Tech Stack
Frontend
- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- shadcn/ui and Radix UI components
- TanStack React Query
Backend and Machine Learning
- Python
- FastAPI
- Uvicorn
- Pandas and NumPy
- scikit-learn
- Joblib
- XGBoost (required by the optional model-training script)
Project Structure
smartinsurance-full/
├── backend/
│   ├── app.py                   # FastAPI recommendation API
│   └── requirements.txt         # Backend Python dependencies
├── data/
│   └── products.csv             # Insurance product dataset
├── ml/
│   ├── model.pkl                # Serialized recommendation model
│   ├── feature_columns.json     # Feature order expected by the model
│   └── train_model_xgb.py       # Script to train the XGBoost model
└── smartinsurance-frontend-api/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── ...
    ├── package.json
    └── vite.config.ts
The archive used to prepare this README also contains local dependency and virtual-environment folders. These are not required to run the project; install dependencies using the steps below instead of committing node_modules or venv.

Getting Started
Prerequisites
Install the following before running the project:
- Python 3.10 or newer
- Node.js and npm
- Git
1. Clone the repository
git clone <YOUR_GIT_REPOSITORY_URL>
cd smartinsurance-full
Replace <YOUR_GIT_REPOSITORY_URL> with your Git repository URL. If your repository has a different root-folder name, use that folder name in the commands below.
2. Set up the backend
From the project root:
cd backend
python -m venv venv
Activate the virtual environment:

Windows (PowerShell):
.\venv\Scripts\Activate.ps1
Windows (Command Prompt):
venv\Scripts\activate
macOS / Linux:
source venv/bin/activate
Install the backend dependencies:
pip install -r requirements.txt
Start the API from the backend directory:
uvicorn app:app --reload --host 127.0.0.1 --port 8000
The backend uses relative paths (../data/products.csv and ../ml/) so run Uvicorn with backend/ as the working directory, as shown above.

The API will be available at:
- API base: http://127.0.0.1:8000
- Health check: http://127.0.0.1:8000/health
- Interactive API docs: http://127.0.0.1:8000/docs
3. Set up the frontend
Open a second terminal from the project root:
cd smartinsurance-frontend-api
npm install
npm run dev
Vite is configured to serve the frontend on port 8080:
http://localhost:8080
Keep the backend running in the first terminal while using the recommendation feature. The recommendation page currently sends requests to http://localhost:8000/recommend.
API Reference
GET /health
Checks whether the API is running and returns the number of insurance products loaded.

Example response:
{
  "status": "ok",
  "products_loaded": 25
}
The product count shown above is illustrative; the actual value depends on data/products.csv.
POST /recommend
Returns ranked insurance recommendations for a submitted user profile.

Example request:
{
  "age": 30,
  "gender": "male",
  "marital_status": "single",
  "annual_budget": 40000,
  "dependents_count": 0,
  "preexisting_conditions": [],
  "preferred_hospitals": ["City Hospital A"],
  "location": "Delhi",
  "wants_maternity": false,
  "policy_type_preference": "any"
}
Example cURL request:
curl -X POST "http://127.0.0.1:8000/recommend" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 30,
    "gender": "male",
    "marital_status": "single",
    "annual_budget": 40000,
    "dependents_count": 0,
    "preexisting_conditions": [],
    "preferred_hospitals": ["City Hospital A"],
    "location": "Delhi",
    "wants_maternity": false,
    "policy_type_preference": "any"
  }'
The endpoint accepts an optional top_n query parameter to control the maximum number of recommendations. For example: POST /recommend?top_n=3.

The response contains a note and a recommendations array. Each recommendation may include the product name, insurer, yearly premium, sum insured, policy type, hospital network, normalized score, and reason strings.
Machine-Learning Model
The API attempts to load:
- ml/model.pkl
- ml/feature_columns.json
If both files are present and load successfully, the API uses the model's predict_proba output to score candidate products. Otherwise, it uses the built-in rule-based scoring function.
Retraining the model (optional)
The training script generates synthetic user profiles and labels insurance-product pairs using a heuristic scoring function, then trains an XGBoost classifier.

To run it, install the training dependencies (including XGBoost):
pip install xgboost pandas numpy scikit-learn joblib
Run the script from the ml directory so its relative data and output paths resolve correctly:
cd ml
python train_model_xgb.py
This regenerates model.pkl and feature_columns.json. The API should then be restarted to load the updated files.
Important: The training script uses synthetically generated profiles and heuristic-generated labels. Its output is a project/demo recommendation model, not evidence of validated insurance suitability or real-world predictive performance.

Configuration Notes
- The frontend recommendation page currently uses http://localhost:8000/recommend as its API URL. Update RECO_API in src/pages/Recommendations.tsx if your backend is hosted elsewhere.
- The backend currently enables permissive CORS (allow_origins=["*"]). Restrict allowed origins before deploying publicly.
- The API's current request schema includes marital_status and policy_type_preference; the current recommendation logic does not use these fields to filter or score products.
- The recommendation form currently sends an empty list for preexisting_conditions.
- The current API filters by age and budget, and may relax the budget filter to 1.5 times the submitted budget when no exact matches are found.
Disclaimer
SmartInsurance is an educational/demo software project. Recommendations are generated from the dataset and scoring logic included in this repository. They are not financial, legal, or insurance advice. Always verify policy wording, exclusions, waiting periods, premiums, hospital networks, and eligibility directly with the insurer before purchasing a policy.
Contributing
Contributions are welcome:
1. Fork the repository.
2. Create a feature branch: git checkout -b feature/your-feature.
3. Commit your changes: git commit -m "Add your feature".
4. Push the branch: git push origin feature/your-feature.
5. Open a pull request.
License
No license file was present in the supplied project archive. Add a LICENSE file before distributing or reusing the project under specific open-source terms.
