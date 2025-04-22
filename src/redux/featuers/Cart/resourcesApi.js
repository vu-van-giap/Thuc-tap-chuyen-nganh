import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL'; // Verify this utility exists

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/resources`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('token') || getState().auth?.token;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const resourcesApi = createApi({
    reducerPath: 'resourcesApi',
    baseQuery,
    tagTypes: ['Resources'],
    endpoints: (builder) => ({
        fetchAllResources: builder.query({
            query: () => ({
                url: '/',
                credentials: 'include',
            }),
            providesTags: ['Resources'],
            // Alternative: Firestore implementation
            /*
            queryFn: async () => {
                try {
                    const { collection, getDocs } = await import('firebase/firestore');
                    const { db } = await import('../../firebase/firebase.config');
                    const querySnapshot = await getDocs(collection(db, 'resources'));
                    const resources = querySnapshot.docs.map((doc) => ({
                        _id: doc.id,
                        ...doc.data(),
                    }));
                    return { data: resources };
                } catch (error) {
                    return { error: { status: 'FETCH_ERROR', error: error.message } };
                }
            },
            */
        }),
        fetchResourceById: builder.query({
            query: (id) => ({
                url: `/${id}`,
                credentials: 'include',
            }),
            providesTags: (result, error, id) => [{ type: 'Resources', id }],
            // Alternative: Firestore implementation
            /*
            queryFn: async (id) => {
                try {
                    const { doc, getDoc } = await import('firebase/firestore');
                    const { db } = await import('../../firebase/firebase.config');
                    const docRef = doc(db, 'resources', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        return { data: { _id: docSnap.id, ...docSnap.data() } };
                    }
                    return { error: { status: 'NOT_FOUND', error: 'Resource not found' } };
                } catch (error) {
                    return { error: { status: 'FETCH_ERROR', error: error.message } };
                }
            },
            */
        }),
        addResource: builder.mutation({
            query: (newResource) => ({
                url: '/create-resource',
                method: 'POST',
                body: newResource,
                credentials: 'include',
            }),
            invalidatesTags: ['Resources'],
            // Alternative: Firestore implementation
            /*
            queryFn: async (newResource) => {
                try {
                    const { collection, addDoc } = await import('firebase/firestore');
                    const { db } = await import('../../firebase/firebase.config');
                    const docRef = await addDoc(collection(db, 'resources'), newResource);
                    return { data: { _id: docRef.id, ...newResource } };
                } catch (error) {
                    return { error: { status: 'CREATE_ERROR', error: error.message } };
                }
            },
            */
        }),
        updateResource: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: 'PUT',
                body: rest,
                credentials: 'include',
            }),
            invalidatesTags: ['Resources'],
            // Alternative: Firestore implementation
            /*
            queryFn: async ({ id, ...rest }) => {
                try {
                    const { doc, updateDoc } = await import('firebase/firestore');
                    const { db } = await import('../../firebase/firebase.config');
                    const docRef = doc(db, 'resources', id);
                    await updateDoc(docRef, rest);
                    return { data: { _id: id, ...rest } };
                } catch (error) {
                    return { error: { status: 'UPDATE_ERROR', error: error.message } };
                }
            },
            */
        }),
        deleteResource: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Resources'],
            // Alternative: Firestore implementation
            /*
            queryFn: async (id) => {
                try {
                    const { doc, deleteDoc } = await import('firebase/firestore');
                    const { db } = await import('../../firebase/firebase.config');
                    const docRef = doc(db, 'resources', id);
                    await deleteDoc(docRef);
                    return { data: id };
                } catch (error) {
                    return { error: { status: 'DELETE_ERROR', error: error.message } };
                }
            },
            */
        }),
    }),
});

export const {
    useFetchAllResourcesQuery,
    useFetchResourceByIdQuery,
    useAddResourceMutation,
    useUpdateResourceMutation,
    useDeleteResourceMutation,
} = resourcesApi;

export default resourcesApi;