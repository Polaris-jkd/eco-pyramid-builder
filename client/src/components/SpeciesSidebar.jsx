import React from 'react';

const SAMPLE_SPECIES = [
  // Producers - MASSIVE biomass at base
  { id: 'grass', name: 'Grass', trophicLevel: 'producer', biomass: 10000, energy: 100000, population: 1000000, icon: '🌱' },
  { id: 'algae', name: 'Algae', trophicLevel: 'producer', biomass: 8000, energy: 80000, population: 500000, icon: '🦠' },
  { id: 'phytoplankton', name: 'Phytoplankton', trophicLevel: 'producer', biomass: 12000, energy: 120000, population: 2000000, icon: '🌿' },
  
  // Primary Consumers - 10% of producers (ecological 10% rule)
  { id: 'grasshopper', name: 'Grasshopper', trophicLevel: 'primary_consumer', biomass: 1000, energy: 10000, population: 100000, icon: '🦗' },
  { id: 'rabbit', name: 'Rabbit', trophicLevel: 'primary_consumer', biomass: 900, energy: 9000, population: 50000, icon: '🐰' },
  { id: 'zooplankton', name: 'Zooplankton', trophicLevel: 'primary_consumer', biomass: 1200, energy: 12000, population: 200000, icon: '🦐' },
  { id: 'deer', name: 'Deer', trophicLevel: 'primary_consumer', biomass: 1100, energy: 11000, population: 30000, icon: '🦌' },
  
  // Secondary Consumers - 10% of primary consumers
  { id: 'frog', name: 'Frog', trophicLevel: 'secondary_consumer', biomass: 100, energy: 1000, population: 10000, icon: '🐸' },
  { id: 'snake', name: 'Snake', trophicLevel: 'secondary_consumer', biomass: 90, energy: 900, population: 5000, icon: '🐍' },
  { id: 'fish', name: 'Fish', trophicLevel: 'secondary_consumer', biomass: 120, energy: 1200, population: 20000, icon: '🐟' },
  { id: 'fox', name: 'Fox', trophicLevel: 'secondary_consumer', biomass: 110, energy: 1100, population: 3000, icon: '🦊' },
  
  // Tertiary Consumers - 10% of secondary consumers (apex predators)
  { id: 'hawk', name: 'Hawk', trophicLevel: 'tertiary_consumer', biomass: 10, energy: 100, population: 1000, icon: '🦅' },
  { id: 'eagle', name: 'Eagle', trophicLevel: 'tertiary_consumer', biomass: 9, energy: 90, population: 500, icon: '🦅' },
  { id: 'shark', name: 'Shark', trophicLevel: 'tertiary_consumer', biomass: 12, energy: 120, population: 2000, icon: '🦈' },
  { id: 'lion', name: 'Lion', trophicLevel: 'tertiary_consumer', biomass: 11, energy: 110, population: 300, icon: '🦁' }
];

export default function SpeciesSidebar({ onAddSpecies }) {
  const groupedSpecies = {
    producer: SAMPLE_SPECIES.filter(s => s.trophicLevel === 'producer'),
    primary_consumer: SAMPLE_SPECIES.filter(s => s.trophicLevel === 'primary_consumer'),
    secondary_consumer: SAMPLE_SPECIES.filter(s => s.trophicLevel === 'secondary_consumer'),
    tertiary_consumer: SAMPLE_SPECIES.filter(s => s.trophicLevel === 'tertiary_consumer')
  };

  return (
    <div className="species-sidebar">
      <h3>🧬 Species Library</h3>
      <p className="sidebar-subtitle">Click or drag to add species</p>
      <p className="ecological-note">💡 Notice the 10% rule: Each level has ~10% of the biomass below it</p>
      
      {Object.entries(groupedSpecies).map(([level, speciesList]) => (
        <div key={level} className="species-group">
          <h4 className="group-title">
            {level === 'producer' && '🌱 Producers (Base)'}
            {level === 'primary_consumer' && '🐰 Primary Consumers'}
            {level === 'secondary_consumer' && '🐍 Secondary Consumers'}
            {level === 'tertiary_consumer' && '🦅 Apex Predators'}
          </h4>
          
          <div className="species-cards">
            {speciesList.map(species => (
              <div
                key={species.id}
                className="species-card draggable"
                onClick={() => onAddSpecies(species)}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('species', JSON.stringify(species));
                  e.currentTarget.style.opacity = '0.5';
                }}
                onDragEnd={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
              >
                <span className="species-icon">{species.icon}</span>
                <div className="species-info">
                  <strong>{species.name}</strong>
                  <small>{species.biomass} kg/m²</small>
                  <small className="energy-val">{species.energy} kcal/m²</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { SAMPLE_SPECIES };
