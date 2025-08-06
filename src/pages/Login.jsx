 // import React, { useState } from 'react';
// import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
// import toast from 'react-hot-toast';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import { Link, useNavigate } from 'react-router-dom';
// import fetchUserDetails from '../utils/fetchUserDetails';
// import { useDispatch } from 'react-redux';
// import { setUserDetails } from '../store/userSlice';

// const Login = () => {
//     const [data, setData] = useState({ email: "", password: "" });
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const handleChange = (e) => {
//         setData((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value
//         }));
//     };

//     const valideValue = Object.values(data).every(el => el);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         console.log("🔹 Data sent to backend:", data); // Debugging login data before API call

//         try {
//             const response = await Axios({
//                 ...SummaryApi.login,
//                 data: data
//             });

//             console.log("🔹 API Response:", response.data); // Debugging API response

//             if (response.data.error) {
//                 toast.error(response.data.message);
//                 return;
//             }

//             if (response.data.success) {
//                 toast.success(response.data.message);

//                 localStorage.setItem('accesstoken', response.data.data.accesstoken);
//                 localStorage.setItem('refreshToken', response.data.data.refreshToken);

//                 const userDetails = await fetchUserDetails();
//                 console.log("🔹 User Details:", userDetails.data); // Debugging user details

//                 dispatch(setUserDetails(userDetails.data));

//                 setData({ email: "", password: "" });

//                 console.log("🔹 Navigating to Home...");
//                 navigate("/");
//             }

//         } catch (error) {
//             console.error("🔹 Axios Error:", error);
//             AxiosToastError(error);
//         }
//     };

//     return (
//         <section className='w-full container mx-auto px-2'>
//             <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>

//                 <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
//                     {/* Email Input */}
//                     <div className='grid gap-1'>
//                         <label htmlFor='email'>Email :</label>
//                         <input
//                             type='email'
//                             id='email'
//                             className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
//                             name='email'
//                             value={data.email}
//                             onChange={handleChange}
//                             placeholder='Enter your email'
//                         />
//                     </div>

//                     {/* Password Input */}
//                     <div className='grid gap-1'>
//                         <label htmlFor='password'>Password :</label>
//                         <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 id='password'
//                                 className='w-full outline-none'
//                                 name='password'
//                                 value={data.password}
//                                 onChange={handleChange}
//                                 placeholder='Enter your password'
//                             />
//                             <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
//                                 {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
//                             </div>
//                         </div>
//                         <Link to={"/forgot-password"} className='block ml-auto hover:text-primary-200'>Forgot password?</Link>
//                     </div>

//                     {/* Login Button */}
//                     <button 
//                         disabled={!valideValue} 
//                         className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold my-3 tracking-wide`}
//                     >
//                         Login
//                     </button>
//                 </form>

//                 {/* Register Link with Console Log */}
//                 <p>
//                     Don't have an account? 
//                     <Link 
//                         to={"/register"} 
//                         className='font-semibold text-green-700 hover:text-green-800'
//                         onClick={() => console.log("🔹 Navigating to Register Page. Current login data:", data)}
//                     >
//                         Register
//                     </Link>
//                 </p>
//             </div>
//         </section>
//     );
// };

// export default Login;
 


// import React, { useState } from 'react';
// import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import fetchUserDetails from '../utils/fetchUserDetails';
// import { useDispatch } from 'react-redux';
// import { setUserDetails } from '../store/userSlice';
// import defaultImage from '../assets/default.png';
// import '../pages/Login.css';
// // Import the CSS file

// const Login = () => {
//     const [data, setData] = useState({ email: "", password: "" });
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();
//     const location = useLocation();
//     const dispatch = useDispatch();

//     const role = new URLSearchParams(location.search).get('role');

//     const handleChange = (e) => {
//         setData((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value
//         }));
//     };

//     const validateEmail = (email) => {
//         const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return re.test(String(email).toLowerCase());
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");

//         if (!validateEmail(data.email)) {
//             setError('Please enter a valid email address.');
//             return;
//         }

//         if (data.password.length < 6) {
//             setError('Password must be at least 6 characters long.');
//             return;
//         }

//         try {
//             const response = await Axios({
//                 ...SummaryApi.login,
//                 data: data
//             });

//             if (response.data.error) {
//                 toast.error(response.data.message);
//                 return;
//             }

//             if (response.data.success) {
//                 toast.success(response.data.message);

//                 localStorage.setItem('accesstoken', response.data.data.accesstoken);
//                 localStorage.setItem('refreshToken', response.data.data.refreshToken);

//                 const userDetails = await fetchUserDetails();
//                 dispatch(setUserDetails(userDetails.data));

//                 setData({ email: "", password: "" });

//                 navigate("/");
                
//             }
//         } catch (error) {
//             AxiosToastError(error);
//         }
//     };

//     return (
//         <div className="login-container">
//             <div className="login-box">
//                 <div className="login-image">
//                     <img src={defaultImage} alt="Illustration" />
//                 </div>
//                 <div className="login-form-container">
//                     <h1 className="login-title">Farm To Spoon</h1>
//                     <form onSubmit={handleSubmit} className="login-form">
//                         <div>
//                             <label htmlFor="email" className="input-label">Email</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={data.email}
//                                 onChange={handleChange}
//                                 required
//                                 className="input-field"
//                             />
//                         </div>
//                         <div className="mt-4">
//                             <label htmlFor="password" className="input-label">Password</label>
//                             <div className="password-container">
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     id="password"
//                                     name="password"
//                                     value={data.password}
//                                     onChange={handleChange}
//                                     required
//                                     className="input-field"
//                                 />
//                                 <div onClick={() => setShowPassword(prev => !prev)} className="password-toggle">
//                                     {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
//                                 </div>
//                             </div>
//                         </div>
//                         {error && <div className="error-message">{error}</div>}
//                         <div className="mt-4 flex justify-between">
//                             <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
//                         </div>
//                         <button type="submit" className="login-button">
//                             Sign In
//                         </button>
//                     </form>
//                     <div className="signup-link">
//                         <p>Don't have an account? <Link to="/register">Sign up</Link></p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;




import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';  // <-- Make sure you import this
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import defaultImage from '../assets/default.png';
import '../pages/Login.css';

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const role = new URLSearchParams(location.search).get('role');

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(data.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (data.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      console.log('Sending login data:', data);
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      });

      console.log('API Response:', response.data);

      if (response.data.error) {
        toast.error(response.data.message);
        return;
      }

      if (response.data.success) {
        toast.success(response.data.message);

        // Debug response userId and tokens
        console.log('Login success, data:', response.data.data);

        // Store tokens and userId in localStorage
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        localStorage.setItem('userId', response.data.data.userId);
        localStorage.setItem('username',response.data.data.name)

        // Debug after setting localStorage
        console.log('LocalStorage userId:', localStorage.getItem('userId'));
        localStorage.setItem('userId', response.data.data.userId);
        // Set cookie for userId (for example usage or backend reading)
        Cookies.set('userId', response.data.data.userId, {
          expires: 7,
          sameSite: 'Lax',
          secure: false, // IMPORTANT: false for local testing HTTP
        });

        // Debug cookie value right after set
        console.log('Cookie userId:', Cookies.get('userId'));

        // Fetch user details and update redux store
        const userDetails = await fetchUserDetails();
        dispatch(setUserDetails(userDetails.data));

        setData({ email: "", password: "" });

        // Navigate to homepage or dashboard
        navigate("/");
      }
    } catch (error) {
      console.error('Login error:', error);
      AxiosToastError(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-bg-left" />
      <div className="login-bg-right" />
      <div className="login-content">
        <div className="login-box">
          <div className="login-image">
            <img src={defaultImage} alt="Illustration" />
          </div>
          <div className="login-form-container">
            <h1 className="login-title">Farm To Spoon</h1>
            <form onSubmit={handleSubmit} className="login-form">
              <div>
                <label htmlFor="email" className="input-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="password" className="input-label">Password</label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                  <div onClick={() => setShowPassword(prev => !prev)} className="password-toggle">
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </div>
                </div>
              </div>
              {error && <div className="error-message">{error}</div>}
              <div className="mt-4 flex justify-between">
                <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
              </div>
              <button type="submit" className="login-button">
                Sign In
              </button>
            </form>
            <div className="signup-link">
              <p>Don't have an account? <Link to="/register">Sign up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
