import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiBars3CenterLeft } from 'react-icons/hi2';
import { IoSearchSharp } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa';
import avatarImg from '../assets/images/user-avatar.png';
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
const avatar = 'https://via.placeholder.com/150';



const navigation = [
    { name: 'Profile', href: '/profile' },
    { name: 'Saved Resources', href: '/saved-resources' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Admin Dashboard', href: '/admin/dashboard' },
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const savedResources = useSelector((state) => state.collection.items);
    const { currentUser, logout } = useAuth();

    const handleLogOut = () => {
        logout();
        setIsDropdownOpen(false);
    };

    return (
        <header className="max-w-screen-2xl mx-auto px-6 py-4 bg-white shadow-md">
            <nav className="flex justify-between items-center">
                {/* Left Side */}
                <div className="flex items-center md:gap-12 gap-4">
                    <Link to="/" aria-label="Toggle menu">
                        <HiBars3CenterLeft className="w-6 h-6 text-gray-800 hover:text-blue-600 transition-colors" />
                    </Link>

                    {/* Search Input */}
                    <div className="relative sm:w-80 w-48">
                        <IoSearchSharp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search resources..."
                            className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            aria-label="Search learning resources"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center md:gap-6 gap-3">
                    {currentUser ? (
                        <>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                aria-label="User menu"
                                className="focus:outline-none"
                            >
                                <img
                                    src={avatarImg}
                                    alt={currentUser.displayName || 'User avatar'}
                                    className="w-8 h-8 rounded-full ring-2 ring-blue-600"
                                />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                                    <ul className="py-2">
                                        {navigation.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    to={item.href}
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {item.name}
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <button
                                                onClick={handleLogOut}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Log Out
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <Link to="/login" aria-label="Log in">
                            <FaRegUser className="w-6 h-6 text-gray-800 hover:text-blue-600 transition-colors" />
                        </Link>
                    )}

                    <Link
                        to="/saved-resources"
                        className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors"
                        aria-label={`View saved resources (${savedResources.length})`}
                    >
                        <FaRegBookmark className="w-5 h-5" />
                        <span className="text-sm font-semibold ml-1">
                            {savedResources.length}
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;