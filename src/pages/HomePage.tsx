import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="text-center p-8">
            <h2 className="text-4xl font-bold font-cinzel text-[#c8a44d] mb-4">
                Bem-vindo à Rota Pagã
            </h2>
            <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
                Um espaço sagrado para o seu desenvolvimento pessoal e espiritual. Explore ferramentas ancestrais e conhecimentos místicos para trilhar um caminho de autoconhecimento e transformação.
            </p>
            <div className="card p-6 max-w-2xl mx-auto my-8">
                <h3 className="text-2xl font-cinzel text-[#c8a44d] mb-3">O que você encontrará aqui?</h3>
                <p className="text-gray-400">
                    Ao se registrar, você terá acesso a um grimório virtual completo com guias sobre astrologia, pranayamas, jornadas de autodescoberta e muito mais. Comece sua jornada para uma vida mais consciente e alinhada com seu propósito.
                </p>
            </div>
            <p className="text-md text-gray-300">
                <a href="#" className="text-[#a37e2c] font-bold hover:underline">Registre-se agora</a> para desbloquear todo o potencial da sua jornada ou <a href="#" className="text-[#a37e2c] font-bold hover:underline">faça login</a> se já for um guardião.
            </p>
        </div>
    );
};

export default HomePage;
