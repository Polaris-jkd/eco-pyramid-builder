import axios from 'axios';

// Environment-based API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Health check (optional)
export const testConnection = async () => {
  const response = await axios.get(`${API_BASE_URL}/health`);
  return response.data;
};

// Species endpoints
export const getAllSpecies = async () => {
  const response = await axios.get(`${API_BASE_URL}/species`);
  return response.data;
};

export const addSpecies = async (speciesData) => {
  const response = await axios.post(`${API_BASE_URL}/species`, speciesData);
  return response.data;
};

export const deleteSpecies = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/species/${id}`);
  return response.data;
};

// Pyramid endpoints (if using pyramid saving features)
export const getAllPyramids = async () => {
  const response = await axios.get(`${API_BASE_URL}/pyramids`);
  return response.data;
};

export const createPyramid = async (pyramidData) => {
  const response = await axios.post(`${API_BASE_URL}/pyramids`, pyramidData);
  return response.data;
};

// ML prediction
export const predictBiomass = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/predict`, { data });
  return response.data;
};
