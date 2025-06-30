// // src/pages/BuyerOrders.jsx
// import React, { useEffect, useState } from 'react'
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// import { useSelector } from 'react-redux';
// import { FaBox, FaTruck, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

// const BuyerOrders = () => {
//     const [orders, setOrders] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [filter, setFilter] = useState('all')
//     const user = useSelector(state => state.user)

//     // Order status options with icons
//     const orderStatuses = [
//         { 
//             value: 'pending', 
//             label: 'Pending', 
//             color: 'text-yellow-600 bg-yellow-100',
//             icon: <FaClock className="w-4 h-4" />,
//             description: 'Order placed, waiting for confirmation'
//         },
//         { 
//             value: 'processing', 
//             label: 'Processing', 
//             color: 'text-blue-600 bg-blue-100',
//             icon: <FaBox className="w-4 h-4" />,
//             description: 'Order is being prepared'
//         },
//         { 
//             value: 'shipped', 
//             label: 'Shipped', 
//             color: 'text-purple-600 bg-purple-100',
//             icon: <FaTruck className="w-4 h-4" />,
//             description: 'Order is on the way'
//         },
//         { 
//             value: 'ready_to_pick', 
//             label: 'Ready to Pick', 
//             color: 'text-green-600 bg-green-100',
//             icon: <FaCheckCircle className="w-4 h-4" />,
//             description: 'Order is ready for pickup'
//         },
//         { 
//             value: 'delivered', 
//             label: 'Delivered', 
//             color: 'text-green-700 bg-green-200',
//             icon: <FaCheckCircle className="w-4 h-4" />,
//             description: 'Order has been delivered'
//         },
//         { 
//             value: 'cancelled', 
//             label: 'Cancelled', 
//             color: 'text-red-600 bg-red-100',
//             icon: <FaTimesCircle className="w-4 h-4" />,
//             description: 'Order has been cancelled'
//         }
//     ]

//     const filterOptions = [
//         { value: 'all', label: 'All Orders' },
//         { value: 'pending', label: 'Pending' },
//         { value: 'processing', label: 'Processing' },
//         { value: 'shipped', label: 'Shipped' },
//         { value: 'ready_to_pick', label: 'Ready to Pick' },
//         { value: 'delivered', label: 'Delivered' },
//         { value: 'cancelled', label: 'Cancelled' }
//     ]

//     useEffect(() => {
//         const loadOrders = async () => {
//             try {
//                 const res = await Axios({ ...SummaryApi.getBuyerOrders })
                
//                 console.log("Fetched buyer orders:", res.data || "no orders found")
//                 const orders = Array.isArray(res.data?.data) ? res.data.data : []
                
//                 // Sort orders by creation date (newest first)
//                 const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//                 setOrders(sortedOrders)
//             } catch (err) {
//                 console.error("Failed to fetch orders", err)
//             } finally {
//                 setLoading(false)
//             }
//         }
//         loadOrders()
//     }, [])

//     // Get status display info
//     const getStatusInfo = (status) => {
//         return orderStatuses.find(s => s.value === status) || orderStatuses[0]
//     }

//     // Filter orders based on selected filter
//     const filteredOrders = filter === 'all' 
//         ? orders 
//         : orders.filter(order => order.status === filter)

//     // Get order progress percentage
//     const getProgressPercentage = (status) => {
//         const statusIndex = orderStatuses.findIndex(s => s.value === status)
//         if (status === 'cancelled') return 0
//         return ((statusIndex + 1) / (orderStatuses.length - 1)) * 100
//     }

//     if (loading) {
//         return (
//             <div className="container mx-auto p-4">
//                 <div className="flex justify-center items-center h-64">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="container mx-auto p-4 max-w-6xl">
//             <div className="mb-6">
//                 <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
//                 <p className="text-gray-600">Track and manage your orders</p>
//             </div>

