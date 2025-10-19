// --- MOCK DATABASE FOR TESTING ---
const mockDb = {
    users: {
        // This is the hardcoded user ID from the mocked AuthContext.
        'test-user': {
            uid: 'test-user',
            email: 'test@example.com',
            displayName: 'Test User',
            subscription: { status: 'active', tier: 'premium' },
            favoriteArchetypes: [], // Start with no favorites
            // @ts-ignore
            sigils: [], // Add sigils subcollection for the mock user
        }
    }
};
// --- END MOCK DATABASE ---


// --- User Profile ---

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    subscription?: {
        status: 'active' | 'inactive';
        tier: 'premium';
    };
    favoriteArchetypes?: string[];
}

export const createUserProfileDocument = async (user: any): Promise<void> => {
    const { doc, getDoc, setDoc } = await import('firebase/firestore');
    const { db } = await import('../firebase');

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
            favoriteArchetypes: [],
        };
        await setDoc(userDocRef, userProfile);
    }
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    // --- MOCK LOGIC ---
    // Now responds to the correct user ID from the mocked context.
    if (userId === 'test-user') {
        console.log('[MOCK] Getting user profile for test-user');
        await new Promise(resolve => setTimeout(resolve, 100));
        return mockDb.users['test-user'] as UserProfile;
    }
    // --- END MOCK LOGIC ---

    const { doc, getDoc } = await import('firebase/firestore');
    const { db } = await import('../firebase');
    const userDocRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
        return docSnap.data() as UserProfile;
    }
    return null;
};

export const updateDocument = async (collection: string, docId: string, data: any): Promise<void> => {
    // --- MOCK LOGIC ---
    if (collection === 'users' && docId === 'test-user') {
        console.log('[MOCK] Updating user favorites for test-user', data.favoriteArchetypes);
        mockDb.users['test-user'].favoriteArchetypes = data.favoriteArchetypes;
        await new Promise(resolve => setTimeout(resolve, 100));
        return;
    }
    // --- END MOCK LOGIC ---

    const { doc, updateDoc } = await import('firebase/firestore');
    const { db } = await import('../firebase');
    const docRef = doc(db, collection, docId);
    await updateDoc(docRef, data);
}


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
    const { doc, setDoc } = await import('firebase/firestore');
    const { db } = await import('../firebase');
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
    const { doc, getDoc } = await import('firebase/firestore');
    const { db } = await import('../firebase');
    const progressDocRef = doc(db, 'users', userId, JORNADA_PROGRESS_COLLECTION, 'main');
    const docSnap = await getDoc(progressDocRef);

    if (docSnap.exists()) {
        return docSnap.data() as JornadaProgress;
    } else {
        return null;
    }
};

// --- Sigil Forge ---

export interface Sigil {
    id: string;
    intention: string;
    planet: string;
    imageUrl: string;
    createdAt: any; // Firestore Timestamp
}

export const saveSigil = async (userId: string, sigilData: Omit<Sigil, 'id' | 'createdAt'>): Promise<void> => {
    // --- MOCK LOGIC ---
    if (userId === 'test-user') {
        const newSigil = {
            ...sigilData,
            id: `sigil-${Date.now()}`,
            createdAt: { toDate: () => new Date() },
        };
        console.log('[MOCK] Saving sigil for test-user', newSigil);
        // @ts-ignore
        mockDb.users['test-user'].sigils.push(newSigil);
        await new Promise(resolve => setTimeout(resolve, 100));
        return;
    }
    // --- END MOCK LOGIC ---

    const { addDoc, collection, serverTimestamp } = await import('firebase/firestore');
    const { db } = await import('../firebase');
    const sigilsCollectionRef = collection(db, 'users', userId, 'sigils');
    await addDoc(sigilsCollectionRef, {
        ...sigilData,
        createdAt: serverTimestamp(),
    });
};

export const getUserSigils = async (userId: string): Promise<Sigil[]> => {
    // --- MOCK LOGIC ---
    if (userId === 'test-user') {
        console.log('[MOCK] Getting sigils for test-user');
        await new Promise(resolve => setTimeout(resolve, 100));
        // @ts-ignore
        return mockDb.users['test-user'].sigils as Sigil[];
    }
    // --- END MOCK LOGIC ---

    const { collection, getDocs, query, orderBy } = await import('firebase/firestore');
    const { db } = await import('../firebase');
    const sigilsCollectionRef = collection(db, 'users', userId, 'sigils');
    const q = query(sigilsCollectionRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as Sigil[];
};