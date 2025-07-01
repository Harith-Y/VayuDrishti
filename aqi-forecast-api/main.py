from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import os
from typing import List

app = FastAPI()

MODEL_PATH = 'model/aqi_forecast_model.pkl'

# Placeholder: Load model if exists
model = None
if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)

class AQIInput(BaseModel):
    features: List[float]

@app.get('/')
def read_root():
    return {"message": "AQI Forecast API is running"}

@app.post('/predict')
def predict_aqi(input: AQIInput):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded.")
    # Placeholder: Replace with actual preprocessing and prediction
    prediction = model.predict([input.features])
    return {"prediction": prediction[0]} 