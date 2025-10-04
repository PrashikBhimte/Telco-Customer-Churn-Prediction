import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    with open("model_training/stacked_churn_model.pkl", "rb") as f:
        model = joblib.load(f)

    with open("model_training/scaler.pkl", "rb") as f:
        scaler = joblib.load(f)
        
    with open("model_training/training_columns.pkl", "rb") as f:
        training_columns = joblib.load(f)
except FileNotFoundError as e:
    raise RuntimeError(f"Could not load a required model artifact: {e}. Please ensure model_training/ has been run and .pkl files are present.")


class CustomerData(BaseModel):
    gender: str
    SeniorCitizen: int
    Partner: str
    Dependents: str
    tenure: int
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str
    MonthlyCharges: float
    TotalCharges: float


@app.get("/")
def read_root():
    return {"message": "Welcome to the Churn Prediction API"}


@app.post("/predict")
def predict_churn(customer_data: CustomerData):
    try:
        input_df = pd.DataFrame([customer_data.dict()])

        input_df['TotalCharges'] = pd.to_numeric(input_df['TotalCharges'], errors='coerce')
        input_df['TotalCharges'] = input_df['TotalCharges'].fillna(0)

        service_cols = [
            'PhoneService', 'MultipleLines', 'InternetService', 'OnlineSecurity', 
            'OnlineBackup', 'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies'
        ]
        input_df['ServicesUsed'] = input_df[service_cols].apply(lambda row: (row == 'Yes').sum(), axis=1)
        
        input_df['TenureInYears'] = input_df['tenure'] / 12
        
        input_df['MonthToTotalRatio'] = input_df['MonthlyCharges'] / (input_df['TotalCharges'] + 1)

        input_df = input_df.drop(columns=['tenure', 'MonthlyCharges', 'TotalCharges'])

        input_encoded = pd.get_dummies(input_df, drop_first=True)

        input_aligned = input_encoded.reindex(columns=training_columns, fill_value=False)

        numeric_features_fe = ['TenureInYears', 'MonthToTotalRatio']
        
        input_aligned[numeric_features_fe] = scaler.transform(input_aligned[numeric_features_fe])

        prediction = model.predict(input_aligned)
        probability = model.predict_proba(input_aligned)

        churn_status = "Yes" if prediction[0] == 1 else "No"
        churn_probability = float(probability[0][1])

        return {
            "prediction": churn_status,
            "probability": round(churn_probability * 100, 2)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
