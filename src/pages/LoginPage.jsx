import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Typography, Form, Input, Button, Alert, Spin } from "antd";
import photo from '../assets/photoforlogin.png';
import toast, { Toaster } from 'react-hot-toast';



const LoginPage = ({ resource }) => {

    // console.log(resource);



    const [formData, setFormData] = useState({
        name: '',
        email: '',
        passsword: '',
    });
    const navigate = useNavigate(); // React Router's hook for navigation

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://sangam-c2fm.onrender.com/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });


            if (response.ok) {
                const data = await response.json();
                const uuser = data.data.user;
                localStorage.setItem('userRole', uuser.role);
                toast("Successfully Logged In...")
                // setUserRole(uuser.role);
                // alert('Form submitted successfully!');
                setFormData({ name: '', email: '', password: '' });
                console.log(formData);
                if (uuser.role === 'Officer') {
                    navigate('/dashboard');
                    // Redirect to Officer Dashboard
                } else if (uuser.role === 'Main Admin') {
                    navigate('/dashboard'); // Redirect to Admin Dashboard
                } else if (uuser.role === 'Worker') {
                    navigate('/dashboard'); // Redirect to User Dashboard
                } else {
                    alert('Unrecognized role');
                }




            } else {
                toast('Incorrect username or password.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl"
            >
                {/* Left Section with Image */}


                {/* Right Section with Inputs */}
                <div className="flex flex-col flex-1 p-10 space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Welcome Back</h2>
                    <p className="text-center text-gray-600">Please login to your account</p>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-gray-700 text-sm font-semibold mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-gray-700 text-sm font-semibold mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Login
                    </button>
                    <div className="text-center">
                        <p className="text-gray-600">Don't have an account?</p>
                        <button
                            type="button"
                            onClick={() => navigate('/register')}
                            className="mt-2 text-blue-600 font-semibold hover:underline focus:outline-none"
                        >
                            Create New Account
                        </button>
                    </div>
                </div>
                <div className="flex items-center justify-center bg-gray-100 p-5">
                    <img
                        src={photo}
                        alt="Login Illustration"
                        className="w-40 md:w-60"
                    />
                </div>
            </form>
        </div>

    );
};

export default LoginPage;
