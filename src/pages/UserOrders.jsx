//  // src/pages/UserOrders.jsx
// import React, { useEffect, useState } from 'react'
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';

// const UserOrders = () => {
//     const [orders, setOrders] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [updatingStatus, setUpdatingStatus] = useState({})

//     // Order status options
//     const orderStatuses = [
//         { value: 'pending', label: 'Pending', color: 'text-yellow-600 bg-yellow-100' },
//         { value: 'processing', label: 'Processing', color: 'text-blue-600 bg-blue-100' },
//         { value: 'shipped', label: 'Shipped', color: 'text-purple-600 bg-purple-100' },
//         { value: 'ready_to_pick', label: 'Ready to Pick', color: 'text-green-600 bg-green-100' },
//         { value: 'delivered', label: 'Delivered', color: 'text-green-700 bg-green-200' },
//         { value: 'cancelled', label: 'Cancelled', color: 'text-red-600 bg-red-100' }
//     ]

//     useEffect(() => {
//         const loadOrders = async () => {
//             try {
//                 const res = await Axios({ ...SummaryApi.getUserOrders })
                
//                 console.log("Fetched orders:", res.data || "no orders found")
//                 const orders = Array.isArray(res.data?.data) ? res.data.data : []
//                 setOrders(orders)
//             } catch (err) {
//                 console.error("Failed to fetch orders", err)
//             } finally {
//                 setLoading(false)
//             }
//         }
//         loadOrders()
//     }, [])

//     // Function to update order status
//     const updateOrderStatus = async (orderId, newStatus) => {
//         setUpdatingStatus(prev => ({ ...prev, [orderId]: true }))
        
//         try {
//             // Make API call to update order status
//             const res = await Axios({
//                 ...SummaryApi.updateOrderStatus,  
//                 data: {
//                     orderId: orderId,
//                     status: newStatus
//                 }
//             })

//             if (res.data.success) {
//                 // Update local state
//                 setOrders(prevOrders => 
//                     prevOrders.map(order => 
//                         order._id === orderId 
//                             ? { ...order, status: newStatus }
//                             : order
//                     )
//                 )
//                 console.log("Order status updated successfully")
//             } else {
//                 console.error("Failed to update order status:", res.data.message)
//             }
//         } catch (err) {
//             console.error("Error updating order status:", err)
//         } finally {
//             setUpdatingStatus(prev => ({ ...prev, [orderId]: false }))
//         }
//     }

//     // Get status display info
//     const getStatusInfo = (status) => {
//         return orderStatuses.find(s => s.value === status) || orderStatuses[0]
//     }

//     if (loading) return <p className="text-center p-6">Loading orders...</p>

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-4">My Orders</h2>
//             {orders.length === 0 ? (
//                 <p className="text-gray-600">No orders found.</p>
//             ) : (
//                 <div className="space-y-4">
//                     {orders.map((order, idx) => {
//                         const currentStatus = order.status || 'pending'
//                         const statusInfo = getStatusInfo(currentStatus)
                        
//                         return (
//                             <div key={order._id || idx} className="border p-4 rounded-lg shadow-sm bg-white">
//                                 <div className="flex justify-between items-start mb-3">
//                                     <h3 className="font-semibold text-lg">
//                                         {order.product_details?.name || 'Unnamed Product'}
//                                     </h3>
//                                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
//                                         {statusInfo.label}
//                                     </span>
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                     <div>
//                                         <p><strong>Quantity:</strong> {order.quantity || 1}</p>
//                                         <p><strong>Total Price:</strong> Rs. {order.totalAmt || "N/A"}</p>
//                                         <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                                        
//                                             <p><strong>Customer:</strong> {order.name ||"null"}</p>
//                                             <p><strong>Contact no:</strong> {order.name ||"null"}</p>
                                        
//                                     </div>
                                    