//             {/* Filter Section */}
//             <div className="mb-6">
//                 <div className="flex flex-wrap gap-2">
//                     {filterOptions.map(option => (
//                         <button
//                             key={option.value}
//                             onClick={() => setFilter(option.value)}
//                             className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
//                                 filter === option.value
//                                     ? 'bg-green-600 text-white'
//                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                             }`}
//                         >
//                             {option.label}
//                             {option.value !== 'all' && (
//                                 <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
//                                     {orders.filter(order => order.status === option.value).length}
//                                 </span>
//                             )}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Orders Summary */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//                 <div className="bg-white p-4 rounded-lg shadow-sm border">
//                     <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
//                     <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow-sm border">
//                     <h3 className="text-sm font-medium text-gray-500">Pending</h3>
//                     <p className="text-2xl font-bold text-yellow-600">
//                         {orders.filter(order => ['pending', 'processing'].includes(order.status)).length}
//                     </p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow-sm border">
//                     <h3 className="text-sm font-medium text-gray-500">In Transit</h3>
//                     <p className="text-2xl font-bold text-blue-600">
//                         {orders.filter(order => ['shipped', 'ready_to_pick'].includes(order.status)).length}
//                     </p>
//                 </div>
//                 <div className="bg-white p-4 rounded-lg shadow-sm border">
//                     <h3 className="text-sm font-medium text-gray-500">Delivered</h3>
//                     <p className="text-2xl font-bold text-green-600">
//                         {orders.filter(order => order.status === 'delivered').length}
//                     </p>
//                 </div>
//             </div>

//             {/* Orders List */}
//             {filteredOrders.length === 0 ? (
//                 <div className="text-center py-12">
//                     <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
//                         <FaBox className="w-12 h-12 text-gray-400" />
//                     </div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
//                     <p className="text-gray-500">
//                         {filter === 'all' 
//                             ? "You haven't placed any orders yet." 
//                             : `No orders with status "${filter}".`}
//                     </p>
//                 </div>
//             ) : (
//                 <div className="space-y-6">
//                     {filteredOrders.map((order, idx) => {
//                         const currentStatus = order.status || 'pending'
//                         const statusInfo = getStatusInfo(currentStatus)
//                         const progressPercentage = getProgressPercentage(currentStatus)
                        
//                         return (
//                             <div key={order._id || idx} className="bg-white border rounded-lg shadow-sm overflow-hidden">
//                                 {/* Order Header */}
//                                 <div className="bg-gray-50 px-6 py-4 border-b">
//                                     <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//                                         <div className="flex items-center gap-4">
//                                             <div>
//                                                 <h3 className="font-semibold text-lg text-gray-800">
//                                                     Order #{order.orderId?.slice(-8) || `ORD-${idx + 1}`}
//                                                 </h3>
//                                                 <p className="text-sm text-gray-500">
//                                                     Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
//                                                         year: 'numeric',
//                                                         month: 'long',
//                                                         day: 'numeric'
//                                                     })}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <div className="mt-3 lg:mt-0">
//                                             <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
//                                                 {statusInfo.icon}
//                                                 {statusInfo.label}
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Order Content */}
//                                 <div className="p-6">
//                                     {/* Product Details */}
//                                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
//                                         <div className="lg:col-span-2">
//                                             <h4 className="font-semibold text-xl text-gray-800 mb-3">
//                                                 {order.product_details?.name || 'Product Name'}
//                                             </h4>
                                            
//                                             <div className="grid grid-cols-2 gap-4">
//                                                 <div>
//                                                     <p className="text-sm text-gray-500">Quantity</p>
//                                                     <p className="font-medium">{order.quantity || 1} units</p>
//                                                     <img
//                       src={order.product_details.image[0]} 
//                       className='w-20 h-20'
//                     /> 
//                                                 </div>
//                                                 <div>
//                                                     <p className="text-sm text-gray-500">Total Amount</p>
//                                                     <p className="font-medium text-lg">
//                                                         {DisplayPriceInRupees(order.totalAmt) || "N/A"}
//                                                     </p>
//                                                 </div>
//                                             </div>

//                                             {/* Farmer/Seller Details */}
//                                             {order.farmer_details && (
//                                                 <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                                                     <p className="text-sm text-gray-500">Seller</p>
//                                                     <p className="font-medium">
//                                                         {order.farmer_details.name || order.farmer_details.email}
//                                                     </p>
//                                                     {order.farmer_details.mobile && (
//                                                         <p className="text-sm text-gray-600">
//                                                             Contact: {order.farmer_details.mobile}
//                                                         </p>
//                                                     )}
//                                                 </div>
//                                             )}
//                                         </div>

//                                         {/* Order Status Progress */}
//                                         <div>
//                                             <h4 className="font-medium text-gray-700 mb-3">Order Status</h4>
//                                             <div className="space-y-3">
//                                                 {orderStatuses.slice(0, 5).map((status, index) => {
//                                                     const isCompleted = orderStatuses.findIndex(s => s.value === currentStatus) >= index
//                                                     const isCurrent = status.value === currentStatus
//                                                     const isPast = orderStatuses.findIndex(s => s.value === currentStatus) > index
                                                    
