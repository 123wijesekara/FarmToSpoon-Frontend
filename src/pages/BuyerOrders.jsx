 // src/pages/BuyerOrders.jsx
import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from 'react-icons/fa'

const BuyerOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [showRatingPrompt, setShowRatingPrompt] = useState(false)
  const navigate = useNavigate()

  const user = useSelector((state) => state.user)
 

  const orderStatuses = [
    {
      value: 'pending',
      label: 'Pending',
      color: 'text-yellow-600 bg-yellow-100',
      icon: <FaClock className="w-4 h-4" />,
      description: 'Order placed, waiting for confirmation',
    },
    {
      value: 'processing',
      label: 'Processing',
      color: 'text-blue-600 bg-blue-100',
      icon: <FaBox className="w-4 h-4" />,
      description: 'Order is being prepared',
    },
    {
      value: 'ready_to_pick',
      label: 'Ready to Pick',
      color: 'text-green-600 bg-green-100',
      icon: <FaCheckCircle className="w-4 h-4" />,
      description: 'Order is ready for pickup',
    },
    {
      value: 'Picked Up',
      label: 'Picked Up',
      color: 'text-purple-600 bg-purple-100',
      icon: <FaCheckCircle className="w-4 h-4" />,
      description: 'Order has been picked up by the buyer',
    },
    {
      value: 'cancelled',
      label: 'Cancelled',
      color: 'text-red-600 bg-red-100',
      icon: <FaTimesCircle className="w-4 h-4" />,
      description: 'Order has been cancelled',
    },
  ];
  
  const filterOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'ready_to_pick', label: 'Ready to Pick' },
    { value: 'Picked Up', label: 'Picked Up' },
    { value: 'cancelled', label: 'Cancelled' },
  ];
  
 
  
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await Axios({ ...SummaryApi.getBuyerOrders })
        const orders = Array.isArray(res.data?.data) ? res.data.data : []
        const sortedOrders = orders.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        setOrders(sortedOrders)
      } catch (err) {
        console.error('Failed to fetch orders', err)
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [])

  const getStatusInfo = (status) => {
    return orderStatuses.find((s) => s.value === status) || orderStatuses[0]
  }

  const filteredOrders =
    filter === 'all' ? orders : orders.filter((o) => o.status === filter)

  const getProgressPercentage = (status) => {
    const statusIndex = orderStatuses.findIndex((s) => s.value === status)
    if (status === 'cancelled') return 0
    return ((statusIndex + 1) / (orderStatuses.length - 1)) * 100
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
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      {/* Filter buttons */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
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
                  {orders.filter((order) => order.status === option.value)
                    .length || 0}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Orders */}
      <div className="space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <FaBox className="text-gray-400 mx-auto text-5xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No orders found
            </h3>
            <p className="text-gray-500">
              {filter === 'all'
                ? "You haven't placed any orders yet."
                : `No orders with status "${filter}".`}
            </p>
          </div>
        ) : (
          filteredOrders.map((order, idx) => {
            const currentStatus = order.status || 'pending'
            const statusInfo = getStatusInfo(currentStatus)
            const progressPercentage = getProgressPercentage(currentStatus)

            return (
              <div
                key={order._id || idx}
                className="bg-white border rounded-lg shadow-sm overflow-hidden"
              >
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">
                        Order #{order.orderId?.slice(-8) || `ORD-${idx + 1}`}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Placed on{' '}
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="mt-3 lg:mt-0">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}
                      >
                        {statusInfo.icon}
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    <div className="lg:col-span-2">
                      <h4 className="font-semibold text-xl text-gray-800 mb-3">
                        {order.product_details?.name || 'Product Name'}
                      </h4>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Quantity</p>
                          <p className="font-medium">{order.quantity} units</p>
                          <img
                            src={order.product_details?.image?.[0]}
                            className="w-20 h-20 mt-2"
                            alt="product"
                          />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="font-medium text-lg">
                            {DisplayPriceInRupees(order.totalAmt) || 'N/A'}
                          </p>
                        </div>
                      </div>

                      {currentStatus === 'Picked Up' && (
                        <div className="mt-4 flex gap-4 items-center">
                          <p className="text-green-700 font-medium">
                            Would you like to rate this product?
                          </p>
                          <button
                            onClick={() => {
                              localStorage.setItem('selectedOrderId', order.orderId)
                              setShowRatingPrompt(true)
                            }}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                          >
                            Rate This Product
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-3">
                        Order Status
                      </h4>
                      <div className="space-y-3">
                        {orderStatuses.slice(0, 5).map((status, index) => {
                          const isCompleted =
                            orderStatuses.findIndex((s) => s.value === currentStatus) >= index
                          const isCurrent = status.value === currentStatus
                          const isPast =
                            orderStatuses.findIndex((s) => s.value === currentStatus) > index

                          return (
                            <div key={status.value} className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  isCurrent
                                    ? 'bg-blue-500 text-white'
                                    : isPast
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200'
                                }`}
                              >
                                {isPast ? <FaCheckCircle className="w-4 h-4" /> : status.icon}
                              </div>
                              <div className="flex-1">
                                <p
                                  className={`text-sm font-medium ${
                                    isCurrent
                                      ? 'text-blue-600'
                                      : isPast
                                      ? 'text-green-600'
                                      : 'text-gray-500'
                                  }`}
                                >
                                  {status.label}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {status.description}
                                </p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>

                  {currentStatus !== 'cancelled' && (
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-500">
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Rating Modal */}
      {showRatingPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Rate This Product
            </h2>
            <p className="text-gray-600 mb-6">
              Would you like to rate your recent delivery?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  navigate('/ratings') // ← Uses localStorage to get orderId on the next page
                  setShowRatingPrompt(false)
                }}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowRatingPrompt(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BuyerOrders
