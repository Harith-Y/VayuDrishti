model = None

try:
    from fastapi import FastAPI, HTTPException
    from pydantic import BaseModel, conlist
    import joblib
    import os
except ImportError as e:
    raise ImportError(f"Required dependency not found: {e}. Please ensure all dependencies are installed.") from e

app = FastAPI()

MODEL_PATH = 'model/aqi_forecast_model.pkl'

# Model loading with error handling
try:
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)
    else:
        print(f"Model file not found at {MODEL_PATH}")
except (FileNotFoundError, OSError) as e:
    print(f"Error loading model: {e}")
    model = None


class AQIInput(BaseModel):
    features: conlist(float, min_items=5, max_items=5)

@app.get('/')
def read_root():
    return {"message": "AQI Forecast API is running"}

@app.post('/predict')
def predict_aqi(payload: AQIInput):
    # No need for 'global model' here since we're only reading the variable
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded.")
    try:
        prediction = model.predict([payload.features])
        return {"prediction": prediction[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {e}") from e