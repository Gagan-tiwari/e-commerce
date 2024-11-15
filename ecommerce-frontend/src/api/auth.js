import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}register/`, {
      username,
      email,
      password,
    });
    return response.data; // return the response data after successful registration
  } catch (error) {
    console.error("Registration error:", error);
    throw error; // Re-throw error for the caller to handle
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}token/`, {
      username,
      password,
    });
    return response.data; // return the data from login (access token, refresh token)
  } catch (error) {
    console.error("Login error:", error);
    throw error; // Re-throw error for the caller to handle
  }
};

export const getUserData = async (accessToken) => {
  try {
    const response = await axios.get(`${API_URL}user/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data; // return user data
  } catch (error) {
    console.error("Get User Data error:", error);
    throw error; // Re-throw error for the caller to handle
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_URL}token/refresh/`, {
      refresh: refreshToken,
    });
    return response.data; // return new access token
  } catch (error) {
    console.error("Refresh Token error:", error);
    throw error; // Re-throw error for the caller to handle
  }
};

export const logout = async (refreshToken) => {
  try {
    const response = await axios.post(`${API_URL}logout/`, {
      refresh: refreshToken,
    });
    return response.data; // Optionally handle response data, even if empty
  } catch (error) {
    console.error("Logout error:", error);
    throw error; // Re-throw error for the caller to handle
  }
};
