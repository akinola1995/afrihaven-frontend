import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// User Registration
export const registerUser = (userData) => api.post('/auth/register', userData);

// Get all properties
export const getProperties = () => api.get('/properties');

// Create a property
export const createProperty = (propertyData) => api.post('/properties', propertyData);

// Submit maintenance request
export const submitMaintenance = (data) => api.post('/maintenance', data);

// Get maintenance requests
export const getMaintenanceRequests = () => api.get('/maintenance');

export default api;