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

  // handle login with username and password
  const handleLogin = async (username, password) => {
    try {
      const data = await login(username, password); // Call the login function from API
      localStorage.setItem("accessToken", data.access); // Store access token
      localStorage.setItem("refreshToken", data.refresh); // Store refresh token
      setIsAuthenticated(true); // Set authenticated state
      await loadUserInfo(data.access); // Load user info using the access token
    } catch (error) {
      console.error("Login failed:", error); // Handle login error
      throw error; // Re-throw the error to be handled by the caller (Login.js)
    }
  };

  // handle registration with username, email, and password
  const handleRegister = async (username, email, password) => {
    try {
      await register(username, email, password); // Call the register function from API
    } catch (error) {
      console.error("Registration failed:", error); // Handle registration error
    }
  };

  // handle logout and clear the authentication state
  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refreshToken");
      await logout(refresh); // Call the logout function from API
      localStorage.removeItem("accessToken"); // Remove access token from localStorage
      localStorage.removeItem("refreshToken"); // Remove refresh token from localStorage
      setIsAuthenticated(false); // Set authenticated state to false
      setUser(null); // Clear user data
    } catch (error) {
      console.error("Logout failed:", error); // Handle logout error
    }
  };

  // Memoizing the loadUserInfo function to prevent unnecessary re-creations
  const loadUserInfo = useCallback(async (token) => {
    try {
      const data = await getUserData(token); // Get user data from API
      setUser(data); // Set user data in state
      setIsAuthenticated(true); // Set authenticated state to true
    } catch (error) {
      if (error.response && error.response.status === 401) {
        const newToken = await attemptTokenRefresh(); // Attempt to refresh the token
        if (newToken) {
          await loadUserInfo(newToken); // Recursively load user info with new token
        } else {
          handleLogout(); // Log out if token refresh fails
        }
      } else {
        console.error("Failed to load user info:", error); // Handle other errors
      }
    }
  }, []); // Empty dependency array ensures this function is only created once

  // Attempt to refresh the token if it's expired
  const attemptTokenRefresh = async () => {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) return null;

    try {
      const data = await refreshToken(refresh); // Call the refresh token API
      localStorage.setItem("accessToken", data.access); // Store new access token
      return data.access; // Return the new access token
    } catch (error) {
      console.error("Token refresh failed:", error); // Handle token refresh error
      return null;
    }
  };

  // UseEffect to load user info when component mounts
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      loadUserInfo(token); // Load user info if access token exists
    }
  }, [loadUserInfo]); // Dependency on memoized loadUserInfo

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
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
