// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from './features/Collection/collectionSlice';
import resourcesApi from './features/Resources/resourcesApi';
import userActionsApi from './features/UserActions/userActionsApi';

export const store = configureStore({
    reducer: {
        collection: collectionReducer,
        [resourcesApi.reducerPath]: resourcesApi.reducer,
        [userActionsApi.reducerPath]: userActionsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            resourcesApi.middleware,
            userActionsApi.middleware
        ),
});