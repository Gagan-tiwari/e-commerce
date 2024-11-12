import React, { useState, useEffect } from "react";
import { login, register, fetchUserInfo } from "../api/auth";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      const { data } = await login(credentials);
      localStorage.setItem("token", data.access);
      setIsAuthenticated(true);
      await loadUserInfo(data.access);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  const loadUserInfo = async (token) => {
    try {
      const { data } = await fetchUserInfo(token);
      setUser(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token expired or invalid, log the user out
        handleLogout();
      } else {
        console.error("Failed to load user info:", error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadUserInfo(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
