import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../App.css";

function Login() {
  const { handleLogin } = useContext(AuthContext); // Get handleLogin from context
  const [username, setUsername] = useState(""); // Track username
  const [password, setPassword] = useState(""); // Track password
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(username, password); // Call handleLogin with username and password
      navigate("/"); // Navigate to the homepage on successful login
    } catch (error) {
      console.error("Login failed:", error); // Log error if login fails
      alert("Invalid credentials. Please try again."); // Show error message to the user
    }
  };

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src={require("../assets/login.png")}
          alt="Login Illustration"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-green-500 text-center">
          <Link to="/register" className="hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
