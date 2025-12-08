
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import random

# ============================================
# INITIALIZE FASTAPI APP
# ============================================

app = FastAPI(title="Eco Pyramid ML Service", version="1.0")

# Add CORS middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# TRY TO IMPORT CASCADE MODEL
# ============================================

cascade_model_available = False
try:
    from model.cascade_model import (
        analyze_cascade,
        analyze_invasive,
        predict_populations,
        assess_extinction_risks
    )
    cascade_model_available = True
    print("✅ Cascade model loaded successfully")
except ImportError as e:
    print(f"⚠️ Cascade model not available: {e}")
    print("⚠️ Falling back to basic prediction mode")

# ============================================
# PYDANTIC MODELS (Request/Response schemas)
# ============================================

class SpeciesData(BaseModel):
    """Species information from frontend"""
    name: str
    icon: str
    trophicLevel: str
    biomass: float
    energy: float
    population: float
    ecosystem: Optional[str] = "grassland"
    _id: Optional[str] = None

class CascadeAnalysisRequest(BaseModel):
    """Request for cascade effect analysis"""
    speciesArray: List[SpeciesData]
    targetSpecies: SpeciesData

class InvasiveSpeciesRequest(BaseModel):
    """Request for invasive species analysis"""
    currentSpecies: List[SpeciesData]
    invasiveSpecies: SpeciesData
    invasionStrength: int = 5

class PopulationTrajectoryRequest(BaseModel):
    """Request for population trajectory prediction"""
    species: List[SpeciesData]
    timeSteps: int = 12

class EcosystemHealthRequest(BaseModel):
    """Request for ecosystem health assessment"""
    species: List[SpeciesData]

class PredictionRequest(BaseModel):
    """Basic prediction request (original format)"""
    data: List[dict]

# ============================================
# BASIC PREDICTION FALLBACK
# ============================================

TROPHIC_FACTORS = {
    'producer': 1.05,
    'primary_consumer': 0.98,
    'secondary_consumer': 0.95,
    'tertiary_consumer': 0.92
}

def basic_predict(species_list):
    """Fallback prediction when ML model unavailable"""
    predictions = []
    for species in species_list:
        current_biomass = float(species.get('biomass', 100))
        trophic_level = species.get('trophicLevel', 'producer')
        factor = TROPHIC_FACTORS.get(trophic_level, 1.0)
        variation = random.uniform(0.95, 1.05)
        predicted_biomass = current_biomass * factor * variation
        predictions.append(round(predicted_biomass, 2))
    
    return {
        "predicted_biomass": predictions,
        "message": "Prediction successful [Basic Model]",
        "model": "Trophic-Level Aware Growth Model",
        "confidence": 0.85
    }

# ============================================
# HEALTH CHECK ENDPOINTS
# ============================================

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "🌿 Ecological Pyramid ML Service",
        "status": "healthy",
        "version": "1.0",
        "cascade_model": "✅ Ready" if cascade_model_available else "⚠️ Unavailable"
    }

@app.get("/api/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "ok",
        "message": "Server is running",
        "model_status": "ready" if cascade_model_available else "fallback"
    }

@app.get("/api/models/status")
async def model_status():
    """Check which ML models are available"""
    return {
        "cascade_model": "✅ Ready" if cascade_model_available else "⚠️ Fallback",
        "invasive_model": "✅ Ready" if cascade_model_available else "⚠️ Fallback",
        "trajectory_model": "✅ Ready" if cascade_model_available else "⚠️ Fallback",
        "risk_model": "✅ Ready" if cascade_model_available else "⚠️ Fallback"
    }

# ============================================
# BASIC PREDICTION ENDPOINT
# ============================================

