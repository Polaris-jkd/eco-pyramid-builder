export const BIOME_TEMPLATES = {
  grassland: {
    name: "Grassland Ecosystem",
    description: "Temperate grassland with grazing herbivores",
    species: [
      { name: 'Grass', trophicLevel: 'producer', biomass: 10000, energy: 100000, population: 1000000, icon: '🌱', ecosystem: 'grassland' },
      { name: 'Grasshopper', trophicLevel: 'primary_consumer', biomass: 1000, energy: 10000, population: 100000, icon: '🦗', ecosystem: 'grassland' },
      { name: 'Frog', trophicLevel: 'secondary_consumer', biomass: 100, energy: 1000, population: 10000, icon: '🐸', ecosystem: 'grassland' },
      { name: 'Hawk', trophicLevel: 'tertiary_consumer', biomass: 10, energy: 100, population: 1000, icon: '🦅', ecosystem: 'grassland' }
    ]
  },
  forest: {
    name: "Forest Ecosystem",
    description: "Temperate deciduous forest",
    species: [
      { name: 'Trees', trophicLevel: 'producer', biomass: 15000, energy: 150000, population: 500000, icon: '🌳', ecosystem: 'forest' },
      { name: 'Deer', trophicLevel: 'primary_consumer', biomass: 1100, energy: 11000, population: 30000, icon: '🦌', ecosystem: 'forest' },
      { name: 'Fox', trophicLevel: 'secondary_consumer', biomass: 110, energy: 1100, population: 3000, icon: '🦊', ecosystem: 'forest' },
      { name: 'Eagle', trophicLevel: 'tertiary_consumer', biomass: 9, energy: 90, population: 500, icon: '🦅', ecosystem: 'forest' }
    ]
  },
  aquatic: {
    name: "Aquatic Ecosystem",
    description: "Marine food chain",
    species: [
      { name: 'Phytoplankton', trophicLevel: 'producer', biomass: 12000, energy: 120000, population: 2000000, icon: '🌿', ecosystem: 'aquatic' },
      { name: 'Zooplankton', trophicLevel: 'primary_consumer', biomass: 1200, energy: 12000, population: 200000, icon: '🦐', ecosystem: 'aquatic' },
      { name: 'Fish', trophicLevel: 'secondary_consumer', biomass: 120, energy: 1200, population: 20000, icon: '🐟', ecosystem: 'aquatic' },
      { name: 'Shark', trophicLevel: 'tertiary_consumer', biomass: 12, energy: 120, population: 2000, icon: '🦈', ecosystem: 'aquatic' }
    ]
  },
  desert: {
    name: "Desert Ecosystem",
    description: "Arid desert with sparse vegetation",
    species: [
      { name: 'Cactus', trophicLevel: 'producer', biomass: 5000, energy: 50000, population: 100000, icon: '🌵', ecosystem: 'desert' },
      { name: 'Lizard', trophicLevel: 'primary_consumer', biomass: 500, energy: 5000, population: 10000, icon: '🦎', ecosystem: 'desert' },
      { name: 'Snake', trophicLevel: 'secondary_consumer', biomass: 50, energy: 500, population: 1000, icon: '🐍', ecosystem: 'desert' },
      { name: 'Vulture', trophicLevel: 'tertiary_consumer', biomass: 5, energy: 50, population: 100, icon: '🦅', ecosystem: 'desert' }
    ]
  },
  tundra: {
    name: "Tundra Ecosystem",
    description: "Arctic tundra with permafrost",
    species: [
      { name: 'Moss', trophicLevel: 'producer', biomass: 3000, energy: 30000, population: 500000, icon: '🍀', ecosystem: 'tundra' },
      { name: 'Caribou', trophicLevel: 'primary_consumer', biomass: 300, energy: 3000, population: 5000, icon: '🦌', ecosystem: 'tundra' },
      { name: 'Wolf', trophicLevel: 'secondary_consumer', biomass: 30, energy: 300, population: 500, icon: '🐺', ecosystem: 'tundra' },
      { name: 'Polar Bear', trophicLevel: 'tertiary_consumer', biomass: 3, energy: 30, population: 50, icon: '🐻‍❄️', ecosystem: 'tundra' }
    ]
  }
};
