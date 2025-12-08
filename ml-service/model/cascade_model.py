"""
cascade_model.py

BEGINNER GUIDE: Machine Learning Model for Ecosystem Cascade Prediction

This module contains the ML algorithms that predict ecosystem changes:
1. Cascade Effect Modeling - What happens when a species is removed
2. Invasive Species Impact - How invasives affect native populations
3. Population Dynamics - Logistic growth and predator-prey models
4. Extinction Probability - Likelihood a species will go extinct

Using: Simple Python algorithms (no external ML frameworks for beginners)
"""

import numpy as np
from typing import List, Dict, Tuple
import math

class EcosystemCascadeModel:
    """
    Main model for predicting ecosystem cascade effects
    """
    
    # Ecological constants
    ENERGY_TRANSFER_EFFICIENCY = 0.1  # 10% energy moves up levels
    PREDATION_RATE = 0.01  # How much predators eat
    NATURAL_MORTALITY = 0.05  # Species natural death rate
    CARRYING_CAPACITY_FACTOR = 1000  # Food → population multiplier
    
    def __init__(self, verbose=False):
        self.verbose = verbose
        self.simulation_history = []
    
    # ================================================
    # 1. SPECIES CLASSIFICATION
    # ================================================
    
    def get_trophic_level(self, trophic_level_str: str) -> int:
        """
        Convert trophic level string to number
        producer=0, primary_consumer=1, secondary_consumer=2, tertiary_consumer=3
        """
        levels = {
            'producer': 0,
            'primary_consumer': 1,
            'secondary_consumer': 2,
            'tertiary_consumer': 3
        }
        return levels.get(trophic_level_str, 0)
    
    def classify_species(self, species: Dict) -> Dict:
        """
        Analyze a species and determine its characteristics
        
        Returns: {
            'name': str,
            'role': 'predator', 'prey', 'producer', 'apex',
            'vulnerability': 0-1 (1 = most vulnerable),
            'adaptability': 0-1 (1 = most adaptable)
        }
        """
        level = self.get_trophic_level(species.get('trophicLevel', 'producer'))
        
        # Higher level = fewer individuals = more vulnerable
        vulnerability = min(1.0, (level + 1) * 0.25)
        
        # Generalist species are more adaptable
        # Assume primary consumers are generalists
        adaptability = 0.8 if level == 1 else 0.5
        
        if level == 0:
            role = 'producer'
        elif level == 3:
            role = 'apex'
        elif level > 0:
            role = 'predator'
        
        return {
            'name': species.get('name'),
            'role': role,
            'trophic_level': level,
            'vulnerability': vulnerability,
            'adaptability': adaptability
        }
    
    # ================================================
    # 2. CASCADE EFFECT PREDICTION
    # ================================================
    
    def predict_cascade_effect(self, species_list: List[Dict], target_species: Dict) -> Dict:
        """
        MAIN FUNCTION: Predict what happens when target species is removed
        
        Algorithm:
        1. Find all predators of target species
        2. Calculate their food loss
        3. Apply cascade through food chain
        4. Calculate extinction probability for each species
        
        Returns: {
            'affected_species': [
                {
                    'name': str,
                    'population_loss': 0-100 (percent),
                    'extinction_probability': 0-1,
                    'reason': str
                }
            ],
            'ecosystem_health_change': -50 to 0,
            'num_extinctions_predicted': int
        }
        """
        
        target_level = self.get_trophic_level(target_species.get('trophicLevel'))
        affected = []
        total_health_loss = 0
        
        for species in species_list:
            if species['name'] == target_species['name']:
                continue
            
            species_level = self.get_trophic_level(species.get('trophicLevel'))
            impact = self._calculate_impact(
                target_level, 
                species_level,
                target_species,
                species
            )
            
            if impact['population_loss'] > 0:
                affected.append({
                    'name': species['name'],
                    'icon': species.get('icon', '🔹'),
                    'population_loss': impact['population_loss'],
                    'extinction_probability': impact['extinction_prob'],
                    'reason': impact['reason'],
                    'affected_by': 'direct' if impact['direct'] else 'cascade'
                })
                total_health_loss += impact['health_impact']
        
        # Sort by impact (highest first)
        affected.sort(key=lambda x: x['population_loss'], reverse=True)
        
        # Count species likely to go extinct (>90% loss)
        extinctions = sum(1 for s in affected if s['population_loss'] > 90)
        
        return {
            'target_species': target_species['name'],
            'affected_species': affected,
            'ecosystem_health_change': max(-100, total_health_loss),
            'extinctions_predicted': extinctions,
            'num_species_affected': len(affected),
            'cascade_depth': self._calculate_cascade_depth(affected)
        }
    
    def _calculate_impact(self, target_level: int, species_level: int, 
                         target_species: Dict, species: Dict) -> Dict:
        """
        Calculate impact on a single species when target is removed
        """
        
        # RULE 1: Direct predators lose most
        if species_level == target_level + 1:
            base_loss = 60 + np.random.uniform(-10, 10)
            reason = f"Direct predator of {target_species['name']}"
            direct = True
        
        # RULE 2: Competitors benefit (less competition)
        elif species_level == target_level:
            base_loss = -30  # Negative = population INCREASE
            reason = "Less competition for resources"
            direct = False
        
        # RULE 3: Cascade effects further up food chain
        elif species_level > target_level + 1:
            levels_removed = species_level - target_level
            base_loss = max(10, 50 - (levels_removed * 15))
            reason = f"Food chain disrupted ({levels_removed} levels)"
            direct = False
        
        # RULE 4: Prey at lower levels unaffected
        else:
            base_loss = 0
            reason = "Not directly affected"
            direct = False
        
        # Calculate extinction probability
        extinction_prob = min(1.0, max(0, base_loss / 100))
        
        # Impact on ecosystem health (-1 to -0.01)
        health_impact = min(-1, -abs(base_loss) / 100)
        
        return {
            'population_loss': max(0, base_loss),
            'extinction_prob': extinction_prob,
            'reason': reason,
            'direct': direct,
            'health_impact': health_impact
        }
    
    def _calculate_cascade_depth(self, affected_list: List[Dict]) -> int:
        """
        How many 'levels' of cascade occurred
        """
        if len(affected_list) == 0:
            return 0
        elif len(affected_list) <= 2:
            return 1
        elif len(affected_list) <= 5:
            return 2
        else:
            return 3
    
    # ================================================
    # 3. INVASIVE SPECIES IMPACT
    # ================================================
    
    def predict_invasive_species_impact(self, species_list: List[Dict], 
                                       invasive_species: Dict,
                                       invasion_strength: int = 5) -> Dict:
        """
        INVASIVE SPECIES: Predict impact on native ecosystem
        
        Algorithm:
        1. Invasive competes with species at same trophic level
        2. Invasive predates on lower trophic levels
        3. Invasive is preyed on by higher trophic levels
        4. Calculate equilibrium or extinction scenarios
        
        invasion_strength: 1-10 scale (10 = super invasive)
        """
        
        invasive_level = self.get_trophic_level(invasive_species.get('trophicLevel'))
        affected = []
        
        competition_factor = invasion_strength / 10  # 0.1 to 1.0
        
        for species in species_list:
            species_level = self.get_trophic_level(species.get('trophicLevel'))
            
            impact_type = None
            population_loss = 0
            
            # Same level: direct competition
            if species_level == invasive_level:
                # Invasive usually wins (more aggressive)
                population_loss = 30 + (competition_factor * 50)
                impact_type = 'competition'
            
            # Prey of invasive: get hunted more
            elif species_level == invasive_level - 1:
                population_loss = 20 + (competition_factor * 40)
                impact_type = 'predation'
            
            # Predators of invasive: more food available
            elif species_level == invasive_level + 1:
                population_loss = -30  # Increase
                impact_type = 'predator_benefit'
            
            # Cascade effects
            elif species_level < invasive_level:
                levels_removed = invasive_level - species_level
                population_loss = max(5, 20 - (levels_removed * 5))
                impact_type = 'cascade'
            
            if population_loss != 0:
                affected.append({
                    'species': species['name'],
                    'icon': species.get('icon', '🔹'),
                    'population_change': population_loss,
                    'impact_type': impact_type,
                    'probability': min(1.0, abs(population_loss) / 100)
                })
        
        return {
            'invasive_species': invasive_species['name'],
            'invasion_strength': invasion_strength,
            'affected_species': affected,
            'total_impact': sum(s['population_change'] for s in affected),
            'outcome_prediction': self._predict_invasive_outcome(affected, invasion_strength)
        }
    
    def _predict_invasive_outcome(self, affected: List[Dict], strength: int) -> str:
        """
        Predict final outcome of invasive species
        """
        losses = sum(1 for s in affected if s['population_change'] > 20)
        
        if strength >= 8:
            return 'ECOSYSTEM_COLLAPSE'
        elif losses > len(affected) * 0.7:
            return 'NATIVE_DECLINE'
        elif strength >= 5:
            return 'COEXISTENCE'
        else:
            return 'INVASIVE_CONTAINED'
    
    # ================================================
    # 4. POPULATION DYNAMICS
    # ================================================
    
    def predict_population_trajectory(self, species_list: List[Dict], 
                                     time_steps: int = 12) -> List[Dict]:
        """
        Predict population over time using Lotka-Volterra equations
        
        Returns: [{
            'step': 0-12,
            'timestamp': 'Month 0', 'Month 1', etc,
            'species_data': {'species_name': population, ...},
            'ecosystem_health': 0-100
        }]
        """
        
        trajectory = []
        current_species = [dict(s) for s in species_list]  # Copy
        
        for step in range(time_steps):
            # Simulate one time step for each species
            for species in current_species:
                # Get food available
                level = self.get_trophic_level(species.get('trophicLevel'))
                
                if level == 0:
                    # Producer: limited by sun/resources
                    growth_rate = 0.05
                else:
                    # Consumer: depends on food below
                    growth_rate = 0.03
                
                # Apply logistic growth
                K = species.get('population', 100) * 2  # Carrying capacity
                P = species.get('population', 100)
                dP = growth_rate * P * (1 - P / K)
                
                species['population'] = max(0, P + dP)
            
            # Calculate health
            health = self._calculate_ecosystem_health(current_species)
            
            trajectory.append({
                'step': step,
                'month': f'Month {step}',
                'species_data': {s['name']: int(s['population']) for s in current_species},
                'ecosystem_health': health
            })
        
        return trajectory
    
    def _calculate_ecosystem_health(self, species_list: List[Dict]) -> int:
        """
        Calculate ecosystem health 0-100
        """
        if len(species_list) == 0:
            return 0
        
        # Diversity score
        diversity = min(50, len(species_list) * 10)
        
        # Population variance
        populations = [s.get('population', 100) for s in species_list]
        avg_pop = np.mean(populations)
        variance = np.var(populations)
        stability = max(0, 50 - variance / avg_pop * 10)
        
        return int(diversity + stability)
    
    # ================================================
    # 5. EXTINCTION RISK ASSESSMENT
    # ================================================
    
    def calculate_extinction_risk(self, species_list: List[Dict]) -> List[Dict]:
        """
        Assess extinction risk for each species
        
        Returns: [
            {
                'species': str,
                'risk_level': 'CRITICAL', 'HIGH', 'MODERATE', 'LOW',
                'risk_score': 0-100,
                'risk_factors': [str]
            }
        ]
        """
        risks = []
        
        for species in species_list:
            risk_factors = []
            risk_score = 20  # Base risk
            
            # Low population = higher risk
            pop = species.get('population', 100)
            if pop < 50:
                risk_score += 30
                risk_factors.append('Low population')
            
            # High trophic level = higher risk
            level = self.get_trophic_level(species.get('trophicLevel'))
            if level >= 2:
                risk_score += 20
                risk_factors.append('Apex predator (food chain dependent)')
            
            # Specialized diet = higher risk
            # (Herbivores less risky, carnivores more risky)
            if level > 0:
                risk_score += 10
                risk_factors.append('Specialized diet')
            
            # Low biomass = higher risk
            biomass = species.get('biomass', 100)
            if biomass < 100:
                risk_score += 15
                risk_factors.append('Low biomass')
            
            # Determine risk level
            if risk_score >= 80:
                risk_level = 'CRITICAL 🔴'
            elif risk_score >= 60:
                risk_level = 'HIGH 🟠'
            elif risk_score >= 40:
                risk_level = 'MODERATE 🟡'
            else:
                risk_level = 'LOW 🟢'
            
            risks.append({
                'species': species['name'],
                'icon': species.get('icon', '🔹'),
                'risk_level': risk_level,
                'risk_score': min(100, risk_score),
                'risk_factors': risk_factors
            })
        
        # Sort by risk (highest first)
        risks.sort(key=lambda x: x['risk_score'], reverse=True)
        
        return risks

# ================================================
# EXPORTED FUNCTIONS FOR API
# ================================================

def analyze_cascade(species_data: List[Dict], target_species: Dict) -> Dict:
    """
    Main entry point for cascade analysis
    """
    model = EcosystemCascadeModel()
    return model.predict_cascade_effect(species_data, target_species)

def analyze_invasive(species_data: List[Dict], invasive: Dict, strength: int = 5) -> Dict:
    """
    Main entry point for invasive species analysis
    """
    model = EcosystemCascadeModel()
    return model.predict_invasive_species_impact(species_data, invasive, strength)

def predict_populations(species_data: List[Dict], time_steps: int = 12) -> List[Dict]:
    """
    Main entry point for population trajectory prediction
    """
    model = EcosystemCascadeModel()
    return model.predict_population_trajectory(species_data, time_steps)

def assess_extinction_risks(species_data: List[Dict]) -> List[Dict]:
    """
    Main entry point for extinction risk assessment
    """
    model = EcosystemCascadeModel()
    return model.calculate_extinction_risk(species_data)