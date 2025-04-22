// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { FiBookmark } from 'react-icons/fi';

const Navbar = () => {
    const { currentUser, auth } = useAuth(); // Destructure auth
    const savedResourcesCount = useSelector(
        (state) => state.collection.items.length
    );

    const handleLogout = async () => {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">
                    IT Learning Hub
                </Link>
                <div className="flex items-center space-x-4">
                    <Link to="/" className="hover:text-gray-200">
                        Home
                    </Link>
                    <Link to="/resources" className="hover:text-gray-200">
                        Resources
                    </Link>
                    {currentUser ? (
                        <>
                            <Link
                                to="/saved-resources"
                                className="flex items-center hover:text-gray-200"
                            >
                                <FiBookmark className="mr-1" />
                                Saved ({savedResourcesCount})
                            </Link>
                            <Link
                                to="/profile"
                                className="hover:text-gray-200"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="hover:text-gray-200"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-gray-200">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="hover:text-gray-200"
                                >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;