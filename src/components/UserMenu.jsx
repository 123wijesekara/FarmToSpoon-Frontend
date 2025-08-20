// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
// import Divider from './Divider'
// import Axios from '../utils/Axios'
// import SummaryApi from '../common/SummaryApi'
// import { logout } from '../store/userSlice'
// import toast from 'react-hot-toast'
// import AxiosToastError from '../utils/AxiosToastError'
// import { HiOutlineExternalLink } from "react-icons/hi";
// import isFarmer from '../utils/isFarmer'
 
// const UserMenu = ({close}) => {
//    const [showLogoutModal, setShowLogoutModal] = useState(false);
//    const user = useSelector((state)=> state.user)
//    const dispatch = useDispatch()
//    const navigate = useNavigate()

//    const handleLogout = async()=>{
//         try {
//           const response = await Axios({
//              ...SummaryApi.logout
//           })
//           console.log("logout",response)
//           if(response.data.success){
//             if(close){
//               close()
//             }
//             dispatch(logout())
//             localStorage.clear()
//             toast.success(response.data.message)
//             navigate("/")
//           }
//         } catch (error) {
//           console.log(error)
//           AxiosToastError(error)
//         }
//    }

//    const confirmLogout = () => {
//       setShowLogoutModal(true);
//    }

//    const cancelLogout = () => {
//       setShowLogoutModal(false);
//    }

//    const handleClose = ()=>{
//       if(close){
//         close()
//       }
//    }
  
//   return (
//     <div className="bg-[#d4f1bc] p-4 rounded-lg">
//         <div className='font-semibold text-lg mb-2'>My Account</div>
//         <div className='text-sm flex items-center gap-2 mb-3'>
//           <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobile} <span className='text-medium text-red-600'>{user.role === "FARMER" ? "(Farmer)" : "" }</span></span>
//           <Link onClick={handleClose} to={"/dashboard/profile"} className='text-[#4CAF50] hover:text-[#a0dca0]'>
//             <HiOutlineExternalLink size={15}/>
//           </Link>
//         </div>

//         <Divider/>

//         <div className='text-sm grid gap-2 mt-3'>
//             {
//               isFarmer(user.role) && (
//                 <Link onClick={handleClose} to={"/dashboard/category"} className='px-4 py-3 flex items-center hover:bg-[#a0dca0] hover:text-white transition-colors duration-300 ease-in-out rounded-md'>
//                   <i className="fas fa-folder mr-2"></i> Category
//                 </Link>
//               )
//             }

//             {
//               isFarmer(user.role) && (
//                 <Link onClick={handleClose} to={"/dashboard/subcategory"} className='px-4 py-3 flex items-center hover:bg-[#a0dca0] hover:text-white transition-colors duration-300 ease-in-out rounded-md'>
//                   <i className="fas fa-folder-open mr-2"></i> Sub Category
//                 </Link>
//               )
//             }

//             {
//               isFarmer(user.role) && (
//                 <Link onClick={handleClose} to={"/dashboard/upload-product"} className='px-4 py-3 flex items-center hover:bg-[#a0dca0] hover:text-white transition-colors duration-300 ease-in-out rounded-md'>
//                   <i className="fas fa-upload mr-2"></i> Upload Product
//                 </Link>
//               )
//             }

//             {
//               isFarmer(user.role) && (
//                 <Link onClick={handleClose} to={"/dashboard/product"} className='px-4 py-3 flex items-center hover:bg-[#a0dca0] hover:text-white transition-colors duration-300 ease-in-out rounded-md'>
//                   <i className="fas fa-box mr-2"></i> Product
//                 </Link>
//               )
//             }

//             <Link onClick={handleClose} to={"/dashboard/myorders"} className='px-4 py-3 flex items-center hover:bg-[#a0dca0] hover:text-white transition-colors duration-300 ease-in-out rounded-md'>
//               <i className="fas fa-history mr-2"></i> My Orders
//             </Link>

//             <Link onClick={handleClose} to={"/dashboard/address"} className='px-4 py-3 flex items-center hover:bg-[#a0dca0] hover:text-white transition-colors duration-300 ease-in-out rounded-md'>
//               <i className="fas fa-map-marker-alt mr-2"></i> Save Address
//             </Link>

