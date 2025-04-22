import React from 'react';
import footerLogo from '../assets/images/it-learning-logo.png';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12 px-6">
            {/* Top Section */}
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
                {/* Left Side - Logo and Navigation */}
                <div className="w-full md:w-1/2">
                    <img
                        src={footerLogo}
                        alt="IT Learning Repository Logo"
                        className="mb-6 w-40"
                    />
                    <ul className="flex flex-col md:flex-row gap-4">
                        <li>
                            <a href="/" className="hover:text-blue-400 transition-colors">
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/resources"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Resources
                            </a>
                        </li>
                        <li>
                            <a
                                href="/tutorials"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Tutorials
                            </a>
                        </li>
                        <li>
                            <a
                                href="/contact"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Right Side - Newsletter */}
                <div className="w-full md:w-1/2">
                    <h3 className="text-lg font-semibold mb-4">
                        Stay Updated with New Learning Materials
                    </h3>
                    <p className="mb-4 text-gray-300">
                        Subscribe to our newsletter for the latest tutorials, resources, and IT news!
                    </p>
                    <form className="flex" aria-label="Newsletter subscription">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full px-4 py-2 rounded-l-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Email address"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 px-6 py-2 rounded-r-md hover:bg-blue-700 transition-colors"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-600 pt-6">
                {/* Left Side - Copyright and Privacy Links */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-0 text-center md:text-left">
                    <p className="text-gray-400">
                        &copy; {new Date().getFullYear()} IT Learning Repository. All rights
                        reserved.
                    </p>
                    <ul className="flex gap-4">
                        <li>
                            <a
                                href="/privacy"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a
                                href="/terms"
                                className="hover:text-blue-400 transition-colors"
                            >
                                Terms of Service
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Right Side - Social Icons */}
                <div className="flex gap-6">
                    <a
                        href="https://facebook.com/itlearningrepo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                        aria-label="Follow us on Facebook"
                    >
                        <FaFacebook size={24} />
                    </a>
                    <a
                        href="https://twitter.com/itlearningrepo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                        aria-label="Follow us on Twitter"
                    >
                        <FaTwitter size={24} />
                    </a>
                    <a
                        href="https://linkedin.com/company/itlearningrepo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-400 transition-colors"
                        aria-label="Connect with us on LinkedIn"
                    >
                        <FaLinkedin size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;