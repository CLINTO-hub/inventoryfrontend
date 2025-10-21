import React from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import AdminLogin from './components/Admin/AdminLogin.jsx';
import Dashboard from './components/Admin/Dashboard.jsx';
import Category from './components/Admin/Category.jsx';
import Product from './components/Admin/Product.jsx';
import Order from './components/Admin/Order.jsx';
import Billing from './components/Admin/Billing.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminLogin/>}/>
        <Route path="/Adminlogin" element={<AdminLogin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/category" element={<Category/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/order" element={<Order/>}/>
        <Route path="/billing" element={<Billing/>}/>
      </Routes>
    </>
  )
}

export default App
