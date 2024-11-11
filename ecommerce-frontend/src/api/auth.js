
import axios from 'axios';

const API_URL = "http://localhost:8000/api/";

export const register = (userData) => axios.post(`${API_URL}register/`, userData);
export const login = (credentials) => axios.post(`${API_URL}token/`, credentials);
export const fetchUserInfo = (token) => axios.get(`${API_URL}user-info/`, {
    headers: { Authorization: `Bearer ${token}` },
});
