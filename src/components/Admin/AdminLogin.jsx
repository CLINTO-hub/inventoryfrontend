import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation - in real app, you'd validate with backend
    if (formData.email && formData.password) {
      navigate('/dashboard');
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-blue-800 relative overflow-hidden">
      {/* Exact Background Components from Images */}
      
      {/* Top Left - C-shaped tube (Image 2) */}
      <motion.div
        className="absolute w-40 h-40 top-[2%] left-[2%] opacity-70"
        animate={{
          y: [0, -15, 0],
          x: [0, 8, 0],
          rotate: [0, 3, 0],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      >
        <div className="w-full h-full relative">
          {/* C-shaped tube with gradient */}
          <div className=""></div>
          <div className=""></div>
          <img src='/Groupimage2.png'></img>
        </div>
      </motion.div>

      {/* Mid-Left - N/M shaped tubes (Image 6) */}
      <motion.div
        className="absolute w-32 h-28 top-[30%] left-[5%] opacity-60"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          rotate: [0, -2, 0],
        }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      >
        <div className="w-full h-full relative">
            <img src='/Groupimage.png'></img>
          {/* N/M shaped overlapping tubes */}
          <div className=""></div>
          <div className="">

          </div>
        </div>
      </motion.div>

      {/* Bottom Left - G/spiral shaped tube */}
      <motion.div
        className="absolute w-48 h-32 top-[65%] left-[1%] opacity-65"
        animate={{
          y: [0, 25, 0],
          x: [0, 12, 0],
          rotate: [0, 5, 0],
        }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      >
        <div className="w-full h-full relative">
          {/* G/spiral shaped tube */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300 via-cyan-200 to-blue-400 rounded-full blur-sm transform rotate-15"></div>
          <div className="absolute inset-1 bg-gradient-to-br from-blue-200 to-cyan-100 rounded-full blur-sm transform rotate-15"></div>
        </div>
      </motion.div>

      {/* Top Right - Serpentine tube (Image 4) */}
      <motion.div
        className="absolute w-36 h-48 top-[5%] right-[5%] opacity-55"
        animate={{
          y: [0, -20, 0],
          x: [0, -12, 0],
          rotate: [0, -3, 0],
        }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
      >
        <div className="w-full h-full relative">
          {/* Serpentine tube */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-200 via-blue-300 to-blue-400 rounded-full blur-sm transform -rotate-30"></div>
          <div className="absolute inset-1 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-full blur-sm transform -rotate-30"></div>
        </div>
      </motion.div>

      {/* Mid-Right - W-shaped tube (Image 5) */}
      <motion.div
        className="absolute w-28 h-20 top-[35%] right-[8%] opacity-50"
        animate={{
          y: [0, 18, 0],
          x: [0, 10, 0],
          rotate: [0, 4, 0],
        }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      >
        <div className="w-50 h-full relative">
          {/* W-shaped tube */}
          <div className="w-50 h-full "></div>
          <div className="">
            <img src='/red.png'></img>
          </div>
        </div>
      </motion.div>

      {/* Bottom Right - Horizontal blob */}
      <motion.div
        className="absolute w-44 h-24 top-[70%] right-[2%] opacity-60"
        animate={{
          y: [0, 20, 0],
          x: [0, -15, 0],
          rotate: [0, -2, 0],
        }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
      >
        <div className="w-full h-full relative">
          {/* Horizontal blob */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full blur-sm transform -rotate-10"></div>
          <div className="absolute inset-1 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full blur-sm transform -rotate-10"></div>
        </div>
      </motion.div>

      {/* Additional floating elements for depth */}
      <motion.div
        className="absolute w-20 h-20 top-[15%] left-[20%] opacity-40"
        animate={{
          y: [0, 30, 0],
          x: [0, 15, 0],
          rotate: [0, 360],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: 'easeInOut' }}
      >
        <div className="w-50 h-50">
            <img src='/Groupimage2.png'></img> 
        </div>
      </motion.div>

      <motion.div
        className="absolute w-16 h-16 top-[55%] right-[20%] opacity-45"
        animate={{
          y: [0, -25, 0],
          x: [0, -10, 0],
          rotate: [0, -180],
        }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
      >
        <div className="w-50 h-full ">
            <img src='/Groupimage.png'></img>
        </div>
      </motion.div>

      {/* Glass Effect Login Card - Exact Match */}
      <div className="relative bg-white/15 backdrop-blur-xl p-8 rounded-3xl w-[90%] max-w-[520px] shadow-2xl border border-white/30 mx-4">
      
        {/* Logo */}
    
        
        {/* Login Title */}
        <h2 className="text-blue-900 text-2xl font-bold mb-8 text-center">Admin Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-blue-900 text-sm font-medium mb-3 text-left">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="username@gmail.com"
              className="w-full p-4 rounded-xl bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-200 shadow-sm"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-blue-900 text-sm font-medium mb-3 text-left">Password</label>
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
              <button type="button" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-8">
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium">
            Forgot Password?
          </a>
        </div>

          {/* Sign In Button */}
          <button type="submit" className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-xl mb-8 transition-colors duration-200 font-medium text-lg shadow-lg">
            Sign in
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center mb-8">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-white text-sm">or continue with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-8">
          <button className="bg-white p-4 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-md border border-gray-200">
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" className="w-6 h-6" />
          </button>
          <button className="bg-white p-4 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-md border border-gray-200">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" className="w-6 h-6" />
          </button>
          <button className="bg-white p-4 rounded-full hover:bg-gray-50 transition-colors duration-200 shadow-md border border-gray-200">
            <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-6 h-6" />
          </button>
        </div>

        {/* Registration Link */}
        {/* <p className="text-gray-600 text-sm text-center">
          Don't have an account yet?{' '}
          <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
            Register for free
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default AdminLogin;
