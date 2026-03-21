import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

// --- User Profile ---

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    subscription?: {
        status: 'active' | 'inactive';
        tier: 'premium';
    };
}

/**
 * Creates a user profile document in Firestore if it doesn't already exist.
 * @param user The Firebase Auth user object.
 */
export const createUserProfileDocument = async (user: User): Promise<void> => {
    const userDocRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userDocRef);
    if (!docSnap.exists()) {
        const userProfile: UserProfile = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            subscription: {
                status: 'inactive',
                tier: 'premium',
            },
        };
        await setDoc(userDocRef, userProfile);
    }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
    }
    return null;
};


// --- Jornada Progress ---

const JORNADA_PROGRESS_COLLECTION = 'jornada_progress';

export interface JornadaProgress {
    completedSteps: Record<number, boolean>;
}

export const updateJornadaProgress = async (
    userId: string,
    etapa: number,
    isCompleted: boolean
): Promise<void> => {
    const progressDocRef = doc(db, 'users', userId, JORNADA_PROGRESS_COLLECTION, 'main');
    await setDoc(
        progressDocRef,
        {
            completedSteps: {
                [etapa]: isCompleted,
            },
        },
        { merge: true }
    );
};

export const getJornadaProgress = async (
    userId: string
): Promise<JornadaProgress | null> => {
    const progressDocRef = doc(db, 'users', userId, JORNADA_PROGRESS_COLLECTION, 'main');
    const docSnap = await getDoc(progressDocRef);

    if (docSnap.exists()) {
        return docSnap.data() as JornadaProgress;
    } else {
        return null;
    }
};
