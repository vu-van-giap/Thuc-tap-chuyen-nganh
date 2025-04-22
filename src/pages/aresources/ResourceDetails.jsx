import React from 'react';
import { FiBookmark } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchResourceByIdQuery } from '../../redux/features/Resources/resourcesApi';
import { useSaveResourceMutation } from '../../redux/features/UserActions/userActionsApi';
import { addToCollection } from '../../redux/features/Collection/collectionSlice';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const ResourceDetails = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const dispatch = useDispatch();
    const collectionItems = useSelector((state) => state.collection.items);
    const { data: resource, isLoading, isError } = useFetchResourceByIdQuery(id);
    const [saveResource] = useSaveResourceMutation();

    const handleSaveResource = async (resource) => {
        try {
            dispatch(addToCollection(resource));
            if (currentUser) {
                await saveResource({ userId: currentUser.uid, resource }).unwrap();
                Swal.fire({
                    title: 'Saved!',
                    text: 'Resource added to your collection.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
            } else {
                Swal.fire({
                    title: 'Saved Locally',
                    text: 'Resource saved locally. Log in to sync with your account.',
                    icon: 'info',
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } catch (error) {
            console.error('Error saving resource:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to save resource. Please try again.',
                icon: 'error',
                timer: 2000,
                showConfirmButton: false,
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-gray-600 text-lg" aria-live="polite">
                    Loading...
                </div>
            </div>
        );
    }

    if (isError || !resource) {
        return (
            <div className="text-center text-red-600 py-16" aria-live="assertive">
                Error loading resource details
            </div>
        );
    }

    const isSaved = collectionItems.some((item) => item._id === resource._id);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                {resource.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={resource.thumbnail || 'https://via.placeholder.com/400'}
                        alt={resource.title}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <div className="mb-6">
                        <p className="text-gray-700 mb-3">
                            <strong>Category:</strong>{' '}
                            <span className="capitalize">{resource.category}</span>
                        </p>
                        <p className="text-gray-700 mb-3">
                            <strong>Type:</strong> {resource.type || 'Resource'}
                        </p>
                        <p className="text-gray-700 mb-3">
                            <strong>Added:</strong>{' '}
                            {new Date(resource.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 mb-3">
                            <strong>Description:</strong> {resource.description}
                        </p>
                        <p className="text-gray-700">
                            <strong>Link:</strong>{' '}
                            <a
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Access Resource
                            </a>
                        </p>
                    </div>

                    <button
                        onClick={() => handleSaveResource(resource)}
                        disabled={isSaved}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
                            isSaved
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        aria-label={
                            isSaved
                                ? 'Resource already saved'
                                : 'Save resource to collection'
                        }
                    >
                        <FiBookmark className="w-5 h-5" />
                        <span>{isSaved ? 'Saved' : 'Save Resource'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResourceDetails;