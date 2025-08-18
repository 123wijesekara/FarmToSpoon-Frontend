import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrders = () => {
  const orders = useSelector(state => state.orders.order)

  console.log("order Items",orders)
  return (
    <div>
      <div className='bg-white shadow-md p-3 font-semibold'>
        <h1>Order</h1>
      </div>
        {
          !orders[0] && (
            <NoData/>
          )
        }
        {
          orders.map((order,index)=>{
            return(
              <div key={order._id+index+"order"} className='order rounded p-4 text-sm'>
                  <p>Order No : {order?.orderId}</p>
                  <div className='flex gap-3'>
                    <img
                      src={order.product_details.image[0]} 
                      className='w-14 h-14'
                    />  
                    <p className='font-medium'>{order.product_details.name}</p>
                  </div>
              </div>
            )
          })
        }
    </div>
  )
}

export default MyOrders


// import React, { useEffect, useState } from 'react'
// import NoData from '../components/NoData'
// import Axios from '../utils/Axios'
// import SummaryApi from '../common/SummaryApi'

// const MyOrders = () => {
//   const [orders, setOrders] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [userId, setUserId] = useState(null)

//   useEffect(() => {
//     const userId = localStorage.getItem("userId")  
//     setUserId(userId)
//   }, [])

//   useEffect(() => {
//     const fetchUserOrders = async () => {
//       if (!userId) return // Don't fetch if no user ID

//       try {
//         setLoading(true)
//         const response = await Axios.post(SummaryApi.getUserOrders.url, { userId })
        
//         if (response.data.success) {
//           setOrders(response.data.orders)
//         } else {
//           setOrders([])
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error)
//         setOrders([])
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchUserOrders()
//   }, [userId])

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         <span className="ml-3 text-gray-600">Loading your orders...</span>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <div className='bg-white shadow-md p-4 rounded-lg mb-4'>
//         <h1 className='text-xl font-semibold'>My Orders</h1>
//       </div>
      
//       {!orders.length ? (
//         <NoData text="You haven't placed any orders yet"/>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order, index) => (
//             <div 
//               key={order._id + index + "order"} 
//               className='bg-white rounded-lg shadow-sm p-4 border border-gray-200'
//             >
//               <div className="flex justify-between items-start mb-3">
//                 <p className="font-medium">Order #: {order?.orderId}</p>
//                 <span className={`px-2 py-1 rounded text-xs ${
//                   order.status === 'completed' 
//                     ? 'bg-green-100 text-green-800' 
//                     : order.status === 'cancelled' 
//                       ? 'bg-red-100 text-red-800' 
//                       : 'bg-yellow-100 text-yellow-800'
//                 }`}>
//                   {order.status}
//                 </span>
//               </div>
              
//               <div className='flex gap-4 items-center'>
//                 <img
//                   src={order.product_details?.image[0] || '/default-product.png'} 
//                   className='w-16 h-16 object-cover rounded border border-gray-200'
//                   alt={order.product_details?.name}
//                 />  
//                 <div className="flex-1">
//                   <p className='font-medium'>{order.product_details?.name}</p>
//                   <p className="text-gray-600">Quantity: {order.quantity}</p>
//                   <p className="text-gray-600">Price: ${order.price?.toFixed(2)}</p>
//                 </div>
//               </div>
              
//               <div className="mt-3 pt-3 border-t border-gray-100">
//                 <p className="text-sm text-gray-600">
//                   Ordered on: {new Date(order.createdAt).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default MyOrders