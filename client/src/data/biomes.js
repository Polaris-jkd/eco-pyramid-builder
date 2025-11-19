export const BIOME_TEMPLATES = {
  grassland: {
    name: "Grassland Ecosystem",
    species: [
      { name: 'Grass', trophicLevel: 'producer', biomass: 10000, energy: 100000, population: 1000000, icon: '🌱' },
      { name: 'Grasshopper', trophicLevel: 'primary_consumer', biomass: 1000, energy: 10000, population: 100000, icon: '🦗' },
      { name: 'Snake', trophicLevel: 'secondary_consumer', biomass: 90, energy: 900, population: 5000, icon: '🐍' },
      { name: 'Hawk', trophicLevel: 'tertiary_consumer', biomass: 10, energy: 100, population: 1000, icon: '🦅' }
    ]
  },
  aquatic: {
    name: "Aquatic Ecosystem",
    species: [
      { name: 'Phytoplankton', trophicLevel: 'producer', biomass: 12000, energy: 120000, population: 2000000, icon: '🌿' },
      { name: 'Zooplankton', trophicLevel: 'primary_consumer', biomass: 1200, energy: 12000, population: 200000, icon: '🦐' },
      { name: 'Fish', trophicLevel: 'secondary_consumer', biomass: 120, energy: 1200, population: 20000, icon: '🐟' },
      { name: 'Shark', trophicLevel: 'tertiary_consumer', biomass: 12, energy: 120, population: 2000, icon: '🦈' }
    ]
  },
  forest: {
    name: "Forest Ecosystem",
    species: [
      { name: 'Trees', trophicLevel: 'producer', biomass: 15000, energy: 150000, population: 500000, icon: '🌳' },
      { name: 'Deer', trophicLevel: 'primary_consumer', biomass: 1100, energy: 11000, population: 30000, icon: '🦌' },
      { name: 'Fox', trophicLevel: 'secondary_consumer', biomass: 110, energy: 1100, population: 3000, icon: '🦊' },
      { name: 'Eagle', trophicLevel: 'tertiary_consumer', biomass: 9, energy: 90, population: 500, icon: '🦅' }
    ]
  }
};
