import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';
import { useGetUserResourcesQuery } from '../../redux/features/UserActions/userActionsApi';

const ResourceAccessPage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const localResources = useSelector((state) => state.collection.items);
    const { data: firebaseResources, isLoading } = useGetUserResourcesQuery(
        { userId: currentUser?.uid },
        { skip: !currentUser }
    );
    const resources = firebaseResources || localResources;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [isChecked, setIsChecked] = useState(false);

    const onSubmit = async (data) => {
        try {
            // Update user profile in Firestore
            await setDoc(
                doc(db, 'users', currentUser.uid),
                {
                    name: data.name,
                    phone: data.phone,
                    email: currentUser.email,
                    updatedAt: new Date().toISOString(),
                },
                { merge: true }
            );

            // Optional: Ensure all local resources are saved to Firestore
            /*
            const { saveResource } = useSaveResourceMutation();
            for (const resource of localResources) {
                await saveResource({ userId: currentUser.uid, resource });
            }
            */

            Swal.fire({
                title: 'Profile Updated',
                text: 'Your profile has been updated, and resources are accessible!',
                icon: 'success',
                showConfirmButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'View Saved Resources',
            }).then(() => {
                navigate('/saved-resources');
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to update profile. Please try again.',
                icon: 'error',
                confirmButtonColor: '#d33',
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

    return (
        <section className="min-h-screen p-6 bg-gray-50 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div>
                    <h2 className="font-semibold text-xl text-gray-600 mb-2">Confirm Resource Access</h2>
                    <p className="text-gray-500 mb-2">Saved Resources: {resources.length}</p>
                    <p className="text-gray-500 mb-6">
                        Update your profile to access your saved resources.
                    </p>

                    <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
                        >
                            <div className="text-gray-600">
                                <p className="font-medium text-lg">Profile Details</p>
                                <p>Please fill out all required fields.</p>
                            </div>

                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            {...register('name', { required: 'Name is required' })}
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            aria-invalid={errors.name ? 'true' : 'false'}
                                        />
                                        {errors.name && (
                                            <p className="text-red-600 text-xs mt-1">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            disabled
                                            defaultValue={currentUser?.email}
                                            aria-disabled="true"
                                        />
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            {...register('phone', {
                                                required: 'Phone number is required',
                                            })}
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder="+123 456 7890"
                                            aria-invalid={errors.phone ? 'true' : 'false'}
                                        />
                                        {errors.phone && (
                                            <p className="text-red-600 text-xs mt-1">
                                                {errors.phone.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-5 mt-3">
                                        <div className="inline-flex items-center">
                                            <input
                                                type="checkbox"
                                                name="terms"
                                                id="terms"
                                                className="form-checkbox"
                                                onChange={(e) => setIsChecked(e.target.checked)}
                                                aria-required="true"
                                            />
                                            <label htmlFor="terms" className="ml-2">
                                                I agree to the{' '}
                                                <Link
                                                    to="/terms"
                                                    className="underline underline-offset-2 text-blue-600 hover:text-blue-700"
                                                >
                                                    Terms & Conditions
                                                </Link>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="md:col-span-5 text-right">
                                        <button
                                            type="submit"
                                            disabled={!isChecked}
                                            className={`bg-blue-600 text-white font-bold py-2 px-4 rounded transition-all duration-200 ${
                                                !isChecked
                                                    ? 'opacity-50 cursor-not-allowed'
                                                    : 'hover:bg-blue-700'
                                            }`}
                                            aria-label="Confirm resource access"
                                        >
                                            Confirm Access
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResourceAccessPage;