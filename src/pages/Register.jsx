import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
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

const DISTRIBUTION_LOCATIONS = [
    "Katubedda",
    "Rawatawatta",
    "Egoda Uyana",
    "Lunawa",
    "Koralawella",
    "Ratmalana",
    "Moratuwa City"
];

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",  
        district: "",   // now compulsory text field
        address_line: "",  
        role: "USER",  
        distribution_location: "" // only if farmer
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!validateEmail(data.email)){
            toast.error("Please enter valid email address");
            return;
        }

        if(!validatePassword(data.password)){
            toast.error("Password must be at least 6 characters and include at least one letter, number, and special character");
            return;
        }

        if (data.password !== data.confirmPassword) {
            toast.error("Password and confirm password must match");
            return;
        }

        if (!data.district.trim()) {
            toast.error("District is required");
            return;
        }

        if (data.role === "FARMER" && !data.distribution_location) {
            toast.error("Please select a distribution location");
            return;
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: data,
            });

            if (response.data.error) {
                toast.error(response.data.message);
                return;
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
                    address_line: "",
                    role: "USER",
                    distribution_location: ""
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
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            autoFocus
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="district">District:</label>
                        <input
                            type="text"
                            id="district"
                            name="district"
                            value={data.district}
                            onChange={handleChange}
                            placeholder="Enter your district"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address_line">Address Line:</label>
                        <input
                            type="text"
                            id="address_line"
                            name="address_line"
                            value={data.address_line}
                            onChange={handleChange}
                            placeholder="Street address, building, etc."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <div className="password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <div className="password-input">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm your password"
                                required
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(prev => !prev)}
                            >
                                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                            </button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Role:</label>
                        <select
                            id="role"
                            name="role"
                            value={data.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="FARMER">Farmer</option>
                        </select>
                    </div>

                    {data.role === "FARMER" && (
                        <div className="form-group">
                            <label htmlFor="distribution_location">Distribution Location:</label>
                            <select
                                id="distribution_location"
                                name="distribution_location"
                                value={data.distribution_location}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select distribution location</option>
                                {DISTRIBUTION_LOCATIONS.map(loc => (
                                    <option key={loc} value={loc}>
                                        {loc}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="register-button"
                    >
                        Register
                    </button>
                </form>

                <p className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