//                                     <div>
//                                         <label htmlFor={`status-${order._id || idx}`} className="block text-sm font-medium text-gray-700 mb-2">
//                                             Update Status:
//                                         </label>
//                                         <select
//                                             id={`status-${order._id || idx}`}
//                                             value={currentStatus}
//                                             onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//                                             disabled={updatingStatus[order._id]}
//                                             className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
//                                         >
//                                             {orderStatuses.map(status => (
//                                                 <option key={status.value} value={status.value}>
//                                                     {status.label}
//                                                 </option>
//                                             ))}
//                                         </select>
                                        
//                                         {updatingStatus[order._id] && (
//                                             <p className="text-sm text-blue-600 mt-1">Updating...</p>
//                                         )}
//                                     </div>
//                                 </div>

//                                 {/* Order Timeline/Progress */}
//                                 <div className="mt-4 pt-4 border-t border-gray-200">
//                                     <h4 className="text-sm font-medium text-gray-700 mb-2">Order Progress:</h4>
//                                     <div className="flex flex-wrap gap-2">
//                                         {orderStatuses.slice(0, 5).map((status, index) => {
//                                             const isCompleted = orderStatuses.findIndex(s => s.value === currentStatus) >= index
//                                             const isCurrent = status.value === currentStatus
                                            
//                                             return (
//                                                 <div key={status.value} className="flex items-center">
//                                                     <div className={`w-3 h-3 rounded-full ${
//                                                         isCurrent ? 'bg-blue-500' : 
//                                                         isCompleted ? 'bg-green-500' : 'bg-gray-300'
//                                                     }`}></div>
//                                                     <span className={`ml-2 text-xs ${
//                                                         isCurrent ? 'text-blue-600 font-medium' :
//                                                         isCompleted ? 'text-green-600' : 'text-gray-500'
//                                                     }`}>
//                                                         {status.label}
//                                                     </span>
//                                                     {index < 4 && (
//                                                         <div className={`w-8 h-0.5 ml-2 ${
//                                                             orderStatuses.findIndex(s => s.value === currentStatus) > index ? 'bg-green-500' : 'bg-gray-300'
//                                                         }`}></div>
//                                                     )}
//                                                 </div>
//                                             )
//                                         })}
//                                     </div>
//                                 </div>

//                                 {/* Additional Order Details */}
//                                 {order.notes && (
//                                     <div className="mt-3 p-3 bg-gray-50 rounded">
//                                         <p className="text-sm"><strong>Notes:</strong> {order.notes}</p>
//                                     </div>
//                                 )}
//                             </div>
//                         )
//                     })}
//                 </div>
//             )}
//         </div>
//     )
// }

// export default UserOrders


// src/pages/FarmerOrders.jsx (Updated UserOrders.jsx for Farmers)
import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useSelector } from 'react-redux';
import { FaBox, FaTruck, FaCheckCircle, FaClock, FaTimesCircle, FaUser, FaPhone } from 'react-icons/fa';
import { FaMailchimp } from 'react-icons/fa6';

