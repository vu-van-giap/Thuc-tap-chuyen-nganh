import React from 'react';
import { FiBookmark } from 'react-icons/fi';
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCollection } from '../../redux/features/Collection/collectionSlice';

const ResourceCard = ({ resource }) => {
    const dispatch = useDispatch();

    const handleAddToCollection = (resource) => {
        dispatch(addToCollection(resource));
    };

    return (
        <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
            <div className="flex flex-col sm:flex-row sm:items-center sm:h-64 sm:justify-center gap-4 p-4">
                <div className="sm:h-64 sm:flex-shrink-0 border rounded-md overflow-hidden">
                    <Link to={`/resources/${resource._id}`}>
                        <img
                            src={getImgUrl(resource?.thumbnail)}
                            alt={resource?.title}
                            className="w-full h-40 sm:h-full object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
                        />
                    </Link>
                </div>

                <div className="flex-1">
                    <Link to={`/resources/${resource._id}`}>
                        <h3 className="text-xl font-semibold hover:text-blue-600 mb-2">
                            {resource?.title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                        {resource?.description}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                        Category: <span className="font-medium">{resource?.category}</span>
                    </p>
                    <a
                        href={resource?.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm mb-4 inline-block"
                    >
                        View Resource
                    </a>
                    <button
                        onClick={() => handleAddToCollection(resource)}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition-colors duration-200"
                    >
                        <FiBookmark />
                        <span>Add to Collection</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResourceCard;