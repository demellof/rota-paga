import React from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface PremiumContentProps {
    children: React.ReactNode;
}

const PremiumContent: React.FC<PremiumContentProps> = ({ children }) => {
    const { userProfile, currentUser } = useAuth();

    const isSubscribed = userProfile?.subscription?.status === 'active';

    // Temporary function to allow simulating a subscription
    const handleSimulateSubscription = async () => {
        if (!currentUser) return;
        const userDocRef = doc(db, 'users', currentUser.uid);
        try {
            await updateDoc(userDocRef, {
                'subscription.status': 'active'
            });
            alert('Assinatura simulada com sucesso! Recarregue a página para ver o conteúdo.');
        } catch (e) {
            console.error(e);
            alert('Falha ao simular assinatura.');
        }
    };

    if (isSubscribed) {
        return <>{children}</>;
    }

    return (
        <div className="p-6 my-4 text-center bg-gray-800 border-2 border-dashed border-[#a37e2c] rounded-lg">
            <h3 className="font-cinzel text-xl text-[#c8a44d] mb-2">Conteúdo Premium</h3>
            <p className="text-gray-400 mb-4">
                Esta parte da jornada é exclusiva para assinantes. Desbloqueie todo o potencial da Rota Pagã.
            </p>
            <button className="btn-primary py-2 px-6 rounded-lg">
                Ver Planos de Assinatura
            </button>
            <button onClick={handleSimulateSubscription} className="btn-secondary ml-4 py-2 px-4 rounded-lg">
                (Dev) Simular Assinatura
            </button>
        </div>
    );
};

export default PremiumContent;
