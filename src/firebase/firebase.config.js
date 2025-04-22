import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration using environment variables
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || 'your-api-key',
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || 'it-learning-repo.firebaseapp.com',
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || 'it-learning-repo',
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || 'it-learning-repo.appspot.com',
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || 'your-messaging-sender-id',
    appId: process.env.REACT_APP_FIREBASE_APP_ID || 'your-app-id',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);