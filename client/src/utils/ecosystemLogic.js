/**
 * ecosystemLogic.js
 * 
 * BEGINNER GUIDE: Mathematical functions for ecosystem simulation
 * 
 * Think of these as the "rules" of ecology:
 * - Energy Transfer Rule: Energy moves up trophic levels (but loses 90% each time)
 * - Population Dynamics: Population depends on available food
 * - Resilience: How quickly ecosystem recovers from changes
 */

// ==========================================
// 1. ENERGY TRANSFER CALCULATIONS
// ==========================================

/**
 * BEGINNER: 10% Energy Transfer Rule
 * 
 * If producers have 100 units of energy:
 * - Primary consumers get ~10 units
 * - Secondary consumers get ~1 unit
 * - Apex predators get ~0.1 unit
 * 
 * This is why energy pyramids get smaller at top!
 */
export const calculate10PercentRule = (baseEnergyList) => {
  const TRANSFER_EFFICIENCY = 0.1; // 10% transfers, 90% lost as heat
  
  return baseEnergyList.map((energy, level) => {
    // Energy available at each level = energy from below * efficiency
    if (level === 0) return energy; // Producers (no level below)
    return baseEnergyList[level - 1] * Math.pow(TRANSFER_EFFICIENCY, level);
  });
};

/**
 * BEGINNER: When population changes, calculate new energy needed
 * 
 * Formula: Population increase → More food needed
 * If rabbit population doubles, grass loss doubles
 */
export const calculateEnergyDemand = (population, energyPerIndividual = 50) => {
  // Each individual needs energy to survive
  return population * energyPerIndividual;
};

/**
 * BEGINNER: Check if ecosystem has enough energy for a population
 * Returns: { canSustain: boolean, deficit: number, surplus: number }
 */
export const checkEnergyBalance = (availableEnergy, requiredEnergy) => {
  const balance = availableEnergy - requiredEnergy;
  
  return {
    canSustain: balance >= 0,
    deficit: Math.max(0, -balance),
    surplus: Math.max(0, balance),
    percentUsed: (requiredEnergy / availableEnergy) * 100
  };
};

// ==========================================
// 2. BIOMASS PYRAMID CALCULATIONS
// ==========================================

/**
 * BEGINNER: Biomass follows the "pyramid" pattern
 * Each trophic level usually has 1/10th biomass of level below
 */
export const calculateBiomassPyramid = (producerBiomass) => {
  const BIOMASS_EFFICIENCY = 0.1;
  
  return {
    producer: producerBiomass,
    primary_consumer: producerBiomass * BIOMASS_EFFICIENCY,
    secondary_consumer: producerBiomass * Math.pow(BIOMASS_EFFICIENCY, 2),
    tertiary_consumer: producerBiomass * Math.pow(BIOMASS_EFFICIENCY, 3)
  };
};

// ==========================================
// 3. POPULATION DYNAMICS
// ==========================================

/**
 * BEGINNER: Logistic Growth Model
 * 
 * Population grows, but slows as it approaches carrying capacity
 * Formula: dP/dt = r * P * (1 - P/K)
 * 
 * Where:
 * - P = population
 * - r = growth rate
 * - K = carrying capacity
 */
export const calculatePopulationGrowth = (currentPopulation, carryingCapacity, growthRate = 0.05, timeSteps = 1) => {
  let population = currentPopulation;
  
  for (let i = 0; i < timeSteps; i++) {
    const growth = growthRate * population * (1 - population / carryingCapacity);
    population = Math.max(0, population + growth);
  }
  
  return Math.round(population);
};

/**
 * BEGINNER: Predator-Prey Dynamics (Lotka-Volterra)
 * 
 * When prey increases, predators increase (they have more food)
 * When predators increase, prey decreases (they get eaten more)
 * This creates a cyclical pattern
 */
export const calculatePredatorPrey = (preyPopulation, predatorPopulation, timeSteps = 1) => {
  const PREY_GROWTH = 0.1; // Prey natural growth rate
  const PREDATION_RATE = 0.01; // How many prey each predator eats
  const PREDATOR_EFFICIENCY = 0.1; // How much predator biomass comes from eating prey
  const PREDATOR_DEATH = 0.05; // Natural predator death rate

  let prey = preyPopulation;
  let predators = predatorPopulation;

  for (let i = 0; i < timeSteps; i++) {
    // Prey: grows but gets eaten
    const preyEaten = PREDATION_RATE * prey * predators;
    const preyGrowth = PREY_GROWTH * prey - preyEaten;
    prey = Math.max(0, prey + preyGrowth);

    // Predators: grow from eating prey, die naturally
    const predatorGrowth = PREDATOR_EFFICIENCY * preyEaten - PREDATOR_DEATH * predators;
    predators = Math.max(0, predators + predatorGrowth);
  }

  return {
    prey: Math.round(prey),
    predators: Math.round(predators)
  };
};

// ==========================================
// 4. RESILIENCE & STABILITY
// ==========================================

/**
 * BEGINNER: Ecosystem Resilience Score
 * 
 * 100 = Perfectly stable (diverse species)
 * 50 = Moderate resilience
 * 0 = Critical danger (collapse imminent)
 * 
 * Factors:
 * - Species diversity (more species = more stable)
 * - Population variance (uniform populations = more stable)
 * - Biomass distribution (balanced pyramid = more stable)
 */
export const calculateResilienceScore = (speciesArray) => {
  if (speciesArray.length === 0) return 0;

  // FACTOR 1: Diversity (Richness)
  // Maximum 30 points
  const diversityScore = Math.min(30, speciesArray.length * 3);

  // FACTOR 2: Trophic Balance
  // Count species at each level
  const trophicCounts = {
    producer: 0,
    primary_consumer: 0,
    secondary_consumer: 0,
    tertiary_consumer: 0
  };

  speciesArray.forEach(s => {
    trophicCounts[s.trophicLevel]++;
  });

  // Ideal: More species at lower levels
  const balanceScore = Math.min(40, 
    (trophicCounts.producer * 4 + 
     trophicCounts.primary_consumer * 3 + 
     trophicCounts.secondary_consumer * 2 + 
     trophicCounts.tertiary_consumer * 1)
  );

  // FACTOR 3: Biomass Stability
  // Calculate coefficient of variation in biomass
  const biomasses = speciesArray.map(s => s.biomass || 0);
  const meanBiomass = biomasses.reduce((a, b) => a + b, 0) / biomasses.length;
  const variance = biomasses.reduce((a, b) => a + Math.pow(b - meanBiomass, 2), 0) / biomasses.length;
  const stdDev = Math.sqrt(variance);
  const cvBiomass = meanBiomass === 0 ? 0 : stdDev / meanBiomass;
  const stabilityScore = Math.max(0, 30 - (cvBiomass * 10));

  const totalScore = diversityScore + balanceScore + stabilityScore;
  
  return {
    score: Math.round(Math.min(100, totalScore)),
    factors: {
      diversity: diversityScore,
      balance: balanceScore,
      stability: stabilityScore
    }
  };
};

// ==========================================
// 5. SCENARIO SIMULATION
// ==========================================

/**
 * BEGINNER: Simulate ecosystem after a change
 * 
 * What happens if we:
 * - Remove a species
 * - Double a species' population
 * - Add a new species
 * 
 * Returns: New ecosystem state after cascade effects
 */
export const simulateEcosystemChange = (speciesArray, changeType, targetSpecies, intensity = 1) => {
  let newSpecies = speciesArray.map(s => ({ ...s })); // Deep copy

  if (changeType === 'REMOVE') {
    // Remove the species
    newSpecies = newSpecies.filter(s => s.name !== targetSpecies.name);
    
    // Apply cascade effects
    const targetLevel = getTrophicLevelNum(targetSpecies.trophicLevel);
    
    newSpecies.forEach(species => {
      const speciesLevel = getTrophicLevelNum(species.trophicLevel);
      
      // Direct predators: lose 60-80% population
      if (speciesLevel === targetLevel + 1) {
        species.population = Math.round(species.population * (0.2 + Math.random() * 0.2));
        species.biomass *= 0.4;
        species.energy *= 0.4;
      }
      // Indirect cascade: lose 20-40% population
      else if (speciesLevel > targetLevel + 1) {
        species.population = Math.round(species.population * 0.7);
        species.biomass *= 0.7;
        species.energy *= 0.7;
      }
      // Prey/competitors: gain 30-50% population
      else if (speciesLevel < targetLevel) {
        species.population = Math.round(species.population * 1.3);
        species.biomass *= 1.2;
        species.energy *= 1.2;
      }
    });
  }
  
  else if (changeType === 'INCREASE') {
    // Increase population/biomass/energy
    const target = newSpecies.find(s => s.name === targetSpecies.name);
    if (target) {
      target.population = Math.round(target.population * (1 + intensity * 0.5));
      target.biomass *= (1 + intensity * 0.3);
      target.energy *= (1 + intensity * 0.3);
    }
  }
  
  else if (changeType === 'DECREASE') {
    // Decrease population/biomass/energy
    const target = newSpecies.find(s => s.name === targetSpecies.name);
    if (target) {
      target.population = Math.round(target.population * Math.max(0.1, 1 - intensity * 0.5));
      target.biomass *= Math.max(0.1, 1 - intensity * 0.3);
      target.energy *= Math.max(0.1, 1 - intensity * 0.3);
    }
  }

  return newSpecies;
};

/**
 * Helper: Convert trophic level string to number
 */
const getTrophicLevelNum = (trophicLevelStr) => {
  const levels = {
    'producer': 0,
    'primary_consumer': 1,
    'secondary_consumer': 2,
    'tertiary_consumer': 3
  };
  return levels[trophicLevelStr] || 0;
};

// ==========================================
// 6. INVASIVE SPECIES IMPACT
// ==========================================

/**
 * BEGINNER: Calculate impact of invasive species
 * 
 * Invasive species compete with natives and disrupt food chains
 */
export const calculateInvasiveSpeciesImpact = (speciesArray, invasiveSpecies) => {
  const impact = {
    invasive: invasiveSpecies,
    affected: [],
    totalLoss: 0
  };

  const invasiveLevel = getTrophicLevelNum(invasiveSpecies.trophicLevel);

  speciesArray.forEach(native => {
    const nativeLevel = getTrophicLevelNum(native.trophicLevel);
    
    let impactPercent = 0;
    let reason = '';

    // Same trophic level = direct competition
    if (nativeLevel === invasiveLevel) {
      impactPercent = 40 + Math.random() * 30; // 40-70% loss
      reason = 'Direct competition for resources';
    }
    // Adjacent level = food chain disruption
    else if (Math.abs(nativeLevel - invasiveLevel) === 1) {
      impactPercent = 20 + Math.random() * 20; // 20-40% loss
      reason = 'Food chain disruption';
    }
    // Far level = indirect effect
    else if (Math.abs(nativeLevel - invasiveLevel) > 1) {
      impactPercent = 10 + Math.random() * 10; // 10-20% loss
      reason = 'Cascade effects';
    }

    if (impactPercent > 0) {
      impact.affected.push({
        species: native.name,
        icon: native.icon,
        loss: Math.round(impactPercent),
        reason
      });
      impact.totalLoss += impactPercent;
    }
  });

  return impact;
};

// ==========================================
// 7. ECOSYSTEM HEALTH MONITORING
// ==========================================

/**
 * BEGINNER: Complete ecosystem health report
 */
export const generateEcosystemReport = (speciesArray) => {
  const resilience = calculateResilienceScore(speciesArray);
  
  // Count species at each level
  const trophicCounts = {
    producer: speciesArray.filter(s => s.trophicLevel === 'producer').length,
    primary_consumer: speciesArray.filter(s => s.trophicLevel === 'primary_consumer').length,
    secondary_consumer: speciesArray.filter(s => s.trophicLevel === 'secondary_consumer').length,
    tertiary_consumer: speciesArray.filter(s => s.trophicLevel === 'tertiary_consumer').length
  };

  // Total energy
  const totalEnergy = speciesArray.reduce((sum, s) => sum + (s.energy || 0), 0);
  const totalBiomass = speciesArray.reduce((sum, s) => sum + (s.biomass || 0), 0);

  return {
    totalSpecies: speciesArray.length,
    trophicDistribution: trophicCounts,
    totalEnergy,
    totalBiomass,
    resilience: resilience.score,
    healthStatus: resilience.score > 70 ? 'HEALTHY 🟢' : resilience.score > 40 ? 'UNSTABLE 🟡' : 'CRITICAL 🔴',
    factors: resilience.factors
  };
};

export default {
  calculate10PercentRule,
  calculateEnergyDemand,
  checkEnergyBalance,
  calculateBiomassPyramid,
  calculatePopulationGrowth,
  calculatePredatorPrey,
  calculateResilienceScore,
  simulateEcosystemChange,
  calculateInvasiveSpeciesImpact,
  generateEcosystemReport
};