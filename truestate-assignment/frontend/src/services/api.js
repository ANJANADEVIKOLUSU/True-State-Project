// src/services/api.js
import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const fetchSales = async (params) => {
  const res = await axios.get(`${API_BASE_URL}/api/sales`, { params });
  return res.data;
};
