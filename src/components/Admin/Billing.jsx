import React, { useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Billing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order || null;
  const invoiceRef = useRef(null);

  const formatINR = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(value || 0));

  const rentedDays = useMemo(() => {
    if (!order) return 0;
    const start = new Date(order.rentingStartDate);
    const end = new Date(order.rentingEndDate);
    const diffMs = Math.max(0, end - start);
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24)) || 1;
  }, [order]);

  const perDayPrice = useMemo(() => {
    if (!order) return 0;
    const days = rentedDays || 1;
    return (Number(order.totalPrice) / days).toFixed(2);
  }, [order, rentedDays]);

  const billText = useMemo(() => {
    if (!order) return '';
    return `Bill for Order #${order.id}\n` +
      `Customer: ${order.customerName} (${order.customerPhoneNumber})\n` +
      `Product: ${order.productName} [${order.categoryName}]\n` +
      `From ${order.rentingStartDate} to ${order.rentingEndDate} (${rentedDays} days)\n` +
      `Per-day: ${formatINR(perDayPrice)}\nTotal: ${formatINR(order.totalPrice)}\nPaid: ${formatINR(order.rentedAmount)}\nPayment: ${order.paymentStatus}\nStatus: ${order.orderStatus}`;
  }, [order, rentedDays, perDayPrice]);

  const ensureHtml2Canvas = async () => {
    if (window.html2canvas) return window.html2canvas;
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
      script.onload = () => resolve();
      script.onerror = reject;
      document.body.appendChild(script);
    });
    return window.html2canvas;
  };

  const shareOnWhatsApp = async () => {
    try {
      // Try to render invoice area to image and share
      const html2canvas = await ensureHtml2Canvas();
      if (invoiceRef.current && html2canvas) {
        const canvas = await html2canvas(invoiceRef.current, { scale: 2, backgroundColor: '#ffffff' });
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

        if (blob && navigator.canShare && navigator.canShare({ files: [new File([blob], 'invoice.png', { type: 'image/png' })] })) {
          const file = new File([blob], 'invoice.png', { type: 'image/png' });
          await navigator.share({ files: [file], title: `Invoice ${order?.id || ''}` });
          return;
        }
      }
    } catch (e) {
      // Fallback to text flow below
    }
    // Fallback: share clean text-only bill via WhatsApp
    const text = encodeURIComponent(billText);
    const url = `https://wa.me/?text=${text}`;
    window.open(url, '_blank');
  };

  const shareByEmail = () => {
    const subject = encodeURIComponent(`Bill for Order #${order?.id || ''}`);
    const body = encodeURIComponent(billText);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const printBill = () => {
    // Open a print-only window that includes only the invoice content
    const content = invoiceRef.current?.innerHTML || '';
    const w = window.open('', 'PRINT', 'height=800,width=600');
    if (!w) return window.print();
    w.document.write(`<!doctype html><html><head><title>Invoice</title>
      <style>
        * { box-sizing: border-box; }
        body { font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif; margin: 0; padding: 24px; }
        .invoice { max-width: 900px; margin: 0 auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { text-align: left; padding: 12px; border-bottom: 1px solid #e5e7eb; }
        thead th { background: #f9fafb; font-size: 12px; text-transform: uppercase; color: #6b7280; }
        .totals { width: 100%; }
        .totals-row { display: flex; justify-content: flex-end; gap: 24px; }
      </style></head><body><div class="invoice">${content}</div></body></html>`);
    w.document.close();
    w.focus();
    w.print();
    w.close();
  };

  const goBackToOrders = () => navigate('/order');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar mimic for consistent nav */}
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
          </div>
        </div>
        <nav className="mt-6">
          <div className="px-4">
            <button onClick={()=>navigate('/dashboard')} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors text-gray-600 hover:bg-gray-200`}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              Dashboard
            </button>
            <button onClick={()=>navigate('/category')} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors text-gray-600 hover:bg-gray-200`}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
              Category
            </button>
            <button onClick={()=>navigate('/product')} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors text-gray-600 hover:bg-gray-200`}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
              Product
            </button>
            <button onClick={()=>navigate('/order')} className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors bg-gray-200 text-blue-600 border-l-4 border-blue-600`}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2h6v2m-7 4h8a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h2"/></svg>
              Order
            </button>
            <button className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-2 transition-colors bg-gray-200 text-blue-600 border-l-4 border-blue-600`}>
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l2-2 4 4m0 0l4-4m-4 4V7"/></svg>
              Billing
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Billing</h1>
            <div className="flex items-center space-x-2">
              <button onClick={goBackToOrders} className="px-4 py-2 text-gray-700 hover:text-gray-900">Back to Orders</button>
              <button onClick={shareOnWhatsApp} disabled={!order} className={`px-4 py-2 rounded-lg text-white ${order ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'}`}>Share WhatsApp</button>
              <button onClick={shareByEmail} disabled={!order} className={`px-4 py-2 rounded-lg text-white ${order ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'}`}>Email</button>
              <button onClick={printBill} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white">Print</button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6">
          {!order ? (
            <div className="bg-white p-6 rounded-xl border border-gray-200 text-gray-600">No order selected. Open an order and click Generate Bill.</div>
          ) : (
            <div ref={invoiceRef} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Invoice</h2>
                <p className="text-sm text-gray-500">Generated on {new Date().toLocaleDateString()}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Customer</h3>
                  <p className="text-gray-800">{order.customerName}</p>
                  <p className="text-gray-600">{order.customerPhoneNumber}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Order</h3>
                  <p className="text-gray-800">Order #{order.id}</p>
                  <p className="text-gray-600">{order.rentingStartDate} → {order.rentingEndDate} ({rentedDays} days)</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Product</h3>
                  <p className="text-gray-800">{order.productName}</p>
                  <p className="text-gray-600">{order.categoryName}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Payment</h3>
                  <p className="text-gray-800">Status: {order.paymentStatus}</p>
                  <p className="text-gray-800">Paid: {formatINR(order.rentedAmount)}</p>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Per Day</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.productName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{rentedDays}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatINR(perDayPrice)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatINR(order.totalPrice)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-6">
                <div className="w-full md:w-1/3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>{formatINR(order.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Paid</span>
                    <span>-{formatINR(order.rentedAmount)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900 mt-2">
                    <span>Due</span>
                    <span>{formatINR(Math.max(0, Number(order.totalPrice) - Number(order.rentedAmount)).toFixed(2))}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Billing;