//                                                     return (
//                                                         <div key={status.value} className="flex items-center gap-3">
//                                                             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                                                                 isCurrent ? 'bg-blue-500 text-white' : 
//                                                                 isPast ? 'bg-green-500 text-white' : 'bg-gray-200'
//                                                             }`}>
//                                                                 {isPast ? <FaCheckCircle className="w-4 h-4" /> : status.icon}
//                                                             </div>
//                                                             <div className="flex-1">
//                                                                 <p className={`text-sm font-medium ${
//                                                                     isCurrent ? 'text-blue-600' :
//                                                                     isPast ? 'text-green-600' : 'text-gray-500'
//                                                                 }`}>
//                                                                     {status.label}
//                                                                 </p>
//                                                                 <p className="text-xs text-gray-500">
//                                                                     {status.description}
//                                                                 </p>
//                                                             </div>
//                                                         </div>
//                                                     )
//                                                 })}
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Progress Bar */}
//                                     {currentStatus !== 'cancelled' && (
//                                         <div className="mb-4">
//                                             <div className="flex justify-between items-center mb-2">
//                                                 <span className="text-sm font-medium text-gray-700">Progress</span>
//                                                 <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
//                                             </div>
//                                             <div className="w-full bg-gray-200 rounded-full h-2">
//                                                 <div 
//                                                     className="bg-green-600 h-2 rounded-full transition-all duration-300"
//                                                     style={{ width: `${progressPercentage}%` }}
//                                                 ></div>
//                                             </div>
//                                         </div>
//                                     )}

//                                     {/* Additional Order Details */}
//                                     {order.notes && (
//                                         <div className="mt-4 p-3 bg-blue-50 rounded-lg">
//                                             <p className="text-sm font-medium text-blue-800 mb-1">Order Notes:</p>
//                                             <p className="text-sm text-blue-700">{order.notes}</p>
//                                         </div>
//                                     )}

//                                     {/* Delivery Address */}
//                                     {order.delivery_address && (
//                                         <div className="mt-4 p-3 bg-gray-50 rounded-lg">
//                                             <p className="text-sm font-medium text-gray-700 mb-1">Delivery Address:</p>
//                                             <p className="text-sm text-gray-600">{order.delivery_address}</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )
//                     })}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default BuyerOrders

