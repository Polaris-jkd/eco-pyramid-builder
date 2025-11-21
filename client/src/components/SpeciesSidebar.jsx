import React from 'react';

const SAMPLE_SPECIES = [
  // ============================================
  // PRODUCERS - Base of food chain (Massive biomass)
  // ============================================
  
  // GRASSLAND PRODUCERS
  { id: 'grass', name: 'Grass', trophicLevel: 'producer', biomass: 10000, energy: 100000, population: 1000000, icon: '🌾' },
  { id: 'wildflowers', name: 'Wildflowers', trophicLevel: 'producer', biomass: 8500, energy: 85000, population: 800000, icon: '🌼' },
  { id: 'clover', name: 'Clover', trophicLevel: 'producer', biomass: 9000, energy: 90000, population: 950000, icon: '☘️' },
  
  // FOREST PRODUCERS
  { id: 'oak-tree', name: 'Oak Tree', trophicLevel: 'producer', biomass: 15000, energy: 150000, population: 5000, icon: '🌳' },
  { id: 'pine-tree', name: 'Pine Tree', trophicLevel: 'producer', biomass: 14000, energy: 140000, population: 4500, icon: '🌲' },
  { id: 'fern', name: 'Fern', trophicLevel: 'producer', biomass: 7000, energy: 70000, population: 500000, icon: '🌿' },
  { id: 'mushroom', name: 'Mushroom', trophicLevel: 'producer', biomass: 3000, energy: 30000, population: 100000, icon: '🍄' },
  
  // AQUATIC PRODUCERS
  { id: 'algae', name: 'Algae', trophicLevel: 'producer', biomass: 8000, energy: 80000, population: 900000, icon: '🟢' },
  { id: 'phytoplankton', name: 'Phytoplankton', trophicLevel: 'producer', biomass: 12000, energy: 120000, population: 2000000, icon: '🦠' },
  { id: 'seaweed', name: 'Seaweed', trophicLevel: 'producer', biomass: 9500, energy: 95000, population: 750000, icon: '🌊' },
  { id: 'water-lily', name: 'Water Lily', trophicLevel: 'producer', biomass: 6000, energy: 60000, population: 200000, icon: '🪷' },
  
  // DESERT PRODUCERS
  { id: 'cactus', name: 'Cactus', trophicLevel: 'producer', biomass: 5000, energy: 50000, population: 100000, icon: '🌵' },
  { id: 'sagebrush', name: 'Sagebrush', trophicLevel: 'producer', biomass: 4500, energy: 45000, population: 80000, icon: '🪴' },
  { id: 'desert-grass', name: 'Desert Grass', trophicLevel: 'producer', biomass: 3500, energy: 35000, population: 150000, icon: '🌾' },
  
  // TUNDRA PRODUCERS
  { id: 'moss', name: 'Moss', trophicLevel: 'producer', biomass: 3000, energy: 30000, population: 500000, icon: '🟩' },
  { id: 'lichen', name: 'Lichen', trophicLevel: 'producer', biomass: 2500, energy: 25000, population: 600000, icon: '🧪' },
  { id: 'arctic-willow', name: 'Arctic Willow', trophicLevel: 'producer', biomass: 4000, energy: 40000, population: 50000, icon: '🌿' },
  
  
  // ============================================
  // PRIMARY CONSUMERS - Herbivores (10% of producers)
  // ============================================
  
  // GRASSLAND PRIMARY CONSUMERS
  { id: 'grasshopper', name: 'Grasshopper', trophicLevel: 'primary_consumer', biomass: 1000, energy: 10000, population: 100000, icon: '🦗' },
  { id: 'rabbit', name: 'Rabbit', trophicLevel: 'primary_consumer', biomass: 900, energy: 9000, population: 50000, icon: '🐰' },
  { id: 'mouse', name: 'Mouse', trophicLevel: 'primary_consumer', biomass: 850, energy: 8500, population: 120000, icon: '🐭' },
  { id: 'bee', name: 'Bee', trophicLevel: 'primary_consumer', biomass: 700, energy: 7000, population: 200000, icon: '🐝' },
  { id: 'butterfly', name: 'Butterfly', trophicLevel: 'primary_consumer', biomass: 650, energy: 6500, population: 150000, icon: '🦋' },
  
  // FOREST PRIMARY CONSUMERS
  { id: 'deer', name: 'Deer', trophicLevel: 'primary_consumer', biomass: 1200, energy: 12000, population: 8000, icon: '🦌' },
  { id: 'squirrel', name: 'Squirrel', trophicLevel: 'primary_consumer', biomass: 800, energy: 8000, population: 50000, icon: '🐿️' },
  { id: 'caterpillar', name: 'Caterpillar', trophicLevel: 'primary_consumer', biomass: 600, energy: 6000, population: 300000, icon: '🐛' },
  { id: 'woodpecker', name: 'Woodpecker', trophicLevel: 'primary_consumer', biomass: 750, energy: 7500, population: 15000, icon: '🐦' },
  
  // AQUATIC PRIMARY CONSUMERS
  { id: 'zooplankton', name: 'Zooplankton', trophicLevel: 'primary_consumer', biomass: 800, energy: 8000, population: 150000, icon: '🔬' },
  { id: 'shrimp', name: 'Shrimp', trophicLevel: 'primary_consumer', biomass: 900, energy: 9000, population: 100000, icon: '🦐' },
  { id: 'sea-urchin', name: 'Sea Urchin', trophicLevel: 'primary_consumer', biomass: 850, energy: 8500, population: 80000, icon: '🦔' },
  { id: 'snail', name: 'Snail', trophicLevel: 'primary_consumer', biomass: 700, energy: 7000, population: 200000, icon: '🐌' },
  
  // DESERT PRIMARY CONSUMERS
  { id: 'lizard', name: 'Lizard', trophicLevel: 'primary_consumer', biomass: 500, energy: 5000, population: 20000, icon: '🦎' },
  { id: 'kangaroo-rat', name: 'Kangaroo Rat', trophicLevel: 'primary_consumer', biomass: 450, energy: 4500, population: 30000, icon: '🐀' },
  { id: 'desert-beetle', name: 'Desert Beetle', trophicLevel: 'primary_consumer', biomass: 400, energy: 4000, population: 100000, icon: '🪲' },
  
  // TUNDRA PRIMARY CONSUMERS
  { id: 'caribou', name: 'Caribou', trophicLevel: 'primary_consumer', biomass: 800, energy: 8000, population: 15000, icon: '🦌' },
  { id: 'lemming', name: 'Lemming', trophicLevel: 'primary_consumer', biomass: 600, energy: 6000, population: 80000, icon: '🐹' },
  { id: 'arctic-hare', name: 'Arctic Hare', trophicLevel: 'primary_consumer', biomass: 750, energy: 7500, population: 20000, icon: '🐇' },
  
  
  // ============================================
  // SECONDARY CONSUMERS - Carnivores (10% of primary)
  // ============================================
  
  // GRASSLAND SECONDARY CONSUMERS
  { id: 'frog', name: 'Frog', trophicLevel: 'secondary_consumer', biomass: 100, energy: 1000, population: 10000, icon: '🐸' },
  { id: 'snake', name: 'Snake', trophicLevel: 'secondary_consumer', biomass: 120, energy: 1200, population: 8000, icon: '🐍' },
  { id: 'owl', name: 'Owl', trophicLevel: 'secondary_consumer', biomass: 130, energy: 1300, population: 5000, icon: '🦉' },
  { id: 'praying-mantis', name: 'Praying Mantis', trophicLevel: 'secondary_consumer', biomass: 90, energy: 900, population: 15000, icon: '🦗' },
  
  // FOREST SECONDARY CONSUMERS
  { id: 'fox', name: 'Fox', trophicLevel: 'secondary_consumer', biomass: 150, energy: 1500, population: 1000, icon: '🦊' },
  { id: 'raccoon', name: 'Raccoon', trophicLevel: 'secondary_consumer', biomass: 140, energy: 1400, population: 3000, icon: '🦝' },
  { id: 'badger', name: 'Badger', trophicLevel: 'secondary_consumer', biomass: 160, energy: 1600, population: 2000, icon: '🦡' },
  
  // AQUATIC SECONDARY CONSUMERS
  { id: 'small-fish', name: 'Small Fish', trophicLevel: 'secondary_consumer', biomass: 120, energy: 1200, population: 12000, icon: '🐟' },
  { id: 'crab', name: 'Crab', trophicLevel: 'secondary_consumer', biomass: 110, energy: 1100, population: 15000, icon: '🦀' },
  { id: 'octopus', name: 'Octopus', trophicLevel: 'secondary_consumer', biomass: 130, energy: 1300, population: 8000, icon: '🐙' },
  { id: 'jellyfish', name: 'Jellyfish', trophicLevel: 'secondary_consumer', biomass: 100, energy: 1000, population: 20000, icon: '🪼' },
  
  // DESERT SECONDARY CONSUMERS
  { id: 'desert-snake', name: 'Desert Snake', trophicLevel: 'secondary_consumer', biomass: 50, energy: 500, population: 2000, icon: '🐍' },
  { id: 'scorpion', name: 'Scorpion', trophicLevel: 'secondary_consumer', biomass: 40, energy: 400, population: 5000, icon: '🦂' },
  { id: 'roadrunner', name: 'Roadrunner', trophicLevel: 'secondary_consumer', biomass: 60, energy: 600, population: 1500, icon: '🐦' },
  
  // TUNDRA SECONDARY CONSUMERS
  { id: 'wolf', name: 'Wolf', trophicLevel: 'secondary_consumer', biomass: 80, energy: 800, population: 1500, icon: '🐺' },
  { id: 'arctic-fox', name: 'Arctic Fox', trophicLevel: 'secondary_consumer', biomass: 70, energy: 700, population: 3000, icon: '🦊' },
  { id: 'snowy-owl', name: 'Snowy Owl', trophicLevel: 'secondary_consumer', biomass: 75, energy: 750, population: 2000, icon: '🦉' },
  
  
  // ============================================
  // TERTIARY CONSUMERS - Apex Predators (10% of secondary)
  // ============================================
  
  // GRASSLAND APEX PREDATORS
  { id: 'hawk', name: 'Hawk', trophicLevel: 'tertiary_consumer', biomass: 10, energy: 100, population: 1000, icon: '🦅' },
  { id: 'coyote', name: 'Coyote', trophicLevel: 'tertiary_consumer', biomass: 12, energy: 120, population: 800, icon: '🐺' },
  
  // FOREST APEX PREDATORS
  { id: 'eagle', name: 'Eagle', trophicLevel: 'tertiary_consumer', biomass: 15, energy: 150, population: 100, icon: '🦅' },
  { id: 'mountain-lion', name: 'Mountain Lion', trophicLevel: 'tertiary_consumer', biomass: 18, energy: 180, population: 50, icon: '🐆' },
  { id: 'bear', name: 'Bear', trophicLevel: 'tertiary_consumer', biomass: 20, energy: 200, population: 80, icon: '🐻' },
  
  // AQUATIC APEX PREDATORS
  { id: 'shark', name: 'Shark', trophicLevel: 'tertiary_consumer', biomass: 12, energy: 120, population: 500, icon: '🦈' },
  { id: 'dolphin', name: 'Dolphin', trophicLevel: 'tertiary_consumer', biomass: 14, energy: 140, population: 600, icon: '🐬' },
  { id: 'orca', name: 'Orca', trophicLevel: 'tertiary_consumer', biomass: 16, energy: 160, population: 300, icon: '🐋' },
  
  // DESERT APEX PREDATORS
  { id: 'vulture', name: 'Vulture', trophicLevel: 'tertiary_consumer', biomass: 8, energy: 80, population: 300, icon: '🦅' },
  { id: 'desert-hawk', name: 'Desert Hawk', trophicLevel: 'tertiary_consumer', biomass: 9, energy: 90, population: 500, icon: '🦅' },
  
  // TUNDRA APEX PREDATORS
  { id: 'polar-bear', name: 'Polar Bear', trophicLevel: 'tertiary_consumer', biomass: 10, energy: 100, population: 200, icon: '🐻‍❄️' },
  { id: 'arctic-wolf', name: 'Arctic Wolf', trophicLevel: 'tertiary_consumer', biomass: 11, energy: 110, population: 400, icon: '🐺' },
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
        
      <div className="species-list-container">

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
    </div>
  );
}

export { SAMPLE_SPECIES };
