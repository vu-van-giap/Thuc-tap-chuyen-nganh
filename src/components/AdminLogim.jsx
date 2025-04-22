import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getBaseUrl from '../utils/baseURL';

const AdminLogin = () => {
    const [message, setMessage] = useState('');
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const auth = response.data;
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert('Session expired. Please log in again.');
                    navigate('/admin');
                }, 3600 * 1000);
                alert('Login successful!');
                navigate('/admin/dashboard');
            }
        } catch (error) {
            setMessage('Invalid username or password');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg px-8 pt-6 pb-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    IT Learning Repository - Admin Login
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            {...register('username', { required: 'Username is required' })}
                            type="text"
                            id="username"
                            placeholder="Enter username"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-invalid={errors.username ? 'true' : 'false'}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label
                            className="block text-gray-700 text-sm font-semibold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            {...register('password', { required: 'Password is required' })}
                            type="password"
                            id="password"
                            placeholder="Enter password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-invalid={errors.password ? 'true' : 'false'}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {message && (
                        <p className="text-red-500 text-sm text-center mb-4">{message}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Log In
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500 text-sm">
                    © 2025 IT Learning Repository. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;