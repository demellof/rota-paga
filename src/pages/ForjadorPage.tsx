import React, { useState, useRef, useEffect } from 'react';

// Hooks de Dados (Busca)
import { useUserSigils } from '../hooks/useUserSigils';

// Hooks de Ação (Escrita)
import { useSaveSigil } from '../hooks/useSaveSigil';

// Dados Estáticos
import { ancientSealsData } from '../data/ancientSealsData';
import { preExistingSigils } from '../data/preExistingSigils';
import { planetData } from '../data/planetData'; // CORRIGIDO: Fonte de dados correta para planetas

// Simple Sigil Generation Logic (Placeholder)
const drawSigil = (canvas: HTMLCanvasElement, text: string, planet: string) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Simple drawing based on text
    ctx.fillStyle = 'black';
    ctx.font = '20px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    ctx.fillText(`(${planet})`, canvas.width / 2, canvas.height / 2 + 25);
};

const ForjadorPage: React.FC = () => {
    const [intention, setIntention] = useState('');
    const [planet, setPlanet] = useState(planetData[0].name);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { mutate: saveSigil, isPending: isSaving } = useSaveSigil();
    const { data: userSigils, isLoading: isLoadingUserSigils } = useUserSigils();

    const handleForge = () => {
        if (canvasRef.current && intention) {
            drawSigil(canvasRef.current, intention, planet);
        }
    };

    const handleSave = () => {
        if (!canvasRef.current) return;
        const imageUrl = canvasRef.current.toDataURL('image/png');

        // Check if canvas is empty (it will be a blank white image)
        // This is a simple check; a more robust one would analyze pixel data
        if (imageUrl.length < 200) {
            alert("Forje um sigilo antes de salvar.");
            return;
        }

        saveSigil({ intention, planet, imageUrl });
    };

    // Auto-forge when intention or planet changes
    useEffect(() => {
        handleForge();
    }, [intention, planet]);

    return (
        <div className="content-panel p-6">
            {/* --- Seção 1: O Altar da Criação --- */}
            <section className="mb-12">
                <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-300">Forjador de Sigilos</h1>
                <p className="page-subtitle">Concentre-se na sua intenção, escolha um corpo celeste para modular a energia e forje seu selo mágico.</p>

                <div className="mt-8 max-w-lg mx-auto">
                    <div className="glass-effect p-6 rounded-lg">
                        <div className="mb-4">
                            <label htmlFor="intention" className="block text-amber-200 font-semibold mb-2">Intenção:</label>
                            <input
                                id="intention"
                                type="text"
                                value={intention}
                                onChange={(e) => setIntention(e.target.value)}
                                placeholder="Ex: 'Proteção para minha jornada'"
                                className="w-full p-2 bg-gray-900/50 border border-purple-400/30 rounded focus:ring-amber-300 focus:border-amber-300"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="planet" className="block text-amber-200 font-semibold mb-2">Corpo Celeste:</label>
                            <select
                                id="planet"
                                value={planet}
                                onChange={(e) => setPlanet(e.target.value)}
                                className="w-full p-2 bg-gray-900/50 border border-purple-400/30 rounded focus:ring-amber-300 focus:border-amber-300"
                            >
                                {planetData.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                            </select>
                        </div>
                        <canvas
                            ref={canvasRef}
                            width="200"
                            height="200"
                            className="w-48 h-48 mx-auto bg-white rounded-lg shadow-lg border border-gray-300"
                        ></canvas>
                        <button
                            onClick={handleSave}
                            disabled={isSaving || !intention}
                            className="w-full mt-6 p-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors disabled:bg-gray-500 disabled:opacity-50"
                        >
                            {isSaving ? 'Salvando...' : 'Salvar no Grimório'}
                        </button>
                    </div>
                </div>
            </section>

            {/* --- Seção 2: A Galeria dos Selos --- */}
            <section>
                <h2 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-300 border-t border-yellow-200/20 pt-8 mt-8">Galeria dos Selos</h2>

                {/* Sub-seção: Sigilos Criados pelo Usuário */}
                <div className="my-8">
                    <h3 className="text-2xl font-semibold text-amber-200 mb-4">Suas Criações</h3>
                    {isLoadingUserSigils && <p className="text-gray-400">Carregando seus sigilos...</p>}
                    {!isLoadingUserSigils && userSigils?.length === 0 && <p className="text-gray-500">Você ainda não forjou nenhum sigilo. Suas criações aparecerão aqui.</p>}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {userSigils?.map(sigil => (
                            <div key={sigil.id} className="content-card-sm glass-effect p-2 text-center transform transition-transform hover:scale-105">
                                <img src={sigil.imageUrl} alt={sigil.intention} className="w-full h-auto bg-white rounded" />
                                <p className="text-sm mt-2 text-gray-300 truncate" title={sigil.intention}>{sigil.intention}</p>
                                <p className="text-xs text-purple-300">{sigil.planet}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sub-seção: Outros Sigilos (seus selos preexistentes) */}
                <div className="my-8">
                  <h3 className="text-2xl font-semibold text-amber-200 mb-4">Sigilos do Grimório</h3>
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {preExistingSigils.map(sigil => (
                          <div key={sigil.name} className="content-card-sm glass-effect p-2 text-center transform transition-transform hover:scale-105">
                            <img src={sigil.imageUrl} alt={sigil.name} className="w-full h-auto bg-white rounded p-1" />
                            <p className="text-sm mt-2 font-bold text-gray-300">{sigil.name}</p>
                          </div>
                      ))}
                   </div>
                </div>

                {/* Sub-seção: Selos Antigos */}
                <div className="my-8">
                    <h3 className="text-2xl font-semibold text-amber-200 mb-4">Selos Antigos de Poder</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
                        {ancientSealsData.map(seal => (
                            <div key={seal.name} className="content-card-sm glass-effect p-2 text-center transform transition-transform hover:scale-105">
                                <img src={seal.imageUrl} alt={seal.name} className="w-full h-auto bg-white rounded p-1" />
                                <p className="text-xs mt-2 font-bold text-gray-300">{seal.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ForjadorPage;