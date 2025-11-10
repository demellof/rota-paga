import React from 'react';

const HomePage: React.FC = () => {
    return (
        <div className="relative flex items-center justify-center min-h-screen text-white bg-black overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-radial-gradient from-gray-800 to-black"></div>
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black opacity-50"></div>

            {/* Tree of Wisdom */}
            <div className="relative z-10 w-full max-w-lg h-auto flex items-center justify-center">
                <img src="/Image September 24, 2025 - 1_26AM.png" alt="Árvore da Sabedoria" className="max-w-full h-auto" />

                {/* Pillar Icons */}
                <div
                    className="pillar-icon absolute w-20 h-20 bg-purple-900 bg-opacity-70 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    style={{ top: '20%', left: '10%' }}
                >
                    <p className="text-4xl">🔮</p>
                </div>
                <div
                    className="pillar-icon absolute w-20 h-20 bg-green-900 bg-opacity-70 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    style={{ top: '50%', left: '-5%' }}
                >
                    <p className="text-4xl">🌿</p>
                </div>
                <div
                    className="pillar-icon absolute w-20 h-20 bg-blue-900 bg-opacity-70 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    style={{ top: '20%', right: '10%' }}
                >
                    <p className="text-4xl">📚</p>
                </div>
                <div
                    className="pillar-icon absolute w-20 h-20 bg-yellow-900 bg-opacity-70 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                    style={{ top: '50%', right: '-5%' }}
                >
                    <p className="text-4xl">🌍</p>
                </div>
            </div>

            {/* Cosmic Compass */}
            <div className="absolute top-6 right-6 z-20 w-16 h-16 bg-gray-800 bg-opacity-70 rounded-full flex items-center justify-center shadow-md hover:shadow-cyan-400/50 transition-shadow duration-300 hover:scale-110">
                <img src="/Generated Image March 26, 2025 - 9_23AM.png (2).jpeg" alt="Bússola Cósmica" className="w-12 h-12" />
            </div>
        </div>
    );
};

export default HomePage;
