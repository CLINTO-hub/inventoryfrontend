import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ Send credentials and allow cookies to be stored
      const response = await axios.post(`${BASE_URL}/admin/adminlogin`, formData, {
        withCredentials: true, // send and store cookie automatically
      });

      if (response.data?.admin) {
        const adminId = response.data.admin.id;
        localStorage.setItem("adminId", adminId);
        navigate("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid credentials.");
      } else {
        setError("Server error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-800 relative overflow-hidden">
      {/* Floating Background Elements (same as before) */}
      {/* ... your motion divs here ... */}

      {/* Glass Effect Login Card */}
      <div className="relative bg-white/15 backdrop-blur-xl p-8 rounded-3xl w-[90%] max-w-[520px] shadow-2xl border border-white/30 mx-4">
        <h2 className="text-blue-900 text-2xl font-bold mb-8 text-center">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-6">
            <label className="block text-blue-900 text-sm font-medium mb-3 text-left">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              className="w-full p-4 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-200 shadow-sm"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-blue-900 text-sm font-medium mb-3 text-left">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full p-4 pr-12 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-200 shadow-sm"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-xl mb-8 transition-colors duration-200 font-medium text-lg shadow-lg"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
