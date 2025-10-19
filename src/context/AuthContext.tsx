import React, { createContext, useContext, useEffect, useState } from 'react';

// Mock user for testing purposes
const mockUser = {
    uid: 'test-user',
    email: 'test@example.com',
    displayName: 'Test User',
};

// Define the shape of the context data
interface AuthContextType {
    currentUser: typeof mockUser | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({ currentUser: null });

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<typeof mockUser | null>(null);

    // Simulate a logged-in user
    useEffect(() => {
        console.log('[MOCK] Setting mock user in AuthContext');
        setCurrentUser(mockUser);
    }, []);

    const value = {
        currentUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};