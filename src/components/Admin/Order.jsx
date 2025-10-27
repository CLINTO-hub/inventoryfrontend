import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialOrders = [
  {
    id: 1,
    customerName: 'John Doe',
    customerPhoneNumber: '9876543210',
    rentingStartDate: '2025-10-01',
    rentingEndDate: '2025-10-05',
    totalPrice: 400,
    rentedAmount: 200,
    paymentStatus: 'pending',
    orderStatus: 'on_rent',
    productName: 'iPhone 15 Pro',
    categoryName: 'Electronics'
  },
  {
    id: 2,
    customerName: 'Priya Sharma',
    customerPhoneNumber: '9123456780',
    rentingStartDate: '2025-09-15',
    rentingEndDate: '2025-09-20',
    totalPrice: 250,
    rentedAmount: 250,
    paymentStatus: 'paid',
    orderStatus: 'returned_after_rent',
    productName: 'Nike Air Max',
    categoryName: 'Sports'
  }
];

const statusOptions = [
  { value: 'on_rent', label: 'On Rent' },
  { value: 'returned_after_rent', label: 'Returned After Rent' },
  { value: 'cancelled', label: 'Cancelled' }
];

const paymentOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'failed', label: 'Failed' }
];

const Order = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('order');
  const [orders, setOrders] = useState(initialOrders);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [query, setQuery] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhoneNumber: '',
    rentingStartDate: '',
    rentingEndDate: '',
    totalPrice: '',
    rentedAmount: '',
    paymentStatus: 'pending',
    orderStatus: 'on_rent',
    productName: '',
    categoryName: ''
  });

  const filteredOrders = useMemo(() => {
    if (!query.trim()) return orders;
    const q = query.toLowerCase();
    return orders.filter(o =>
      String(o.id).includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerPhoneNumber.toLowerCase().includes(q) ||
      o.productName.toLowerCase().includes(q) ||
      o.categoryName.toLowerCase().includes(q) ||
      o.orderStatus.toLowerCase().includes(q) ||
      o.paymentStatus.toLowerCase().includes(q)
    );
  }, [orders, query]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === 'dashboard') navigate('/dashboard');
    if (tab === 'category') navigate('/category');
    if (tab === 'product') navigate('/product');
    if (tab === 'billing') navigate('/billing');
  };

  const openCreate = () => {
    setEditingOrder(null);
    setFormData({
      customerName: '',
      customerPhoneNumber: '',
      rentingStartDate: '',
      rentingEndDate: '',
      totalPrice: '',
      rentedAmount: '',
      paymentStatus: 'pending',
      orderStatus: 'on_rent',
      productName: '',
      categoryName: ''
    });
    setShowModal(true);
  };

  const openEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      customerName: order.customerName,
      customerPhoneNumber: order.customerPhoneNumber,
      rentingStartDate: order.rentingStartDate,
      rentingEndDate: order.rentingEndDate,
      totalPrice: String(order.totalPrice),
      rentedAmount: String(order.rentedAmount),
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      productName: order.productName,
      categoryName: order.categoryName
    });
    setShowModal(true);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const required = ['customerName','customerPhoneNumber','rentingStartDate','rentingEndDate','totalPrice','rentedAmount','productName','categoryName'];
    const missing = required.find(k => !String(formData[k]).trim());
    if (missing) return alert('Please fill all required fields');

    if (editingOrder) {
      setOrders(orders.map(o => o.id === editingOrder.id ? {
        ...o,
        ...formData,
        totalPrice: Number(formData.totalPrice),
        rentedAmount: Number(formData.rentedAmount)
      } : o));
    } else {
      const newOrder = {
        id: Math.max(0, ...orders.map(o => o.id)) + 1,
        ...formData,
        totalPrice: Number(formData.totalPrice),
        rentedAmount: Number(formData.rentedAmount)
      };
      setOrders([newOrder, ...orders]);
    }
    setShowModal(false);
    setEditingOrder(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this order?')) return;
    setOrders(orders.filter(o => o.id !== id));
  };

  const updateStatusInline = (id, field, value) => {
    setOrders(orders.map(o => o.id === id ? { ...o, [field]: value } : o));
  };

  const goToBilling = (order) => {
    navigate('/billing', { state: { order } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-100 shadow-lg">
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
            <button onClick={() => handleTabClick('dashboard')} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${activeTab === 'dashboard' ? 'bg-gray-200 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </button>

            <button onClick={() => handleTabClick('category')} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${activeTab === 'category' ? 'bg-gray-200 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Category
            </button>

            <button onClick={() => handleTabClick('product')} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${activeTab === 'product' ? 'bg-gray-200 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Product
            </button>

            <button onClick={() => handleTabClick('order')} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${activeTab === 'order' ? 'bg-gray-200 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2h6v2m-7 4h8a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h2" />
              </svg>
              Order
            </button>

            <button onClick={() => handleTabClick('billing')} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors ${activeTab === 'billing' ? 'bg-gray-200 text-blue-600 border-l-4 border-blue-600' : 'text-gray-600 hover:bg-gray-200'}`}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l2-2 4 4m0 0l4-4m-4 4V7" />
              </svg>
              Billing
            </button>
          </div>
        </nav>

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
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input type="text" placeholder="Search orders" value={query} onChange={(e)=>setQuery(e.target.value)} className="w-64 px-4 py-2 pl-10 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button onClick={openCreate} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Order
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.customerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerPhoneNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.productName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.categoryName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.rentingStartDate} → {order.rentingEndDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.totalPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.rentedAmount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <select value={order.paymentStatus} onChange={(e)=>updateStatusInline(order.id,'paymentStatus',e.target.value)} className="border rounded px-2 py-1 text-sm">
                          {paymentOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <select value={order.orderStatus} onChange={(e)=>updateStatusInline(order.id,'orderStatus',e.target.value)} className="border rounded px-2 py-1 text-sm">
                          {statusOptions.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button onClick={()=>openEdit(order)} className="text-blue-600 hover:text-blue-900 transition-colors" title="Edit">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                          </button>
                          <button onClick={()=>handleDelete(order.id)} className="text-red-600 hover:text-red-900 transition-colors" title="Delete">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                          </button>
                          <button onClick={()=>goToBilling(order)} className="text-green-600 hover:text-green-800 transition-colors" title="Generate Bill">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 8H3a2 2 0 01-2-2V6a2 2 0 012-2h12l6 6v8a2 2 0 01-2 2z"/></svg>
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

      {/* Create / Edit Order Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500/5 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{editingOrder ? 'Edit Order' : 'Create Order'}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                <input name="customerName" value={formData.customerName} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter customer name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input name="customerPhoneNumber" value={formData.customerPhoneNumber} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter phone" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input type="date" name="rentingStartDate" value={formData.rentingStartDate} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input type="date" name="rentingEndDate" value={formData.rentingEndDate} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input name="productName" value={formData.productName} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter product name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <input name="categoryName" value={formData.categoryName} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter category" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Price</label>
                <input type="number" name="totalPrice" value={formData.totalPrice} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" min="0" step="0.01" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Paid Amount</label>
                <input type="number" name="rentedAmount" value={formData.rentedAmount} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" min="0" step="0.01" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                <select name="paymentStatus" value={formData.paymentStatus} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  {paymentOptions.map(o => (<option key={o.value} value={o.value}>{o.label}</option>))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Order Status</label>
                <select name="orderStatus" value={formData.orderStatus} onChange={handleInput} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  {statusOptions.map(o => (<option key={o.value} value={o.value}>{o.label}</option>))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button onClick={()=>{setShowModal(false); setEditingOrder(null);}} className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">{editingOrder ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;


