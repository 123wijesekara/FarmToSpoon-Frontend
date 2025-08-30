// // import React, { useEffect, useState } from 'react'
// // import logo from '../assets/logof.png'
// // import Search from './search'
// // import { Link, useLocation, useNavigate } from 'react-router-dom'
// // import { FaRegCircleUser } from "react-icons/fa6";
// // import useMobile from '../hooks/useMobile';
// // import { BsCart4 } from "react-icons/bs";
// // import { useSelector } from 'react-redux';
// // import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
// // import UserMenu from './UserMenu';
// // import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
// // import { useGlobalContext } from '../provider/GlobalProvider';
// // import DisplayCartItem from './DisplayCartItem';
// // import { FaBell } from "react-icons/fa";

// // const Header = () => {
// //     const [isMobile] = useMobile()
// //     const location = useLocation()
// //     const isSearchPage = location.pathname === "/search"
// //     const navigate = useNavigate()
// //     const user = useSelector((state) => state?.user)
// //     const [openUserMenu, setOpenUserMenu] = useState(false)
// //     const cartItem = useSelector(state => state.cartItem.cart)
// //     const { totalPrice, totalQty } = useGlobalContext()
// //     const [openCartSection, setOpenCartSection] = useState(false)

// //     // Notification logic
// //     const [notifications, setNotifications] = useState([
// //         { message: "Order #123 placed successfully" },
      
// //     ])
// //     const [showDropdown, setShowDropdown] = useState(false)

// //     const handleClick = () => {
// //         setShowDropdown(prev => !prev)
// //     }

// //     const goToOrders = () => {
// //         setShowDropdown(false)
// //         navigate("/user/orders")
// //     }

// //     const redirectToLoginPage = () => {
// //         navigate("/login")
// //     }

// //     const handleCloseUserMenu = () => {
// //         setOpenUserMenu(false)
// //     }

// //     const handleMobileUser = () => {
// //         if (!user._id) {
// //             navigate("/login")
// //             return
// //         }
// //         navigate("/user")
// //     }

// //     return (
// //         <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-green -700'>
// //             {
// //                 !(isSearchPage && isMobile) && (
// //                     <div className='container mx-auto flex items-center px-2 justify-between'>
// //                         {/* Logo */}
// //                         <div className='h-full'>
// //                             <Link to={"/"} className='h-full flex justify-center items-center'>
// //                                 <img
// //                                     src={logo}
// //                                     width={170}
// //                                     height={60}
// //                                     alt='logo'
// //                                     className='hidden lg:block'
// //                                 />
// //                                 <img
// //                                     src={logo}
// //                                     width={120}
// //                                     height={60}
// //                                     alt='logo'
// //                                     className='lg:hidden'
// //                                 />
// //                             </Link>
// //                         </div>

// //                         {/* Navbar Links */}
// //                         <nav className='hidden lg:flex items-center gap-10'>
// //                             <Link to="/home" className='text-lg text-neutral-600 hover:text-green-800'>Home</Link>
// //                             <Link to="/" className='text-lg text-neutral-600 hover:text-green-800'>Products</Link>
// //                             <Link to="/about" className='text-lg text-neutral-600 hover:text-green-800'>About</Link>
// //                             <Link to="/contact" className='text-lg text-neutral-600 hover:text-green-800'>Contact</Link>
// //                         </nav>

// //                         {/* Search */}
// //                         <div className='hidden lg:block'>
// //                             <Search />
// //                         </div>

// //                         {/* Notification Bell */}
// //                         <div className="relative mr-4">
// //                             <FaBell onClick={handleClick} size={24} style={{ cursor: "pointer" }} />
// //                             {notifications.length > 0 && (
// //                                 <span className="absolute top-[-6px] right-[-6px] bg-red-600 text-white rounded-full text-xs px-1">
// //                                     {notifications.length}
// //                                 </span>
// //                             )}
// //                             {showDropdown && (
// //                                 <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50">
// //                                     {notifications.map((n, idx) => (
// //                                         <div
// //                                             key={idx}
// //                                             onClick={goToOrders}
// //                                             className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
// //                                         >
// //                                             {n.message}
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             )}
// //                         </div>

// //                         {/* User and Cart Section */}
// //                         <div className=''>
// //                             {/* User Icon on Mobile */}
// //                             <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
// //                                 <FaRegCircleUser size={26} />
// //                             </button>

// //                             {/* Desktop User and Cart Section */}
// //                             <div className='hidden lg:flex items-center gap-10'>
// //                                 {
// //                                     user?._id ? (
// //                                         <div className='relative'>
// //                                             <div onClick={() => setOpenUserMenu(prev => !prev)} className='flex select-none items-center gap-1 cursor-pointer'>
// //                                                 <p>Account</p>
// //                                                 {
// //                                                     openUserMenu ? (
// //                                                         <GoTriangleUp size={25} />
// //                                                     ) : (
// //                                                         <GoTriangleDown size={25} />
// //                                                     )
// //                                                 }
// //                                             </div>
// //                                             {
// //                                                 openUserMenu && (
// //                                                     <div className='absolute right-0 top-12'>
// //                                                         <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
// //                                                             <UserMenu close={handleCloseUserMenu} />
// //                                                         </div>
// //                                                     </div>
// //                                                 )
// //                                             }
// //                                         </div>
// //                                     ) : (
// //                                         <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
// //                                     )
// //                                 }

// //                                 <button onClick={() => setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
// //                                     <div className='animate-bounce'>
// //                                         <BsCart4 size={26} />
// //                                     </div>
// //                                     <div className='font-semibold text-sm'>
// //                                         {
// //                                             cartItem[0] ? (
// //                                                 <div>
// //                                                     <p>{totalQty} Items</p>
// //                                                     <p>{DisplayPriceInRupees(totalPrice)}</p>
// //                                                 </div>
// //                                             ) : (
// //                                                 <p>My Cart</p>
// //                                             )
// //                                         }
// //                                     </div>
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )
// //             }

// //             {/* Mobile Search */}
// //             <div className='container mx-auto px-2 lg:hidden'>
// //                 <Search />
// //             </div>

// //             {
// //                 openCartSection && (
// //                     <DisplayCartItem close={() => setOpenCartSection(false)} />
// //                 )
// //             }
// //         </header>
// //     )
// // }

// // export default Header

// // src/components/Header.jsx

// // import React, { useEffect, useState } from 'react'
// // import logo from '../assets/logof.png'
// // import Search from './search'
// // import { Link, useLocation, useNavigate } from 'react-router-dom'
// // import { FaRegCircleUser, FaBell } from "react-icons/fa6"
// // import useMobile from '../hooks/useMobile'
// // import { BsCart4 } from "react-icons/bs"
// // import { useSelector } from 'react-redux'
// // import { GoTriangleDown, GoTriangleUp } from "react-icons/go"
// // import UserMenu from './UserMenu'
// // import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
// // import { useGlobalContext } from '../provider/GlobalProvider'
// // import DisplayCartItem from './DisplayCartItem'

// // import Axios from '../utils/Axios';
// // import SummaryApi from '../common/SummaryApi';

// // const Header = () => {
// //     const [isMobile] = useMobile()
// //     const location = useLocation()
// //     const isSearchPage = location.pathname === "/search"
// //     const navigate = useNavigate()
// //     const user = useSelector(state => state.user)
// //     const cartItem = useSelector(state => state.cartItem.cart)
// //     const { totalPrice, totalQty } = useGlobalContext()

// //     const [openUserMenu, setOpenUserMenu] = useState(false)
// //     const [openCartSection, setOpenCartSection] = useState(false)
// //     const [notifications, setNotifications] = useState([])
// //     const [showDropdown, setShowDropdown] = useState(false)

// //     useEffect(() => {
// //         const loadOrders = async () => {
// //             try {
// //                 if (user?._id) {
// //                     const res = await Axios({ ...SummaryApi.getUserOrders })
// //                     const orders = Array.isArray(res.data?.data) ? res.data.data : []

// //                     setNotifications(orders)
// //                 }
// //             } catch (err) {
// //                 console.error('Failed to load farmer orders', err)
// //             }
// //         }
// //         loadOrders()
// //     }, [user?._id])

// //     const handleClick = () => {
// //         setShowDropdown(prev => !prev)
// //     }

// //     const goToOrders = () => {
// //         setShowDropdown(false)
// //         navigate("/orders")
// //     }

// //     const redirectToLoginPage = () => {
// //         navigate("/login")
// //     }

// //     const handleCloseUserMenu = () => {
// //         setOpenUserMenu(false)
// //     }

// //     const handleMobileUser = () => {
// //         if (!user._id) {
// //             navigate("/login")
// //             return
// //         }
// //         navigate("/user")
// //     }

// //     return (
// //         <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-green-100'>
// //             {
// //                 !(isSearchPage && isMobile) && (
// //                     <div className='container mx-auto flex items-center px-2 justify-between'>
// //                         {/* Logo */}
// //                         <div className='h-full'>
// //                             <Link to={"/"} className='h-full flex justify-center items-center'>
// //                                 <img src={logo} width={170} height={60} alt='logo' className='hidden lg:block' />
// //                                 <img src={logo} width={120} height={60} alt='logo' className='lg:hidden' />
// //                             </Link>
// //                         </div>

// //                         {/* Navbar Links */}
// //                         <nav className='hidden lg:flex items-center gap-10'>
// //                             <Link to="/home" className='text-lg text-neutral-600 hover:text-green-800'>Home</Link>
// //                             <Link to="/" className='text-lg text-neutral-600 hover:text-green-800'>Products</Link>
// //                             <Link to="/about" className='text-lg text-neutral-600 hover:text-green-800'>About</Link>
// //                             <Link to="/contact" className='text-lg text-neutral-600 hover:text-green-800'>Contact</Link>
// //                         </nav>

// //                         {/* Search */}
// //                         <div className='hidden lg:block'>
// //                             <Search />
// //                         </div>

// //                         {/* Notification Bell */}
// //                         <div className="relative mr-4">
// //                             <FaBell onClick={handleClick} size={24} style={{ cursor: "pointer" }} />
// //                             {notifications.length > 0 && (
// //                                 <span className="absolute top-[-6px] right-[-6px] bg-red-600 text-white rounded-full text-xs px-1">
// //                                     {notifications.length}
// //                                 </span>
// //                             )}
// //                             {showDropdown && (
// //                                 <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-900 max-h-64 overflow-auto">
// //                                     {notifications.map((order, idx) => (
// //                                         <div
// //                                             key={idx}
// //                                             onClick={goToOrders}
// //                                             className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
// //                                         >
// //                                             Order for <strong>{order.product_details?.name || 'Unknown Product'}</strong>
// //                                         </div>
// //                                     ))}
// //                                 </div>
// //                             )}
// //                         </div>

// //                         {/* User and Cart Section */}
// //                         <div>
// //                             {/* User Icon on Mobile */}
// //                             <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
// //                                 <FaRegCircleUser size={26} />
// //                             </button>

// //                             {/* Desktop User and Cart Section */}
// //                             <div className='hidden lg:flex items-center gap-10'>
// //                                 {
// //                                     user?._id ? (
// //                                         <div className='relative'>
// //                                             <div onClick={() => setOpenUserMenu(prev => !prev)} className='flex select-none items-center gap-1 cursor-pointer'>
// //                                                 <p>Account</p>
// //                                                 {
// //                                                     openUserMenu ? <GoTriangleUp size={25} /> : <GoTriangleDown size={25} />
// //                                                 }
// //                                             </div>
// //                                             {
// //                                                 openUserMenu && (
// //                                                     <div className='absolute right-0 top-12'>
// //                                                         <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
// //                                                             <UserMenu close={handleCloseUserMenu} />
// //                                                         </div>
// //                                                     </div>
// //                                                 )
// //                                             }
// //                                         </div>
// //                                     ) : (
// //                                         <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
// //                                     )
// //                                 }

// //                                 <button onClick={() => setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
// //                                     <div className='animate-bounce'>
// //                                         <BsCart4 size={26} />
// //                                     </div>
// //                                     <div className='font-semibold text-sm'>
// //                                         {
// //                                             cartItem[0] ? (
// //                                                 <div>
// //                                                     <p>{totalQty} Items</p>
// //                                                     <p>{DisplayPriceInRupees(totalPrice)}</p>
// //                                                 </div>
// //                                             ) : (
// //                                                 <p>My Cart</p>
// //                                             )
// //                                         }
// //                                     </div>
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 )
// //             }

// //             {/* Mobile Search */}
// //             <div className='container mx-auto px-2 lg:hidden'>
// //                 <Search />
// //             </div>

// //             {openCartSection && (
// //                 <DisplayCartItem close={() => setOpenCartSection(false)} />
// //             )}
// //         </header>
// //     )
// // }

// // export default Header

// // Inside the Header component, locate the Notification dropdown
//  // Header.jsx

// import React, { useEffect, useState } from 'react'
// import logo from '../assets/logof.png'
// import Search from './search'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { FaRegCircleUser, FaBell } from "react-icons/fa6"
// import useMobile from '../hooks/useMobile'
// import { BsCart4 } from "react-icons/bs"
// import { useSelector } from 'react-redux'
// import { GoTriangleDown, GoTriangleUp } from "react-icons/go"
// import UserMenu from './UserMenu'
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
// import { useGlobalContext } from '../provider/GlobalProvider'
// import DisplayCartItem from './DisplayCartItem'
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';

// const Header = () => {
//     const [isMobile] = useMobile()
//     const location = useLocation()
//     const isSearchPage = location.pathname === "/search"
//     const navigate = useNavigate()
//     const user = useSelector(state => state.user)
//     const cartItem = useSelector(state => state.cartItem.cart)
//     const { totalPrice, totalQty } = useGlobalContext()

//     const [openUserMenu, setOpenUserMenu] = useState(false)
//     const [openCartSection, setOpenCartSection] = useState(false)
//     const [notifications, setNotifications] = useState([])
//     const [showDropdown, setShowDropdown] = useState(false)

//     // const markNotificationsAsRead = async () => {
//     //     try {
//     //         await Axios({ ...SummaryApi.markNotificationsRead })
//     //         setNotifications([])
//     //     } catch (err) {
//     //         console.error('Failed to mark notifications as read', err)
//     //     }
//     // }

//     useEffect(() => {
//         const loadNotifications = async () => {
//             try {
//                 if (!user?._id) return

//                 let res
//                 let orders = []
//                 if (user.role === "USER") {
//                     res = await Axios({ ...SummaryApi.getUnreadBuyerNotifications })
//                     orders = Array.isArray(res.data?.data) ? res.data.data : []
//                 } else if (user.role === "FARMER") {
//                     res = await Axios({ ...SummaryApi.getUserOrders })
//                     orders = Array.isArray(res.data?.data) ? res.data.data : []
//                 }

//                 const filtered = orders.filter(order => {
//                     if (user.role === "USER") {
//                         return ["pending","processing", "shipped", "ready_to_pick"].includes(order.status)
//                     } else if (user.role === "FARMER") {
//                         // Show orders that are not delivered or cancelled
//                         return !["delivered", "cancelled"].includes(order.status)
//                     }
//                     return false
//                 })

//                 setNotifications(filtered)
//             } catch (err) {
//                 console.error('Failed to load notifications', err)
//             }
//         }

//         loadNotifications()
//         const interval = setInterval(loadNotifications, 15000)
//         return () => clearInterval(interval)
//     }, [user?._id])

//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             const bell = document.querySelector('.notification-dropdown');
//             if (bell && !bell.contains(e.target)) {
//                 setShowDropdown(false);
//             }
//         };

//         document.addEventListener('click', handleClickOutside);
//         return () => document.removeEventListener('click', handleClickOutside);
//     }, []);

//     const handleClick = () => {
//         setShowDropdown(prev => 
//             !prev)
            
           
//     }

//     const goToOrders = () => navigate("/orders")

//     const redirectToLoginPage = () => navigate("/login")

//     const handleCloseUserMenu = () => setOpenUserMenu(false)

//     const handleMobileUser = () => {
//         if (!user._id) {
//             navigate("/login")
//             return
//         }
//         navigate("/user")
//     }

//     return (
//         <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-green -700'>
//             {!(isSearchPage && isMobile) && (
//                 <div className='container mx-auto flex items-center px-2 justify-between'>
//                     <Link to="/" className='h-full flex justify-center items-center'>
//                         <img src={logo} width={170} height={60} alt='logo' className='hidden lg:block' />
//                         <img src={logo} width={120} height={60} alt='logo' className='lg:hidden' />
//                     </Link>

//                     <nav className='hidden lg:flex items-center gap-10'>
//                         <Link to="/home" className='text-lg text-neutral-600 hover:text-green-800'>Home</Link>
//                         <Link to="/" className='text-lg text-neutral-600 hover:text-green-800'>Products</Link>
//                         <Link to="/about" className='text-lg text-neutral-600 hover:text-green-800'>About</Link>
//                         <Link to="/contact" className='text-lg text-neutral-600 hover:text-green-800'>Contact</Link>
//                     </nav>

//                     <div className='hidden lg:block'>
//                         <Search />
//                     </div>

