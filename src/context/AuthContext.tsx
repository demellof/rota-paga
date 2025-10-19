import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';
import { createUserProfileDocument } from '../services/firestore';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

// A interface agora é mais simples: não inclui mais userProfile.
interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    signup: (email: string, pass: string) => Promise<any>;
    login: (email: string, pass: string) => Promise<any>;
    logout: () => Promise<any>;
    signInWithGoogle: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
    currentUser: null,
    loading: true,
    signup: () => new Promise(() => {}),
    login: () => new Promise(() => {}),
    logout: () => new Promise(() => {}),
    signInWithGoogle: () => new Promise(() => {}),
});

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            // A criação do perfil ainda acontece aqui, mas o resultado não é armazenado no estado deste contexto.
            if (user) {
                try {
                    await createUserProfileDocument(user);
                } catch (error) {
                    console.error("Error creating profile document:", error);
                }
            }

            setLoading(false);
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