const FarmerOrders = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [updatingStatus, setUpdatingStatus] = useState({})
    const [filter, setFilter] = useState('all')
    const user = useSelector(state => state.user)

    // Order status options with icons
    const orderStatuses = [
        { 
            value: 'pending', 
            label: 'Pending', 
            color: 'text-yellow-600 bg-yellow-100',
            icon: <FaClock className="w-4 h-4" />,
            description: 'New order received'
        },
        { 
            value: 'processing', 
            label: 'Processing', 
            color: 'text-blue-600 bg-blue-100',
            icon: <FaBox className="w-4 h-4" />,
            description: 'Preparing the order'
        },
     
        { 
            value: 'ready_to_pick', 
            label: 'Ready to Pick', 
            color: 'text-green-600 bg-green-100',
            icon: <FaCheckCircle className="w-4 h-4" />,
            description: 'Ready for customer pickup'
        },
        { 
            value: 'Picked Up', 
            label: 'Picked Up', 
            color: 'text-red-700 bg-red-200',
            icon: <FaCheckCircle className="w-4 h-4" />,
            description: 'Order completed'
        },
        { 
            value: 'cancelled', 
            label: 'Cancelled', 
            color: 'text-orange-600 bg-orange-100',
            icon: <FaTimesCircle className="w-4 h-4" />,
            description: 'Order cancelled'
        }
    ]

    const filterOptions = [
        { value: 'all', label: 'All Orders' },
        { value: 'pending', label: 'New Orders' },
        { value: 'processing', label: 'Processing' },
     
        { value: 'ready_to_pick', label: 'Ready to Pick' },
        { value: 'Picked Up', label: 'Picked Up' },
        { value: 'cancelled', label: 'Cancelled' }
    ]

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const res = await Axios({ ...SummaryApi.getUserOrders })
                
                console.log("Fetched farmer orders:", res.data || "no orders found")
                const orders = Array.isArray(res.data?.data) ? res.data.data : []
                
                // Sort orders by creation date (newest first)
                const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                setOrders(sortedOrders)
            } catch (err) {
                console.error("Failed to fetch orders", err)
            } finally {
                setLoading(false)
            }
        }
        loadOrders()
    }, [])

    // Function to update order status
    const updateOrderStatus = async (orderId, newStatus) => {
        setUpdatingStatus(prev => ({ ...prev, [orderId]: true }))
        
        try {
            // Make API call to update order status
            const res = await Axios({
                ...SummaryApi.updateOrderStatus,  
                data: {
                    orderId: orderId,
                    status: newStatus
                }
            })

            if (res.data.success) {
                // Update local state
                setOrders(prevOrders => 
                    prevOrders.map(order => 
                        order._id === orderId 
                            ? { ...order, status: newStatus }
                            : order
                    )
                )
                console.log("Order status updated successfully")
            } else {
                console.error("Failed to update order status:", res.data.message)
            }
        } catch (err) {
            console.error("Error updating order status:", err)
        } finally {
            setUpdatingStatus(prev => ({ ...prev, [orderId]: false }))
        }
    }

    // Get status display info
    const getStatusInfo = (status) => {
        return orderStatuses.find(s => s.value === status) || orderStatuses[0]
    }

    // Filter orders based on selected filter
    const filteredOrders = filter === 'all' 
        ? orders 
        : orders.filter(order => order.status === filter)

    // Get order priority (pending and processing orders are high priority)
    const getOrderPriority = (status) => {
        return ['pending', 'processing'].includes(status) ? 'high' : 'normal'
    }

    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 max-w-7xl">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Management</h1>
                <p className="text-gray-600">Manage and track your product orders</p>
            </div>

            {/* Filter Section */}
            <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                    {filterOptions.map(option => (
                        <button
                            key={option.value}
                            onClick={() => setFilter(option.value)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                filter === option.value
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {option.label}
                            {option.value !== 'all' && (
                                <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                                    {orders.filter(order => order.status === option.value).length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Orders Summary */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                    <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-500">New Orders</h3>
                    <p className="text-2xl font-bold text-yellow-600">
                        {orders.filter(order => order.status === 'pending').length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-500">Processing</h3>
                    <p className="text-2xl font-bold text-blue-600">
                        {orders.filter(order => order.status === 'processing').length}
                    </p>
                </div>
              
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                    <h3 className="text-sm font-medium text-gray-500">Completed</h3>
                    <p className="text-2xl font-bold text-green-600">
                        {orders.filter(order => order.status === 'Picked Up').length}
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
                        {filter === 'all' 
                            ? "You haven't received any orders yet." 
                            : `No orders with status "${filter}".`}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredOrders.map((order, idx) => {
                        const currentStatus = order.status || 'pending'
                        const statusInfo = getStatusInfo(currentStatus)
                        const priority = getOrderPriority(currentStatus)
                        
                        return (
                            <div key={order._id || idx} className={`bg-white border rounded-lg shadow-sm overflow-hidden ${
                                priority === 'high' ? 'border-l-4 border-l-orange-400' : ''
                            }`}>
                                {/* Order Header */}
                                <div className="bg-gray-50 px-6 py-4 border-b">
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex items-center gap-4">
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-800">
                                                    {order.product_details?.name || 'Unnamed Product'}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    Order #{order._id?.slice(-8) || `ORD-${idx + 1}`} • 
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            {priority === 'high' && (
                                                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                                                    Action Required
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-3 lg:mt-0">
                                            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                                                {statusInfo.icon}
                                                {statusInfo.label}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Order Content */}
                                <div className="p-6">
                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                                        {/* Order Details */}
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-3">Order Details</h4>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-500">Quantity:</span>
                                                    <span className="font-medium">{order.quantity || 1} units</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-500">Total Amount:</span>
                                                    <span className="font-medium text-lg">
                                                        {DisplayPriceInRupees(order.totalAmt) || "N/A"}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-gray-500">Order Date:</span>
                                                    <span className="font-medium">
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Customer Details */}
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-3">Customer Information</h4>
                                             
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        <FaUser className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm text-gray-500">Name:</span>
                                                            {order.userName}
                                                       
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                    <FaUser className="w-4 h-4 text-gray-400" />
                                                        <span className="text-sm text-gray-500">Email:</span>
                                                        {order.Email}
                                                    </div>
                                                    {
                                                        <div className="flex items-center gap-2">
                                                            <FaPhone className="w-4 h-4 text-gray-400" />
                                                            <span className="text-sm text-gray-500">Contact no:</span>
                                                      {order.mobile}
                                                        </div>
                                                    }
                                                </div>
                                            
                                        </div>
                                        <img
                      src={order.product_details.image[0]} 
                      className='w-20 h-20'
                    /> 
                                        {/* Status Management */}
                                        <div>
                                            <h4 className="font-medium text-gray-700 mb-3">Update Status</h4>
                                            <div className="space-y-3">
                                                <select
                                                    value={currentStatus}
                                                    onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                    disabled={updatingStatus[order._id]}
                                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                                >
                                                    {orderStatuses.map(status => (
                                                        <option key={status.value} value={status.value}>
                                                            {status.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                
                                                {updatingStatus[order._id] && (
                                                    <div className="flex items-center gap-2 text-blue-600">
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                                                        <span className="text-sm">Updating status...</span>
                                                    </div>
                                                )}
                                                
                                                <p className="text-xs text-gray-500">
                                                    {statusInfo.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Timeline/Progress */}
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <h4 className="font-medium text-gray-700 mb-4">Order Progress</h4>
                                        <div className="flex flex-wrap gap-4">
                                            {orderStatuses.slice(0, 5).map((status, index) => {
                                                const isCompleted = orderStatuses.findIndex(s => s.value === currentStatus) >= index
                                                const isCurrent = status.value === currentStatus
                                                const isPast = orderStatuses.findIndex(s => s.value === currentStatus) > index
                                                
                                                return (
                                                    <div key={status.value} className="flex items-center gap-2">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                            isCurrent ? 'bg-blue-500 text-white' : 
                                                            isPast ? 'bg-green-500 text-white' : 'bg-gray-200'
                                                        }`}>
                                                            {isPast ? <FaCheckCircle className="w-4 h-4" /> : status.icon}
                                                        </div>
                                                        <div>
                                                            <p className={`text-sm font-medium ${
                                                                isCurrent ? 'text-blue-600' :
                                                                isPast ? 'text-green-600' : 'text-gray-500'
                                                            }`}>
                                                                {status.label}
                                                            </p>
                                                        </div>
                                                        {index < 4 && (
                                                            <div className={`w-8 h-0.5 ml-2 ${
                                                                orderStatuses.findIndex(s => s.value === currentStatus) > index ? 'bg-green-500' : 'bg-gray-300'
                                                            }`}></div>
                                                        )}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Additional Order Details */}
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
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default FarmerOrders