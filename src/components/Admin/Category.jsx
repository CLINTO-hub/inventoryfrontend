import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('category');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', description: 'Electronic devices and gadgets', createdAt: '2024-01-15' },
    { id: 2, name: 'Clothing', description: 'Fashion and apparel items', createdAt: '2024-01-16' },
    { id: 3, name: 'Books', description: 'Books and educational materials', createdAt: '2024-01-17' },
    { id: 4, name: 'Home & Garden', description: 'Home improvement and garden supplies', createdAt: '2024-01-18' },
    { id: 5, name: 'Sports', description: 'Sports equipment and accessories', createdAt: '2024-01-19' }
  ]);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'dashboard') {
      navigate('/dashboard');
    } else if (tab === 'product') {
      navigate('/product');
    } else if (tab === 'order') {
      navigate('/order');
    } else if (tab === 'billing') {
      navigate('/billing');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateCategory = () => {
    if (formData.name.trim()) {
      const newCategory = {
        id: categories.length + 1,
        name: formData.name,
        description: formData.description,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCategories([...categories, newCategory]);
      setFormData({ name: '', description: '' });
      setShowCreateModal(false);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description
    });
    setShowCreateModal(true);
  };

  const handleUpdateCategory = () => {
    if (formData.name.trim()) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, name: formData.name, description: formData.description }
          : cat
      ));
      setFormData({ name: '', description: '' });
      setEditingCategory(null);
      setShowCreateModal(false);
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleModalClose = () => {
    setShowCreateModal(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-100 shadow-lg">
        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">ProTend</h1>
              <p className="text-sm text-gray-500">Project Management Admin</p>
            </div>
            <button className="ml-auto text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          <div className="px-4">
            <button
              onClick={() => handleTabClick('dashboard')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-gray-200 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </button>

            <button
              onClick={() => handleTabClick('category')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${
                activeTab === 'category'
                  ? 'bg-gray-200 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Category
            </button>

            <button
              onClick={() => handleTabClick('product')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${
                activeTab === 'product'
                  ? 'bg-gray-200 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Product
            </button>

          <button
            onClick={() => handleTabClick('order')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${
              activeTab === 'order'
                ? 'bg-gray-200 text-blue-600 border-l-4 border-blue-600'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2h6v2m-7 4h8a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h2" />
            </svg>
            Order
          </button>

          <button
            onClick={() => handleTabClick('billing')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${
              activeTab === 'billing'
                ? 'bg-gray-200 text-blue-600 border-l-4 border-blue-600'
                : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l2-2 4 4m0 0l4-4m-4 4V7" />
            </svg>
            Billing
          </button>
          </div>
        </nav>

        {/* Dark Mode Toggle */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">🌙 Darkmode</span>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-10 h-6 bg-gray-300 rounded-full shadow-inner"></div>
              <div className="absolute top-1 right-1 w-4 h-4 bg-blue-600 rounded-full shadow transform transition-transform"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search categories"
                  className="w-64 px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Language Selector */}
              <select className="px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>EN</option>
              </select>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">Randy Riley</p>
                  <p className="text-xs text-gray-500">randy.riley@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Category Content */}
        <main className="flex-1 p-6">
          {/* Create New Category Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Category
            </button>
          </div>

          {/* Categories Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{category.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.createdAt}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditCategory(category)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Create/Edit Category Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter category description"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingCategory ? handleUpdateCategory : handleCreateCategory}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {editingCategory ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
