import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearCollection, removeFromCollection } from '../../redux/features/Collection/collectionSlice';
import { useGetUserResourcesQuery } from '../../redux/features/UserActions/userActionsApi';
import { useAuth } from '../../context/AuthContext';

const SavedResourcesPage = () => {
    const { currentUser } = useAuth();
    const dispatch = useDispatch();
    const localResources = useSelector((state) => state.collection.items);
    const { data: firebaseResources, isLoading } = useGetUserResourcesQuery(
        { userId: currentUser?.uid },
        { skip: !currentUser } // Skip query if not authenticated
    );

    // Use Firebase resources if available, else fall back to local state
    const resources = firebaseResources || localResources;

    const handleRemoveFromCollection = (resource) => {
        dispatch(removeFromCollection(resource));
        // Optional: Sync with Firestore
        /*
        if (currentUser) {
            import { doc, deleteDoc } from 'firebase/firestore';
            import { db } from '../../firebase/firebase.config';
            deleteDoc(doc(db, 'users', currentUser.uid, 'savedResources', resource._id));
        }
        */
    };

    const handleClearCollection = () => {
        dispatch(clearCollection());
        // Optional: Sync with Firestore
        /*
        if (currentUser) {
            import { collection, getDocs, deleteDoc } from 'firebase/firestore';
            import { db } from '../../firebase/firebase.config';
            const querySnapshot = getDocs(collection(db, 'users', currentUser.uid, 'savedResources'));
            querySnapshot.forEach((doc) => deleteDoc(doc.ref));
        }
        */
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                <div className="px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                        <h2 className="text-lg font-medium text-gray-900">Saved Resources</h2>
                        {resources.length > 0 && (
                            <button
                                onClick={handleClearCollection}
                                className="ml-3 py-1 px-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-200"
                                aria-label="Clear all saved resources"
                            >
                                Clear Collection
                            </button>
                        )}
                    </div>

                    <div className="mt-8">
                        {isLoading ? (
                            <p className="text-center text-gray-600">Loading...</p>
                        ) : resources.length > 0 ? (
                            <ul role="list" className="divide-y divide-gray-200">
                                {resources.map((resource) => (
                                    <li key={resource._id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={resource.thumbnail || 'https://via.placeholder.com/96'}
                                                alt={resource.title}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <Link to={`/resources/${resource._id}`}>
                                                            {resource.title}
                                                        </Link>
                                                    </h3>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500 capitalize">
                                                    <strong>Category: </strong>{resource.category}
                                                </p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <p className="text-gray-500">
                                                    <strong>Type: </strong>{resource.type || 'Resource'}
                                                </p>
                                                <button
                                                    onClick={() => handleRemoveFromCollection(resource)}
                                                    className="font-medium text-blue-600 hover:text-blue-500"
                                                    aria-label={`Remove ${resource.title} from collection`}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-600">
                                No resources saved yet.{' '}
                                <Link to="/" className="text-blue-600 hover:underline">
                                    Browse resources
                                </Link>
                            </p>
                        )}
                    </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <Link to="/">
                            Continue Browsing
                            <span className="ml-1 text-blue-600 hover:text-blue-500" aria-hidden="true">
                                →
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedResourcesPage;