from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputData(BaseModel):
    data: list

@app.get("/")
async def root():
    return {"message": "ML Service is running"}

@app.post("/predict")
async def predict(input_data: InputData):
    # Placeholder prediction logic (will be replaced with actual ML model later)
    df = pd.DataFrame(input_data.data)
    
    # Simple mock prediction: increase biomass by 10%
    predictions = []
    for _, row in df.iterrows():
        if 'biomass' in row:
            predictions.append(float(row['biomass']) * 1.1)
        else:
            predictions.append(100.0)  # default value
    
    return {"predicted_biomass": predictions, "message": "Prediction successful"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
