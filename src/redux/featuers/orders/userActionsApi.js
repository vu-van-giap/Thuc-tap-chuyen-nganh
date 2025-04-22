import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase.config';

export const userActionsApi = createApi({
    reducerPath: 'userActionsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['UserActions'],
    endpoints: (builder) => ({
        saveResource: builder.mutation({
            async queryFn({ userId, resource }) {
                try {
                    const docRef = await addDoc(collection(db, 'users', userId, 'savedResources'), resource);
                    return { data: { id: docRef.id, ...resource } };
                } catch (error) {
                    return { error: { status: 'CREATE_ERROR', error: error.message } };
                }
            },
            invalidatesTags: ['UserActions'],
            // REST API fallback
            /*
            query: (newAction) => ({
                url: '/',
                method: 'POST',
                body: newAction,
                credentials: 'include',
            }),
            */
        }),
        getUserResources: builder.query({
            async queryFn({ userId }) {
                try {
                    const q = query(collection(db, 'users', userId, 'savedResources'));
                    const querySnapshot = await getDocs(q);
                    const resources = querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    return { data: resources };
                } catch (error) {
                    return { error: { status: 'FETCH_ERROR', error: error.message } };
                }
            },
            providesTags: ['UserActions'],
            // REST API fallback
            /*
            query: (email) => ({
                url: `/email/${email}`,
                credentials: 'include',
            }),
            */
        }),
    }),
});

export const { useSaveResourceMutation, useGetUserResourcesQuery } = userActionsApi;

export default userActionsApi;