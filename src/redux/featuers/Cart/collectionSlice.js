import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const initialState = {
    items: [],
};

const collectionSlice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        addToCollection: (state, action) => {
            const existingItem = state.items.find((item) => item._id === action.payload._id);
            if (!existingItem) {
                state.items.push(action.payload);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Resource Saved to Collection',
                    showConfirmButton: false,
                    timer: 1500,
                });
                // Optional: Persist to Firestore for logged-in users
                /*
                import { doc, setDoc } from 'firebase/firestore';
                import { db } from '../../firebase/firebase.config';
                const userId = action.payload.userId; // Assuming userId is passed
                setDoc(doc(db, 'users', userId, 'collection', action.payload._id), action.payload);
                */
            } else {
                Swal.fire({
                    title: 'Resource Already Saved',
                    text: 'This resource is already in your collection!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK',
                });
            }
        },
        removeFromCollection: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload._id);
            // Optional: Remove from Firestore
            /*
            import { doc, deleteDoc } from 'firebase/firestore';
            import { db } from '../../firebase/firebase.config';
            const userId = action.payload.userId; // Assuming userId is passed
            deleteDoc(doc(db, 'users', userId, 'collection', action.payload._id));
            */
        },
        clearCollection: (state) => {
            state.items = [];
            // Optional: Clear Firestore collection
            /*
            import { collection, getDocs, deleteDoc } from 'firebase/firestore';
            import { db } from '../../firebase/firebase.config';
            const userId = state.userId; // Assuming userId is stored
            const querySnapshot = await getDocs(collection(db, 'users', userId, 'collection'));
            querySnapshot.forEach((doc) => deleteDoc(doc.ref));
            */
        },
    },
});

export const { addToCollection, removeFromCollection, clearCollection } = collectionSlice.actions;
export default collectionSlice.reducer;