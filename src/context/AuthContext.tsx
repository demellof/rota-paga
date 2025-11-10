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
        const timeout = setTimeout(() => {
            if (loading) {
                console.warn("AuthContext: Timed out waiting for onAuthStateChanged. Forcing loading to false.");
                setLoading(false);
            }
        }, 5000);

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            clearTimeout(timeout);
            try {
                if (user) {
                    await createUserProfileDocument(user);
                    const profile = await getUserProfile(user.uid);
                    setUserProfile(profile);
                } else {
                    setUserProfile(null);
                }
                setCurrentUser(user);
            } catch (error) {
                console.error("Error during auth state change:", error);
                setCurrentUser(user);
                setUserProfile(null);
            } finally {
                setLoading(false);
            }
        });

        return () => {
            clearTimeout(timeout);
            unsubscribe();
        };
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
