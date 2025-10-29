import React, { useState , useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('product');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro',
      description: 'Latest Apple smartphone with advanced features',
      perDayPrice: 50,
      categoryName: 'Electronics',
      stock: 25,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Nike Air Max',
      description: 'Comfortable running shoes',
      perDayPrice: 15,
      categoryName: 'Sports',
      stock: 50,
      createdAt: '2024-01-16'
    },
    {
      id: 3,
      name: 'MacBook Pro',
      description: 'High-performance laptop for professionals',
      perDayPrice: 100,
      categoryName: 'Electronics',
      stock: 10,
      createdAt: '2024-01-17'
    },
    {
      id: 4,
      name: 'Designer T-Shirt',
      description: 'Premium cotton t-shirt',
      perDayPrice: 8,
      categoryName: 'Clothing',
      stock: 100,
      createdAt: '2024-01-18'
    },
    {
      id: 5,
      name: 'Programming Book',
      description: 'Complete guide to React development',
      perDayPrice: 5,
      categoryName: 'Books',
      stock: 30,
      createdAt: '2024-01-19'
    }
  ]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    perDayPrice: '',
    categoryName: '',
    stock: ''
  });

  const [categories, setCategories] = useState([]);

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/category/getallcategories`, {
          withCredentials: true,
        });
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert(error.response?.data?.message || "❌ Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'dashboard') {
      navigate('/dashboard');
    } else if (tab === 'category') {
      navigate('/category');
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

  const handleCreateProduct = async () => {
    console.log("Im isisde");
    console.log(formData);


    if (
      formData.name.trim() &&
      formData.perDayPrice &&
      formData.categoryId && // ✅ ensure categoryId is available
      formData.categoryName &&
      formData.stock
    ) {
      try {
        const createdBy = localStorage.getItem("adminId");
        console.log(createdBy);
        // 🧠 Get adminId from localStorage

        if (!createdBy) {
          alert("⚠️ Admin ID not found. Please log in again.");
          return;
        }

        // Prepare payload for backend
        const newProduct = {
          name: formData.name.trim(),
          description: formData.description,
          perDayPrice: parseFloat(formData.perDayPrice),
          categoryId: formData.categoryId,
          categoryName: formData.categoryName,
          stock: parseInt(formData.stock),
          createdBy, // ✅ comes from localStorage
        };

        console.log("enterdedProduct", newProduct);


        // Make API call
        const response = await axios.post(
          `${BASE_URL}/product/createproduct`,
          newProduct,
          {
            withCredentials: true, // ✅ send cookie with the request
          }
        );

        const createdProduct = response.data.product;
        setProducts([...products, createdProduct]); // update UI
        setFormData({
          name: "",
          description: "",
          perDayPrice: "",
          categoryId: "",
          categoryName: "",
          stock: "",
        });
        setShowCreateModal(false);

        alert("✅ Product created successfully!");
      } catch (error) {
        console.error("Error creating product:", error);
        alert(error.response?.data?.message || "❌ Failed to create product");
      }
    } else {
      alert("⚠️ Please fill in all required fields.");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      perDayPrice: product.perDayPrice.toString(),
      categoryName: product.categoryName,
      stock: product.stock.toString()
    });
    setShowCreateModal(true);
  };

  const handleUpdateProduct = () => {
    if (formData.name.trim() && formData.perDayPrice && formData.categoryName && formData.stock) {
      setProducts(products.map(prod =>
        prod.id === editingProduct.id
          ? {
            ...prod,
            name: formData.name,
            description: formData.description,
            perDayPrice: parseFloat(formData.perDayPrice),
            categoryName: formData.categoryName,
            stock: parseInt(formData.stock)
          }
          : prod
      ));
      setFormData({ name: '', description: '', perDayPrice: '', categoryName: '', stock: '' });
      setEditingProduct(null);
      setShowCreateModal(false);
    }
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(prod => prod.id !== id));
    }
  };

  const handleModalClose = () => {
    setShowCreateModal(false);
    setEditingProduct(null);
    setFormData({ name: '', description: '', perDayPrice: '', categoryName: '', stock: '' });
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
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${activeTab === 'dashboard'
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
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${activeTab === 'category'
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
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${activeTab === 'product'
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
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${activeTab === 'order'
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
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${activeTab === 'billing'
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
            <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>

            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products"
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

        {/* Product Content */}
        <main className="flex-1 p-6">
          {/* Create New Product Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Product
            </button>
          </div>

          {/* Products Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Per Day Price</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{product.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.perDayPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.categoryName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.createdAt}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
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

      {/* Create/Edit Product Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-500/5 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingProduct ? 'Edit Product' : 'Create New Product'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
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
                  placeholder="Enter product description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Per Day Price ($)</label>
                <input
                  type="number"
                  name="perDayPrice"
                  value={formData.perDayPrice}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price per day"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={(e) => {
                    const selectedCategory = categories.find(cat => cat.name === e.target.value);
                    setFormData({
                      ...formData,
                      categoryName: selectedCategory?.name || "",
                      categoryId: selectedCategory?._id || "",
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>

              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter stock quantity"
                  min="0"
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
                onClick={editingProduct ? handleUpdateProduct : handleCreateProduct}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {editingProduct ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
