import React from 'react';

const deidades = [
    { name: "Pã: O Espírito Indomado", color: "text-green-400", focus: "Patrono do Pilar da Terra e do Herbário Sazonal." },
    { name: "Hécate: A Guardiã das Encruzilhadas", color: "text-indigo-300", focus: "Patrona da Roda do Ano e do Pilar da Luz (Intuição)." },
    { name: "Eros: O Grande Conciliador", color: "text-rose-400", focus: "Patrono do Pilar do Ar/Coração (Anahata) e da própria 'Jornada Florescer'." },
    { name: "As Parcas (Moiras): As Tecelãs", color: "text-gray-300", focus: "Supervisoras da Jornada Florescer como um todo." },
    { name: "Aradia: A Sábia Mestra", color: "text-purple-300", focus: "A alma deste Grimório Virtual." },
    { name: "Cosme e Damião: Os Curadores Sincréticos", color: "text-cyan-400", focus: "Abençoam o Compêndio Sincrético, unindo o ritual e a fitoterapia." },
];

const PanteaoPage: React.FC = () => {
    return (
        <section className="content-panel p-6">
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-300">O Panteão</h1>
            <p className="page-subtitle">Honrando os Guardiões, Arquétipos e Forças que inspiram este Grimório.</p>

            {deidades.map(deidade => (
                <div key={deidade.name} className="content-card glass-effect mb-4">
                    <h2 className={`text-2xl font-bold mb-2 ${deidade.color}`}>{deidade.name}</h2>
                    <p>{deidade.focus}</p>
                </div>
            ))}
        </section>
    );
};

export default PanteaoPage;
