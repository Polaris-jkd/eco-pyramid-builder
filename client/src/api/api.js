import axios from 'axios';

// Environment-based API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Health check (optional)
export const testConnection = async () => {
  const response = await axios.get(`${API_BASE_URL}/`);
  return response.data;
};

// Species endpoints
export const getAllSpecies = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/species`);
  return response.data;
};

export const addSpecies = async (speciesData) => {
  const response = await axios.post(`${API_BASE_URL}/api/species`, speciesData);
  return response.data;
};

export const deleteSpecies = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/api/species/${id}`);
  return response.data;
};

// Pyramid endpoints (if using pyramid saving features)
export const getAllPyramids = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/pyramids`);
  return response.data;
};

export const createPyramid = async (pyramidData) => {
  const response = await axios.post(`${API_BASE_URL}/api/pyramids`, pyramidData);
  return response.data;
};

// ML prediction - FIXED FORMAT
export const predictBiomass = async (speciesArray) => {
  // Backend FastAPI expects { data: [...] } format
  const payload = {
    data: speciesArray.map(s => ({
      name: s.name,
      trophicLevel: s.trophicLevel,
      biomass: s.biomass,
      energy: s.energy,
      population: s.population || 100,
      ecosystem: s.ecosystem || 'grassland'
    }))
  };
  
  console.log('Sending prediction request:', payload); // Debug log
  
  const response = await axios.post(`${API_BASE_URL}/predict`, payload);
  
  console.log('Prediction response:', response.data); // Debug log
  
  return response.data;
};
