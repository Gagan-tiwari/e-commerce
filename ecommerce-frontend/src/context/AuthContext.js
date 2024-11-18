import React, { useState, useEffect, createContext, useCallback } from "react";
import {
  login,
  register,
  getUserData,
  refreshToken,
  logout,
} from "../api/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Handle user login
  const handleLogin = async (username, password) => {
    try {
      const data = await login(username, password); // API call for login
      storeTokens(data.access, data.refresh); // Save tokens securely
      setIsAuthenticated(true); // Update authentication state
      await loadUserInfo(data.access); // Fetch user data
    } catch (error) {
      console.error("Login failed:", error?.response?.data || error.message);
      throw error; // Re-throw for further handling in UI
    }
  };

  // Handle user registration
  const handleRegister = async (username, email, password) => {
    try {
      await register(username, email, password); // API call for registration
    } catch (error) {
      console.error("Registration failed:", error?.response?.data || error.message);
      throw error; // Re-throw to notify UI
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      const refresh = getRefreshToken();
      if (refresh) {
        await logout(refresh); // API call for logout
      }
    } catch (error) {
      console.error("Logout failed:", error?.response?.data || error.message);
    } finally {
      clearAuthState(); // Clear tokens and reset state
    }
  };

  // Fetch user data and authenticate
  const loadUserInfo = useCallback(async (token) => {
    try {
      const data = await getUserData(token); // Fetch user details
      setUser(data); // Update user state
      setIsAuthenticated(true); // Mark as authenticated
    } catch (error) {
      console.error("Failed to load user info:", error.message);
      if (error.response?.status === 401) {
        const newToken = await attemptTokenRefresh(); // Refresh token if expired
        if (newToken) {
          await loadUserInfo(newToken); // Retry with refreshed token
        } else {
          clearAuthState(); // Clear state if refresh fails
        }
      }
    }
  }, []);

  // Refresh token if expired
  const attemptTokenRefresh = async () => {
    try {
      const refresh = getRefreshToken();
      if (!refresh) return null;

      const data = await refreshToken(refresh); // API call to refresh token
      storeTokens(data.access, refresh); // Store new access token
      return data.access;
    } catch (error) {
      console.error("Token refresh failed:", error.message);
      clearAuthState(); // Clear state if refresh fails
      return null;
    }
  };

  // Store tokens securely
  const storeTokens = (access, refresh) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  };

  // Clear tokens and authentication state
  const clearAuthState = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  // Get refresh token from storage
  const getRefreshToken = () => localStorage.getItem("refreshToken");

  // Load user data on app startup
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      loadUserInfo(token).finally(() => setLoading(false)); // Ensure loading state is updated
    } else {
      setLoading(false); // No token, loading complete
    }
  }, [loadUserInfo]);

  // AuthContext provider value
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading, // Loading state for conditional rendering
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
