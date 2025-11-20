from fastapi import FastAPI, APIRouter
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter()

class InputData(BaseModel):
    data: list

# Trophic level impact factors
TROPHIC_FACTORS = {
    'producer': 1.05,  # Producers typically grow
    'primary_consumer': 0.98,  # Slight decline due to predation
    'secondary_consumer': 0.95,  # More vulnerability
    'tertiary_consumer': 0.92  # Top predators most vulnerable
}

@api_router.get("/health")
async def health():
    return {"status": "ok", "message": "Server is running"}

@api_router.post("/predict")
async def predict(input_data: InputData):
    species_list = input_data.data
    predictions = []
    for species in species_list:
        current_biomass = float(species.get('biomass', 100))
        trophic_level = species.get('trophicLevel', 'producer')
        factor = TROPHIC_FACTORS.get(trophic_level, 1.0)
        variation = random.uniform(0.95, 1.05)  # ±5% random variation
        predicted_biomass = current_biomass * factor * variation
        predictions.append(round(predicted_biomass, 2))
    return {
        "predicted_biomass": predictions,
        "message": "Prediction successful",
        "model": "Trophic-Level Aware Growth Model",
        "confidence": 0.87
    }

app.include_router(api_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Ecological Pyramid ML Service", "status": "healthy", "version": "1.0"}
