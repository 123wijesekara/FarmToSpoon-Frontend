import React, { useState } from 'react';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import '../pages/Register.css';
import logo from '../assets/logof.png';  
import defaultImage from '../assets/default.png';  


const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
};


const Register = () => {
    //console.log ("phone",phone);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",  
        district: "",  
        role: "USER",  
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

  //  const valideValue = Object.values(data).every((el) => el);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
if(!validateEmail(data.email)){
    toast.error("Please enter valid email address");
    return;
}

if(!validatePassword(data.password)){
    toast.error("Please must be at least 6 characters and inlcude at least letter, number, and special character")
    return;
}
if (data.password !== data.confirmPassword) {
    toast.error("Password and confirm password must be the same.");
    return;
}
       

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: data,
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    phone: "",
                    district: "",
                    role: "USER",
                });
                navigate("/verify-email");
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className="register-container">
            <div className="register-left-side">
                <div className="logo-container">
                    <img src={logo} alt="Farm To Spoon Logo" className="logo" />
                </div>
               
                
                <div className="register-image">
                    <img src={defaultImage} alt="Farm produce" className="side-image" />
                </div>
            </div>
            
            <div className="register-form-container">
                <h2>Create Account</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name :</label>
                        <input
                            type="text"
                            id="name"
                            autoFocus
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email :</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone :</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="district">District :</label>
                        <input
                            type="text"
                            id="district"
                            name="district"
                            value={data.district}
                            onChange={handleChange}
                            placeholder="Enter your district"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password :</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                            />
                            <div onClick={() => setShowPassword((prev) => !prev)} className="password-toggle">
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password :</label>
                        <div className="password-input">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder="Enter your confirm password"
                            />
                            <div onClick={() => setShowConfirmPassword((prev) => !prev)} className="password-toggle">
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Role :</label>
                        <select
                            name="role"
                            value={data.role}
                            onChange={handleChange}
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FARMER">Farmer</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={handleSubmit}
                        className={`register-button ${handleSubmit ? "" : "disabled"}`}
                    >
                        Register
                    </button>
                </form>

                <p className="login-link">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </div>
        </section>
    );
};

export default Register;