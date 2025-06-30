// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { io } from 'socket.io-client';
// import SummaryApi from '../common/SummaryApi';
// import { toast } from 'react-toastify';

// const WebSocketContext = createContext(null);

// export const WebSocketProvider = ({ children }) => {
//   const [socket, setSocket] = useState(null);
//   const user = useSelector(state => state.user);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     if (user?._id) {
//       const newSocket = io(SummaryApi.socketUrl, {
//         withCredentials: true,
//         reconnectionAttempts: 5,
//         reconnectionDelay: 5000,
//       });

//       setSocket(newSocket);

//       // Join user's room
//       newSocket.emit('joinUserRoom', user._id);

//       // Listen for order updates
//       newSocket.on('orderUpdate', (data) => {
//         toast.info(data.message, {
//           position: 'top-right',
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//         });
        
//         setNotifications(prev => [
//           {
//             id: Date.now(),
//             message: data.message,
//             orderId: data.orderId,
//             status: data.status,
//             read: false,
//             timestamp: new Date(),
//           },
//           ...prev
//         ]);
//       });

//       return () => {
//         newSocket.disconnect();
//       };
//     }
//   }, [user?._id]);

//   const markAsRead = (id) => {
//     setNotifications(prev => 
//       prev.map(notification => 
//         notification.id === id ? { ...notification, read: true } : notification
//       )
//     );
//   };

//   const clearNotifications = () => {
//     setNotifications([]);
//   };

//   return (
//     <WebSocketContext.Provider value={{ socket, notifications, markAsRead, clearNotifications }}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };

// export const useWebSocket = () => useContext(WebSocketContext);