import React, { useEffect, useState, useRef } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useSelector } from 'react-redux';
import { FaBox, FaTruck, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';
import WebSocketClient from '../utils/websocket';

const BuyerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const user = useSelector(state => state.user);
  const wsClientRef = useRef(null);

  // Order status definitions
  const orderStatuses = [
    { value: 'pending', label: 'Pending', color: 'text-yellow-600 bg-yellow-100', icon: <FaClock className="w-4 h-4" />, description: 'Order placed, waiting for confirmation' },
    { value: 'processing', label: 'Processing', color: 'text-blue-600 bg-blue-100', icon: <FaBox className="w-4 h-4" />, description: 'Order is being prepared' },
    { value: 'shipped', label: 'Shipped', color: 'text-purple-600 bg-purple-100', icon: <FaTruck className="w-4 h-4" />, description: 'Order is on the way' },
    { value: 'ready_to_pick', label: 'Ready to Pick', color: 'text-green-600 bg-green-100', icon: <FaCheckCircle className="w-4 h-4" />, description: 'Order is ready for pickup' },
    { value: 'delivered', label: 'Delivered', color: 'text-green-700 bg-green-200', icon: <FaCheckCircle className="w-4 h-4" />, description: 'Order has been delivered' },
    { value: 'cancelled', label: 'Cancelled', color: 'text-red-600 bg-red-100', icon: <FaTimesCircle className="w-4 h-4" />, description: 'Order has been cancelled' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Orders' },
    ...orderStatuses.map(s => ({ value: s.value, label: s.label })),
  ];

  useEffect(() => {
    async function loadOrders() {
      try {
        const res = await Axios({ ...SummaryApi.getBuyerOrders });
        const fetchedOrders = Array.isArray(res.data?.data) ? res.data.data : [];
        setOrders(fetchedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        console.error("Failed to fetch orders", err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  useEffect(() => {
    if (!user?._id) return;

    if (!wsClientRef.current) {
      wsClientRef.current = new WebSocketClient(user._id);
      wsClientRef.current.connect();
    }

    const handleMessage = (rawMessage) => {
      let message;
      try {
        message = typeof rawMessage === 'string' ? JSON.parse(rawMessage) : rawMessage;
      } catch (e) {
        console.warn('Invalid JSON message:', rawMessage);
        return;
      }

      if (message.type === 'ORDER_UPDATE') {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order._id === message.data.orderId
              ? { ...order, status: message.data.status }
              : order
          )
        );

        const notification = {
          id: Date.now(),
          message: message.data.message,
          type: 'info',
          timestamp: new Date()
        };

        setNotifications(prev => [notification, ...prev]);

        // Auto-remove notification after 6 seconds
        setTimeout(() => {
          setNotifications(prev => prev.filter(n => n.id !== notification.id));
        }, 6000);
      }
    };

    wsClientRef.current.addMessageHandler(handleMessage);

    return () => {
      if (wsClientRef.current) {
        wsClientRef.current.removeMessageHandler(handleMessage);
        wsClientRef.current.disconnect();
        wsClientRef.current = null;
      }
    };
  }, [user?._id]);

  const getStatusInfo = (status) => orderStatuses.find(s => s.value === status) || orderStatuses[0];

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(order => order.status === filter);

  const getProgressPercentage = (status) => {
    const idx = orderStatuses.findIndex(s => s.value === status);
    if (status === 'cancelled' || idx < 0) return 0;
    return ((idx + 1) / (orderStatuses.length - 1)) * 100;
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map(n => (
            <div
              key={n.id}
              className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-blue-500 max-w-xs cursor-pointer"
              onClick={() => setNotifications(prev => prev.filter(notif => notif.id !== n.id))}
            >
              <p className="font-medium">{n.message}</p>
              <p className="text-xs text-gray-500 mt-1">{new Date(n.timestamp).toLocaleTimeString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filterOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === opt.value ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {opt.label}
            {opt.value !== 'all' && (
              <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                {orders.filter(o => o.status === opt.value).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {orders.filter(o => ['pending', 'processing'].includes(o.status)).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">In Transit</h3>
          <p className="text-2xl font-bold text-blue-600">
            {orders.filter(o => ['shipped', 'ready_to_pick'].includes(o.status)).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Delivered</h3>
          <p className="text-2xl font-bold text-green-600">
            {orders.filter(o => o.status === 'delivered').length}
          </p>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FaBox className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">
            {filter === 'all' ? "You haven't placed any orders yet." : `No orders with status "${filter}".`}
          </p>
        </div>
      ) : (
        filteredOrders.map((order, idx) => {
          const currentStatus = order.status || 'pending';
          const statusInfo = getStatusInfo(currentStatus);
          const progressPercentage = getProgressPercentage(currentStatus);

          return (
            <div key={order._id || idx} className="bg-white border rounded-lg shadow-sm overflow-hidden mb-6">
              {/* Header */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        Order #{order.orderId?.slice(-8) || `ORD-${idx + 1}`}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 lg:mt-0">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                      {statusInfo.icon}
                      {statusInfo.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div className="lg:col-span-2">
                    <h4 className="font-semibold text-xl text-gray-800 mb-3">{order.product_details?.name || 'Product Name'}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Quantity</p>
                        <p className="font-medium">{order.quantity || 1} units</p>
                        {order.product_details?.image?.[0] && (
                          <img
                            src={order.product_details.image[0]}
                            alt={order.product_details?.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="font-medium text-lg">{DisplayPriceInRupees(order.totalAmt) || "N/A"}</p>
                      </div>
                    </div>
                    {order.farmer_details && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Seller</p>
                        <p className="font-medium">{order.farmer_details.name || order.farmer_details.email}</p>
                        {order.farmer_details.mobile && (
                          <p className="text-sm text-gray-600">Contact: {order.farmer_details.mobile}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Status Progress */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Order Status</h4>
                    <div className="space-y-3">
                      {orderStatuses.slice(0, 5).map((status, index) => {
                        const statusIdx = orderStatuses.findIndex(s => s.value === currentStatus);
                        const isPast = statusIdx > index;
                        const isCurrent = status.value === currentStatus;

                        return (
                          <div key={status.value} className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              isCurrent ? 'bg-blue-500 text-white' :
                              isPast ? 'bg-green-500 text-white' : 'bg-gray-200'
                            }`}>
                              {isPast ? <FaCheckCircle className="w-4 h-4" /> : status.icon}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${
                                isCurrent ? 'text-blue-600' :
                                isPast ? 'text-green-600' : 'text-gray-500'
                              }`}>{status.label}</p>
                              <p className="text-xs text-gray-500">{status.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {currentStatus !== 'cancelled' && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm text-gray-500">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Notes */}
                {order.notes && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-800 mb-1">Order Notes:</p>
                    <p className="text-sm text-blue-700">{order.notes}</p>
                  </div>
                )}

                {/* Delivery Address */}
                {order.delivery_address && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-1">Delivery Address:</p>
                    <p className="text-sm text-gray-600">{order.delivery_address}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default BuyerOrders;