@app.post("/predict")
async def predict(input_data: PredictionRequest):
    """
    Basic biomass prediction endpoint
    Compatible with existing frontend code
    """
    try:
        return basic_predict(input_data.data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# CASCADE ANALYSIS ENDPOINT
# ============================================

@app.post("/api/analyze/cascade")
async def analyze_cascade_endpoint(request: CascadeAnalysisRequest):
    """
    Analyze cascade effects when a species is removed
    
    Uses ML model if available, falls back to simple calculation
    """
    try:
        if not cascade_model_available:
            # Simple fallback cascade analysis
            species_data = [s.dict() for s in request.speciesArray]
            target = request.targetSpecies.dict()
            
            # Calculate simple cascade effect
            affected = []
            for s in species_data:
                if s['name'] != target['name']:
                    loss = random.randint(20, 70)
                    affected.append({
                        'name': s['name'],
                        'icon': s.get('icon', '🔹'),
                        'population_loss': loss,
                        'extinction_probability': loss / 100,
                        'reason': f'Ecosystem impact from {target["name"]} removal',
                        'affected_by': 'cascade'
                    })
            
            return {
                "success": True,
                "data": {
                    "target_species": target['name'],
                    "affected_species": affected,
                    "ecosystem_health_change": -45,
                    "extinctions_predicted": len([a for a in affected if a['population_loss'] > 80]),
                    "cascade_depth": 2
                },
                "model_version": "1.0",
                "source": "fallback"
            }
        
        # Use ML model if available
        species_data = [s.dict() for s in request.speciesArray]
        target = request.targetSpecies.dict()
        result = analyze_cascade(species_data, target)
        
        return {
            "success": True,
            "data": result,
            "model_version": "1.0",
            "source": "ml_model"
        }
    
    except Exception as e:
        print(f"Error in cascade analysis: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# INVASIVE SPECIES ENDPOINT
# ============================================

@app.post("/api/analyze/invasive")
async def analyze_invasive_endpoint(request: InvasiveSpeciesRequest):
    """
    Analyze impact of invasive species on ecosystem
    """
    try:
        if not cascade_model_available:
            # Simple fallback invasive analysis
            species_data = [s.dict() for s in request.currentSpecies]
            invasive = request.invasiveSpecies.dict()
            
            affected = []
            for s in species_data:
                change = random.randint(-40, 40)
                impact_type = 'competition' if change < 0 else 'benefit'
                affected.append({
                    'species': s['name'],
                    'icon': s.get('icon', '🔹'),
                    'population_change': change,
                    'impact_type': impact_type,
                    'probability': abs(change) / 100
                })
            
            return {
                "success": True,
                "data": {
                    "invasive_species": invasive['name'],
                    "invasion_strength": request.invasionStrength,
                    "affected_species": affected,
                    "total_impact": sum(a['population_change'] for a in affected),
                    "outcome_prediction": "ECOSYSTEM_CHANGE"
                },
                "model_version": "1.0",
                "source": "fallback"
            }
        
        # Use ML model if available
        species_data = [s.dict() for s in request.currentSpecies]
        invasive = request.invasiveSpecies.dict()
        result = analyze_invasive(species_data, invasive, request.invasionStrength)
        
        return {
            "success": True,
            "data": result,
            "model_version": "1.0",
            "source": "ml_model"
        }
    
    except Exception as e:
        print(f"Error in invasive analysis: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# POPULATION TRAJECTORY ENDPOINT
# ============================================

@app.post("/api/predict/trajectory")
async def predict_trajectory_endpoint(request: PopulationTrajectoryRequest):
    """
    Predict population trajectory over time
    """
    try:
        if not cascade_model_available:
            # Simple fallback trajectory
            species_data = [s.dict() for s in request.species]
            timeline = []
            
            for step in range(request.timeSteps):
                species_snapshot = {}
                for s in species_data:
                    variation = random.uniform(0.95, 1.05)
                    species_snapshot[s['name']] = int(s['population'] * variation)
                
                timeline.append({
                    'step': step,
                    'month': f'Month {step}',
                    'species_data': species_snapshot,
                    'ecosystem_health': random.randint(60, 85)
                })
            
            return {
                "success": True,
                "data": {
                    "timeline": timeline
                },
                "model_version": "1.0",
                "source": "fallback"
            }
        
        # Use ML model if available
        species_data = [s.dict() for s in request.species]
        trajectory = predict_populations(species_data, request.timeSteps)
        
        return {
            "success": True,
            "data": {
                "timeline": trajectory
            },
            "model_version": "1.0",
            "source": "ml_model"
        }
    
    except Exception as e:
        print(f"Error in trajectory prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# ECOSYSTEM HEALTH ENDPOINT
# ============================================

@app.post("/api/ecosystem/health")
async def ecosystem_health_endpoint(request: EcosystemHealthRequest):
    """
    Assess extinction risks for all species
    """
    try:
        if not cascade_model_available:
            # Simple fallback health assessment
            species_data = [s.dict() for s in request.species]
            
            risks = []
            for s in species_data:
                risk_score = random.randint(20, 90)
                if risk_score > 70:
                    risk_level = "CRITICAL 🔴"
                elif risk_score > 40:
                    risk_level = "HIGH 🟠"
                else:
                    risk_level = "LOW 🟢"
                
                risks.append({
                    'species': s['name'],
                    'icon': s.get('icon', '🔹'),
                    'risk_level': risk_level,
                    'risk_score': risk_score,
                    'risk_factors': [
                        'Food chain dependent',
                        'Low population'
                    ]
                })
            
            return {
                "success": True,
                "data": {
                    "species_risks": risks
                },
                "model_version": "1.0",
                "source": "fallback"
            }
        
        # Use ML model if available
        species_data = [s.dict() for s in request.species]
        risks = assess_extinction_risks(species_data)
        
        return {
            "success": True,
            "data": {
                "species_risks": risks
            },
            "model_version": "1.0",
            "source": "ml_model"
        }
    
    except Exception as e:
        print(f"Error in health assessment: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# RUN SERVER
# ============================================

if __name__ == "__main__":
    import uvicorn
    print("🌿 Starting Eco Pyramid ML Service...")
    print(f"📊 Cascade model: {'✅ Loaded' if cascade_model_available else '⚠️ Fallback mode'}")
    uvicorn.run(app, host="0.0.0.0", port=8000)