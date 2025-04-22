import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase.config';

const AdminRoute = ({ children }) => {
    const { currentUser } = useAuth();
    const [isAdmin, setIsAdmin] = useState(null); // null = loading, true/false = resolved

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (!currentUser) {
                setIsAdmin(false);
                return;
            }

            try {
                // Check Firestore for admin role
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                const isAdminUser = userDoc.exists() && userDoc.data().role === 'admin';
                setIsAdmin(isAdminUser);

                // Alternative: Use custom claims
                /*
                const tokenResult = await currentUser.getIdTokenResult();
                setIsAdmin(!!tokenResult.claims.admin);
                */
            } catch (error) {
                console.error('Error checking admin status:', error);
                setIsAdmin(false);
            }
        };

        checkAdminStatus();
    }, [currentUser]);

    // Show loading state while checking admin status
    if (isAdmin === null) {
        return <div className="text-center py-16 text-gray-600">Loading...</div>;
    }

    // Redirect to admin login if not authenticated or not an admin
    if (!currentUser || !isAdmin) {
        return <Navigate to="/admin/login" replace />;
    }

    // Render children or Outlet for nested routes
    return children ? children : <Outlet />;
};

export default AdminRoute;