//             <button onClick={confirmLogout} className='text-left px-4 py-3 flex items-center hover:bg-[#a0dca0] hover:text-white transition-colors duration-300 ease-in-out rounded-md w-full'>
//               <i className="fas fa-sign-out-alt mr-2"></i> Log Out
//             </button>
//         </div>

//         {/* Logout Confirmation Modal */}
//         {showLogoutModal && (
//           <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg text-center">
//               <p className="text-lg mb-4">Are you sure you want to logout?</p>
//               <div className="flex justify-center gap-4">
//                 <button className="bg-[#67e55e] text-white px-4 py-2 rounded-md hover:bg-[#4CAF50]" onClick={handleLogout}>Yes</button>
//                 <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600" onClick={cancelLogout}>No</button>
//               </div>
//             </div>
//           </div>
//         )}
//     </div>
//   )
// }

// export default UserMenu

// 
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { HiOutlineExternalLink } from "react-icons/hi";
import isFarmer from '../utils/isFarmer'
import isAdmin from '../utils/isAdmin'
import './userMenu.css';
import 'font-awesome/css/font-awesome.min.css';

const UserMenu = ({ close }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout
      })
      console.log("logout", response)
      if (response.data.success) {
        if (close) {
          close()
        }
        dispatch(logout())
        localStorage.clear()
        toast.success(response.data.message)
        navigate("/")
      }
    } catch (error) {
      console.log(error)
      AxiosToastError(error)
    }
  }

  const confirmLogout = () => {
    setShowLogoutModal(true);
  }

  const cancelLogout = () => {
    setShowLogoutModal(false);
  }

  const handleClose = () => {
    if (close) {
      close()
    }
  }

  return (
    <div className="user-menu">
      <div className="user-account-header">My Account</div>
      <div className="user-info">
        <span className="user-name">{user.name || user.mobile} <span className="user-role">{user.role === "FARMER" ? "(Farmer)" : ""}</span></span>
        <Link onClick={handleClose} to="/dashboard/profile" className="external-link">
          <HiOutlineExternalLink size={15} />
        </Link>
      </div>

      <Divider />

      <div className="menu-links">
        {isAdmin(user.role) && (
          <Link onClick={handleClose} to="/dashboard/category" className="menu-link">
            <i className="fas fa-folder mr-2"></i> Category
          </Link>
        )}

        {isAdmin(user.role) && (
          <Link onClick={handleClose} to="/dashboard/subcategory" className="menu-link">
            <i className="fas fa-folder-open mr-2"></i> Sub Category
          </Link>
        )}

        {isFarmer(user.role) && (
          <Link onClick={handleClose} to="/dashboard/upload-product" className="menu-link">
            <i className="fas fa-upload mr-2"></i> Upload Product
          </Link>
        )}
            {isFarmer(user.role) && (
          <Link onClick={handleClose} to="/dashboard/reports" className="menu-link">
            <i className="fas fa-chart-line mr-2"></i> Sales Reports
          </Link>
        )}

{isFarmer(user.role) && (
          <Link onClick={handleClose} to="/dashboard/Stockmanage" className="menu-link">
            <i className="fas fa-warehouse mr-2"></i> Stock Manage
          </Link>
        )}
        {isFarmer(user.role) && (
          <Link onClick={handleClose} to="/dashboard/product" className="menu-link">
            <i className="fas fa-box mr-2"></i> Product
          </Link>
        )}
{isAdmin(user.role) && (
          <Link onClick={handleClose} to="/dashboard/usermanage" className="menu-link">
            <i className="fas fa-user-friends mr-2"></i> Famer Manage
          </Link>
        )}
        <Link onClick={handleClose} to="/dashboard/myorders" className="menu-link">
          <i className="fas fa-history mr-2"></i> My Orders
        </Link>

        <Link onClick={handleClose} to="/dashboard/address" className="menu-link">
          <i className="fas fa-map-marker-alt mr-2"></i> Save Address
        </Link>

        <button onClick={confirmLogout} className="logout-btn">
          <i className="fas fa-sign-out-alt mr-2"></i> Log Out
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <p className="logout-modal-message">Are you sure you want to logout?</p>
            <div className="logout-modal-actions">
              <button className="confirm-logout-btn" onClick={handleLogout}>Yes</button>
              <button className="cancel-logout-btn" onClick={cancelLogout}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu;
