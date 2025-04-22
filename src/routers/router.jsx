import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/home/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import ResourceDetails from '../pages/resources/ResourceDetails';
import SavedResources from '../pages/resources/SavedResources';
import Profile from '../pages/user/Profile';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import AdminLogin from '../components/AdminLogin';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import ManageResources from '../pages/dashboard/manageResources/ManageResources';
import AddResource from '../pages/dashboard/addResource/AddResource';
import UpdateResource from '../pages/dashboard/editResource/UpdateResource';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/saved-resources',
                element: <PrivateRoute><SavedResources /></PrivateRoute>,
            },
            {
                path: '/profile',
                element: <PrivateRoute><Profile /></PrivateRoute>,
            },
            {
                path: '/about',
                element: <h1 className="text-3xl font-bold text-center py-16">About</h1>,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/resources/:id',
                element: <ResourceDetails />,
            },
        ],
    },
    {
        path: '/admin/login',
        element: <AdminLogin />,
    },
    {
        path: '/dashboard',
        element: <AdminRoute><DashboardLayout /></AdminRoute>,
        children: [
            {
                path: '',
                element: <AdminRoute><Dashboard /></AdminRoute>,
            },
            {
                path: 'add-new-resource',
                element: <AdminRoute><AddResource /></AdminRoute>,
            },
            {
                path: 'edit-resource/:id',
                element: <AdminRoute><UpdateResource /></AdminRoute>,
            },
            {
                path: 'manage-resources',
                element: <AdminRoute><ManageResources /></AdminRoute>,
            },
        ],
    },
]);

export default router;