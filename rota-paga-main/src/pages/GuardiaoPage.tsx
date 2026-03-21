import React from 'react';
import { useAuth } from '../context/AuthContext';

const GuardiaoPage: React.FC = () => {
    const { currentUser } = useAuth();
    return (
        <section className="content-panel p-6">
            <h2 className="font-fantasy text-4xl text-yellow-200 mb-4">O Guardião</h2>
            <p className="text-lg leading-relaxed mb-4">
                Informações sobre o guardião deste santuário.
            </p>
            <div className="syncretic-box">
                <strong>Email:</strong> {currentUser?.email}
            </div>
            <p className="mt-4">
                Esta página pode conter sua biografia, filosofia de trabalho e como você guia os outros na Jornada Florescer.
            </p>
        </section>
    );
};

export default GuardiaoPage;
