import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';
import { UserProfile, createUserProfileDocument, getUserProfile } from '../services/firestore';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

// Define the shape of the context data
interface AuthContextType {
    currentUser: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    signup: (email: string, pass: string) => Promise<any>;
    login: (email: string, pass: string) => Promise<any>;
    logout: () => Promise<any>;
    signInWithGoogle: () => Promise<any>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    userProfile: null,
    loading: true,
    signup: () => new Promise(() => {}),
    login: () => new Promise(() => {}),
    logout: () => new Promise(() => {}),
    signInWithGoogle: () => new Promise(() => {}),
});

// Custom hook to use the auth context easily in other components
export function useAuth() {
    return useContext(AuthContext);
}

// Create the provider component
interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    // If the user is logged in, create/get their profile from Firestore
                    await createUserProfileDocument(user);
                    const profile = await getUserProfile(user.uid);
                    setUserProfile(profile);
                } else {
                    // If the user is logged out, clear the profile
                    setUserProfile(null);
                }
                setCurrentUser(user);
            } catch (error) {
                console.error("Error during auth state change:", error);
                // In case of an error (e.g., Firestore rules, network issue),
                // set user and profile to null to avoid an inconsistent state.
                setUserProfile(null);
                setCurrentUser(null);
            } finally {
                // VERY IMPORTANT: Always set loading to false, even if there's an error.
                // This prevents the app from getting stuck on the loading screen.
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);

    function signup(email: string, pass: string) {
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    function login(email: string, pass: string) {
        return signInWithEmailAndPassword(auth, email, pass);
    }

    function logout() {
        return signOut(auth);
    }

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    const value = {
        currentUser,
        userProfile,
        loading,
        signup,
        login,
        logout,
        signInWithGoogle,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
