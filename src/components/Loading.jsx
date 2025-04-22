import React from 'react';

const Loading = () => {
    return (
        <div
            className="flex justify-center items-center h-screen bg-gray-100"
            role="status"
            aria-live="polite"
            aria-label="Loading content"
        >
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 border-solid"></div>
        </div>
    );
};

export default Loading;