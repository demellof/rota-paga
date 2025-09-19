import React from 'react';

const HerbarioPage: React.FC = () => {
    // In a real implementation, this data would come from a data file
    const biomas = [
        {
            name: "Mata Atlântica",
            color: "text-green-400",
            herbs: [
                { name: "Arruda (Ruta graveolens)", traditional: "A grande erva de proteção e banimento.", scientific: "Contém Rutina. Atenção: Tóxica em altas doses." },
                { name: "Guiné (Petiveria alliacea)", traditional: "Poderosa erva de limpeza espiritual profunda.", scientific: "Propriedades analgésicas. Atenção: Potencial tóxico se ingerida." },
            ]
        },
        // ... other biomes
    ];

    return (
        <>
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Herbário Sazonal</h1>
            <p className="page-subtitle">Um guia sincrético de ervas encontradas no Brasil, organizadas por bioma.</p>

            {biomas.map(bioma => (
                <div key={bioma.name} className="content-card glass-effect">
                    <h2 className={`text-2xl font-bold mb-4 ${bioma.color}`}>Bioma: {bioma.name}</h2>
                    {bioma.herbs.map(herb => (
                        <div key={herb.name} className="mb-4">
                            <h3 className="text-lg font-semibold text-white">{herb.name}</h3>
                            <div className="syncretic-box text-sm">
                                <strong>Uso Tradicional (Sincrético):</strong> {herb.traditional}
                                <br/>
                                <strong>Uso Científico (Fitoterápico):</strong> {herb.scientific}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default HerbarioPage;
