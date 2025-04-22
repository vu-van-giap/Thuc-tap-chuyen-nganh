import React from 'react';
import bannerImg from '../assets/images/tech-learning-banner.png';

const Banner = () => {
    return (
        <div className="flex flex-col md:flex-row-reverse py-16 px-6 justify-between items-center gap-12 bg-gray-50">
            {/* Image Section */}
            <div className="md:w-1/2 w-full flex items-center justify-center md:justify-end">
                <img
                    src={bannerImg}
                    alt="Illustration of IT learning resources"
                    className="max-w-full h-auto"
                />
            </div>

            {/* Text and CTA Section */}
            <div className="md:w-1/2 w-full text-center md:text-left">
                <h1 className="md:text-4xl text-2xl font-bold text-gray-800 mb-6">
                    Master IT Skills with Our Learning Repository
                </h1>
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Discover a wealth of resources tailored for IT students, including tutorials,
                    coding exercises, and e-books. Start your journey to becoming a tech expert
                    today!
                </p>
                <a
                    href="/register"
                    className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                    Get Started
                </a>
            </div>
        </div>
    );
};

export default Banner;