//                     <div className="relative mr-4 notification-dropdown">
//                         <FaBell onClick={handleClick} size={24} style={{ cursor: "pointer" }} />
//                         {notifications.length > 0 && (
//                             <span className="absolute top-[-6px] right-[-6px] bg-red-600 text-white rounded-full text-xs px-1">
//                                 {notifications.length}
//                             </span>
//                         )}
//                         {showDropdown && (
//                             <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-300 rounded shadow-xl z-[999] max-h-64 overflow-auto">
//                                 {notifications.map((order, idx) => (
//                                     <div
//                                         key={idx}
//                                         onClick={goToOrders}
//                                         className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
//                                     >
//                                         {user.role === "USER"
//                                             ? `${order.product_details?.name}: ${order.status?.replaceAll("_", " ")}`
//                                             : `New order: ${order.product_details?.name}`}
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>

//                     <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
//                         <FaRegCircleUser size={26} />
//                     </button>

//                     <div className='hidden lg:flex items-center gap-10'>
//                         {user?._id ? (
//                             <div className='relative'>
//                                 <div onClick={() => setOpenUserMenu(prev => !prev)} className='flex select-none items-center gap-1 cursor-pointer'>
//                                     <p>Account</p>
//                                     {openUserMenu ? <GoTriangleUp size={25} /> : <GoTriangleDown size={25} />}
//                                 </div>
//                                 {openUserMenu && (
//                                     <div className='absolute right-0 top-12'>
//                                         <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
//                                             <UserMenu close={handleCloseUserMenu} />
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         ) : (
//                             <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
//                         )}

//                         <button onClick={() => setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
//                             <div className='animate-bounce'>
//                                 <BsCart4 size={26} />
//                             </div>
//                             <div className='font-semibold text-sm'>
//                                 {cartItem[0] ? (
//                                     <>
//                                         <p>{totalQty} Items</p>
//                                         <p>{DisplayPriceInRupees(totalPrice)}</p>
//                                     </>
//                                 ) : (
//                                     <p>My Cart</p>
//                                 )}
//                             </div>
//                         </button>
//                     </div>
//                 </div>
//             )}

//             <div className='container mx-auto px-2 lg:hidden'>
//                 <Search />
//             </div>

//             {openCartSection && (
//                 <DisplayCartItem close={() => setOpenCartSection(false)} />
//             )}
//         </header>
//     )
// }

// export default Header

// src/pages/BuyerOrders.jsx
import React, { useEffect, useState } from 'react'
import logo from '../assets/logof.png'
import Search from './search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser, FaBell } from "react-icons/fa6"
import useMobile from '../hooks/useMobile'
import { BsCart4 } from "react-icons/bs"
import { useSelector } from 'react-redux'
import { GoTriangleDown, GoTriangleUp } from "react-icons/go"
import UserMenu from './UserMenu'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { useGlobalContext } from '../provider/GlobalProvider'
import DisplayCartItem from './DisplayCartItem'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import isAdmin from '../utils/isAdmin'
import isFarmer from '../utils/isFarmer'
const Header = () => {
    const [isMobile] = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const cartItem = useSelector(state => state.cartItem.cart)
    const { totalPrice, totalQty } = useGlobalContext()

    const [openUserMenu, setOpenUserMenu] = useState(false)
    const [openCartSection, setOpenCartSection] = useState(false)
    const [notifications, setNotifications] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                if (!user?._id) return

                let res
                let orders = []
                if (user.role === "USER") {
                    res = await Axios({ ...SummaryApi.getBuyerOrders })
                    orders = Array.isArray(res.data?.data) ? res.data.data : []
                } else if (user.role === "FARMER") {
                    res = await Axios({ ...SummaryApi.getUserOrders })
                    orders = Array.isArray(res.data?.data) ? res.data.data : []
                }

                const filtered = orders.filter(order => {
                    if (user.role === "USER") {
                        return ["pending","processing", "shipped", "ready_to_pick","delivered"].includes(order.status)
                    } else if (user.role === "FARMER") {
                        // Show orders that are not delivered or cancelled
                        return !["delivered"].includes(order.status)
                    }
                    return false
                })

                setNotifications(filtered)
            } catch (err) {
                console.error('Failed to load notifications', err)
            }
        }

        loadNotifications()
        const interval = setInterval(loadNotifications, 15000)
        return () => clearInterval(interval)
    }, [user?._id])

    useEffect(() => {
        const handleClickOutside = (e) => {
            const bell = document.querySelector('.notification-dropdown');
            if (bell && !bell.contains(e.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
            clearInterval();
        }
    }, []);

    const handleClick = () => {
        setShowDropdown(prev => !prev)
    }

    const goToOrders = () => {
        setShowDropdown(false)
        if (user.role === "USER") {
            navigate("/my-orders")
        } else if (user.role === "FARMER") {
            navigate("/orders")
        }
    }

    const redirectToLoginPage = () => navigate("/login")

    const handleCloseUserMenu = () => setOpenUserMenu(false)

    const handleMobileUser = () => {
        if (!user._id) {
            navigate("/login")
            return
        }
        navigate("/user")
    }

    return (
        <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
            {!(isSearchPage && isMobile) && (
                <div className='container mx-auto flex items-center px-2 justify-between'>
                    <Link to="/" className='h-full flex justify-center items-center'>
                        <img src={logo} width={170} height={60} alt='logo' className='hidden lg:block' />
                        <img src={logo} width={120} height={60} alt='logo' className='lg:hidden' />
                    </Link>

                    <nav className='hidden lg:flex items-center gap-10'>
                        <Link to="/home" className='text-lg text-neutral-600 hover:text-green-800'>Home</Link>
                        <Link to="/" className='text-lg text-neutral-600 hover:text-green-800'>Products</Link>
                        <Link to="AboutPage" className='text-lg text-neutral-600 hover:text-green-800'>About</Link>
                        <Link to="ContactPage" className='text-lg text-neutral-600 hover:text-green-800'>Contact</Link>
                    </nav>

                    <div className='hidden lg:block'>
                        <Search />
                    </div>

                    <div className="relative mr-4 notification-dropdown">
                        <FaBell onClick={handleClick} size={24} style={{ cursor: "pointer" }} />
                        {notifications.length > 0 && (
                            <span className="absolute top-[-6px] right-[-6px] bg-red-600 text-white rounded-full text-xs px-1 min-w-[18px] h-[18px] flex items-center justify-center">
                                {notifications.length}
                            </span>
                        )}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-xl z-[999] max-h-80 overflow-auto">
                                <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                                    <h3 className="font-semibold text-gray-800">
                                        {user.role === "USER" ? "Order Updates" : "New Orders"}
                                    </h3>
                                </div>
                                {notifications.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500">
                                        No new notifications
                                    </div>
                                ) : (
                                    <div>
                                        {notifications.map((order, idx) => (
                                            <div
                                                key={idx}
                                                onClick={goToOrders}
                                                className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                                            >
                                                <div className="font-medium">
                                                    {order.product_details?.name || 'Product'}
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {user.role === "USER"
                                                        ? `Status: ${order.status?.replaceAll("_", " ").toUpperCase()}`
                                                        : `New order received`}
                                                </div>
                                            </div>
                                        ))}
                                        <div 
                                            onClick={goToOrders}
                                            className="p-3 text-center text-sm text-blue-600 hover:bg-blue-50 cursor-pointer font-medium"
                                        >
                                            View All Orders
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                        <FaRegCircleUser size={26} />
                    </button>

                    <div className='hidden lg:flex items-center gap-10'>
                        {user?._id ? (
                            <div className='relative'>
                                <div onClick={() => setOpenUserMenu(prev => !prev)} className='flex select-none items-center gap-1 cursor-pointer'>
                                    <p>Account</p>
                                    {openUserMenu ? <GoTriangleUp size={25} /> : <GoTriangleDown size={25} />}
                                </div>
                                {openUserMenu && (
                                    <div className='absolute right-0 top-12'>
                                        <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                            <UserMenu close={handleCloseUserMenu} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
                        )}

{(!isAdmin(user.role) && !isFarmer(user.role)) && (
                            <button onClick={() => setOpenCartSection(true)} className='flex items-center gap-2 bg-green-800 hover:bg-green-700 px-3 py-2 rounded text-white'>
                                <div className='animate-bounce'>
                                    <BsCart4 size={26} />
                                </div>
                                <div className='font-semibold text-sm'>
                                    {cartItem[0] ? (
                                        <>
                                            <p>{totalQty} Items</p>
                                            <p>{DisplayPriceInRupees(totalPrice)}</p>
                                        </>
                                    ) : (
                                        <p>My Cart</p>
                                    )}
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            )}
        

            <div className='container mx-auto px-2 lg:hidden'>
                <Search />
            </div>

            {openCartSection && (
                <DisplayCartItem close={() => setOpenCartSection(false)} />
            )}
        </header>
    )
}

export default Header