 // import React, { useState } from 'react'
// import { FaRegEyeSlash } from "react-icons/fa6";
// import { FaRegEye } from "react-icons/fa6";
// import toast from 'react-hot-toast';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
 
// import { Link, useNavigate } from 'react-router-dom';
// import AxiosToastError from '../utils/AxiosToastError';

// const ForgotPassword = () => {
//     const [data, setData] = useState({
//         email: "",
//     })
//     const navigate = useNavigate()

//     const handleChange = (e) => {
//         const { name, value } = e.target

//         setData((preve) => {
//             return {
//                 ...preve,
//                 [name]: value
//             }
//         })
//     }

//     const valideValue = Object.values(data).every(el => el)


//     const handleSubmit = async(e)=>{
//         e.preventDefault()

//         try {
//             const response = await Axios({
//                 ...SummaryApi.forgot_password,
//                 data : data
//             })
            
//             if(response.data.error){
//                 toast.error(response.data.message)
//             }

//             if(response.data.success){
//                 toast.success(response.data.message)
//                 navigate("/verification-otp",{
//                   state : data
//                 })
//                 setData({
//                     email : "",
//                 })
                
//             }

//         } catch (error) {
//             AxiosToastError(error)
//         }



//     }

//     return (
//         <section className='w-full container mx-auto px-2'>
//             <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
//                 <p className='font-semibold text-lg'>Forgot Password </p>
//                 <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
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
             
//                     <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Send Otp</button>

//                 </form>

//                 <p>
//                     Already have account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
//                 </p>
//             </div>
//         </section>
//     )
// }

// export default ForgotPassword
 

import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import defaultImage from '../assets/default.png';
import '../pages/ForgotPassword.css';
 

const ForgotPassword = () => {
    const [data, setData] = useState({ email: "",});
    
    const [error, setError] = useState("");
    const navigate = useNavigate();
   
    

   

    const handleChange = (e) => {
                const { name, value } = e.target
        
                setData((preve) => {
                    return {
                        ...preve,
                        [name]: value
                    }
                })
            }
        

    const valideValue = Object.values(data).every(el => el)
 
const handleSubmit = async (e) => {
    e.preventDefault();
  //  setError("");


    try {
        const response = await Axios({
            ...SummaryApi.forgot_password,
            data: data
        });
     

        if (response.data.error) {
            toast.error(response.data.message);

        }

        if(response.data.success){
                            toast.success(response.data.message)
                            navigate("/verification-otp",{
                              state : data
                            })
                            setData({
                                email : "",
                            })
                            
                        }
            
                    } catch (error) {
                        AxiosToastError(error)
                    }
            
};

    return (
        <div className="forgotpassword-container">
              <div className="bg-left" />
              <div className="bg-right" />
              <div className="content">
            <div className="forgotpassword-box">
                <div className="forgotpassword-image">
                    <img src={defaultImage} alt="Illustration" />
                </div>
                <div className="forgotpassword-form-container">
                    <h1 className="forgotpassword-title">Farm To Spoon</h1>
                    <form onSubmit={handleSubmit} className="forgotpassword-form">
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
                                placeholder='Enter your email'
                            />
                        </div>
                        <div className="mt-4">
                         
                        </div>
                       
                        <button
  disabled={!valideValue}
  className={`w-full mt-6 bg-black text-white py-2 rounded-md transition-colors duration-200 border-none cursor-pointer ${
    valideValue ? "hover:bg-green-700" : "bg-gray-500"
  }`}
>
  Send OTP
</button>

                    </form>
                    <div className="signup-link">
                        <p>Back To Login? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ForgotPassword;
