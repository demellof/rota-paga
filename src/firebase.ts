import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// IMPORTANT: These environment variables need to be set up in your hosting environment
// and in a .env.local file for local development.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// NOTE FOR USER: For this to work, you need to:
// 1. Create a `.env.local` file in the root of the project.
// 2. Add your Firebase project credentials to it, like this:
//    VITE_FIREBASE_API_KEY=your_api_key
//    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
//    ...and so on for all the keys.
// 3. In your Firebase Console, go to Authentication -> Sign-in method and
//    enable "Email/Password" and "Google" as sign-in providers.
