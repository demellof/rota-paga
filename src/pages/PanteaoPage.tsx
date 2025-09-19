import React from 'react';

const PanteaoPage: React.FC = () => {
    const deidades = [
        { name: "Pã: O Espírito Indomado", color: "text-green-400", focus: "Patrono do Pilar da Terra e do Herbário Sazonal." },
        { name: "Hécate: A Guardiã das Encruzilhadas", color: "text-indigo-300", focus: "Patrona da Roda do Ano e do Pilar da Luz (Intuição)." },
        { name: "Eros: O Grande Conciliador", color: "text-rose-400", focus: "Patrono do Pilar do Ar/Coração (Anahata) e da própria 'Jornada Florescer'." },
        // ... other deities
    ];

    return (
        <>
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-300">O Panteão</h1>
            <p className="page-subtitle">Honrando os Guardiões, Arquétipos e Forças que inspiram este Grimório.</p>

            {deidades.map(deidade => (
                <div key={deidade.name} className="content-card glass-effect">
                    <h2 className={`text-2xl font-bold mb-4 ${deidade.color}`}>{deidade.name}</h2>
                    <p className="mb-4">{deidade.focus}</p>
                </div>
            ))}
        </>
    );
};

export default PanteaoPage;
