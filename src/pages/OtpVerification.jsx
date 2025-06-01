 // import React, { useEffect, useRef, useState } from 'react'
// import { FaRegEyeSlash } from "react-icons/fa6";
// import { FaRegEye } from "react-icons/fa6";
// import toast from 'react-hot-toast';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import { Link, useLocation, useNavigate } from 'react-router-dom';

// const OtpVerification = () => {
//     const [data, setData] = useState(["","","","","",""])
//     const navigate = useNavigate()
//     const inputRef = useRef([])
//     const location = useLocation()

//     console.log("location",location)

//     useEffect(()=>{
//         if(!location?.state?.email){
//             navigate("/forgot-password")
//         }
//     },[])

//     const valideValue = data.every(el => el)

//     const handleSubmit = async(e)=>{
//         e.preventDefault()

//         try {
//             const response = await Axios({
//                 ...SummaryApi.forgot_password_otp_verification,
//                 data : {
//                     otp : data.join(""),
//                     email : location?.state?.email
//                 }
//             })
            
//             if(response.data.error){
//                 toast.error(response.data.message)
//             }

//             if(response.data.success){
//                 toast.success(response.data.message)
//                 setData(["","","","","",""])
//                 navigate("/reset-password",{
//                     state : {
//                         data : response.data,
//                         email : location?.state?.email
//                     }
//                 })
//             }

//         } catch (error) {
//             console.log('error',error)
//             AxiosToastError(error)
//         }



//     }

//     return (
//         <section className='w-full container mx-auto px-2'>
//             <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
//                 <p className='font-semibold text-lg'>Enter OTP</p>
//                 <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
//                     <div className='grid gap-1'>
//                         <label htmlFor='otp'>Enter Your OTP :</label>
//                         <div className='flex items-center gap-2 justify-between mt-3'>
//                             {
//                                 data.map((element,index)=>{
//                                     return(
//                                         <input
//                                             key={"otp"+index}
//                                             type='text'
//                                             id='otp'
//                                             ref={(ref)=>{
//                                                 inputRef.current[index] = ref
//                                                 return ref 
//                                             }}
//                                             value={data[index]}
//                                             onChange={(e)=>{
//                                                 const value =  e.target.value
//                                                 console.log("value",value)

//                                                 const newData = [...data]
//                                                 newData[index] = value
//                                                 setData(newData)

//                                                 if(value && index < 5){
//                                                     inputRef.current[index+1].focus()
//                                                 }


//                                             }}
//                                             maxLength={1}
//                                             className='bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold'
//                                         />
//                                     )
//                                 })
//                             }
//                         </div>
                        
//                     </div>
             
//                     <button disabled={!valideValue} className={` ${valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500" }    text-white py-2 rounded font-semibold my-3 tracking-wide`}>Verify OTP</button>

//                 </form>

//                 <p>
//                     Already have account? <Link to={"/login"} className='font-semibold text-green-700 hover:text-green-800'>Login</Link>
//                 </p>
//             </div>
//         </section>
//     )
// }

// export default OtpVerification


import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import defaultImage from '../assets/default.png';
import '../pages/OtpVerification.css';  



const OtpVerification = () => {
    const [data, setData] = useState(["", "", "", "", "", ""]);
    const inputRef = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location?.state?.email) {
            navigate("/forgot-password");
        }
    }, [location, navigate]);

    const valideValue = data.every(el => el);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data: {
                    otp: data.join(""),
                    email: location?.state?.email
                }
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setData(["", "", "", "", "", ""]);
                navigate("/reset-password", {
                    state: {
                        data: response.data,
                        email: location?.state?.email
                    }
                });
            }

        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <div className="OtpVerification-container">
               <div className="bg-left" />
               <div className="bg-right" />
               <div className="content">
            <div className="OtpVerification-box">
                <div className="OtpVerification-image">
                    <img src={defaultImage} alt="Illustration" />
                </div>
                <div className="OtpVerification-form-container">
                    <h1 className="OtpVerification-title">Farm To Spoon</h1>
                    <form onSubmit={handleSubmit} className="OtpVerification-form">
                        <div>
                            <label htmlFor="otp" className="input-label">Enter OTP</label>
                            <div className="flex gap-2 justify-between mt-2">
                                {
                                    data.map((value, index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            maxLength={1}
                                            ref={(ref) => inputRef.current[index] = ref}
                                            value={data[index]}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                const newData = [...data];
                                                newData[index] = val;
                                                setData(newData);

                                                if (val && index < 5) {
                                                    inputRef.current[index + 1]?.focus();
                                                }
                                            }}
                                          className="bg-white w-full max-w-12 p-2 border rounded outline-none focus:border-black text-center font-semibold"
                                        />
                                    ))
                                }
                            </div>
                        </div>

                        <button
                            disabled={!valideValue}
                            className={`w-full mt-6 text-white py-2 rounded-md transition-colors duration-200 border-none cursor-pointer ${
                                valideValue ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"
                            }`}
                        >
                            Verify OTP
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

export default OtpVerification;
