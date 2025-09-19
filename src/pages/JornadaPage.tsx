import React from 'react';

const JornadaPage: React.FC = () => {
    const etapas = [
        { title: "Etapa 1: Despertar da Consciência", focus: "Clareza, auto-observação neutra, mapeamento de hábitos.", color: "text-muladhara" },
        { title: "Etapa 2: Semeando com Propósito", focus: "Alinhar desejos com valores, encontrar o 'porquê' profundo.", color: "text-svadhisthana" },
        { title: "Etapa 3: Transformação Resiliente", focus: "Confronto ativo com padrões, mobilização da força de vontade (Fogo).", color: "text-manipura" },
        { title: "Etapa 4: Colheita Consciente", focus: "Integração, gratidão, solidificar novos hábitos, amor-próprio.", color: "text-anahata" },
        { title: "Etapa 5: Irradiando o Legado", focus: "Compartilhar a sabedoria adquirida, expressão autêntica.", color: "text-vishuddha" },
        { title: "Etapa 6: Introspecção Curativa", focus: "Mergulho profundo na sombra para curar padrões recorrentes.", color: "text-ajna" },
        { title: "Etapa 7: União Transcendental", focus: "Experiência da unidade, transcendência do ego, consciência pura.", color: "text-sahasrara" },
    ];

    return (
        <>
            <h1 className="page-title text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Jornada Florescer</h1>
            <p className="page-subtitle">As 7 Etapas da Jornada para Domar a Fera Interior.</p>

            {etapas.map(etapa => (
                 <div key={etapa.title} className="content-card glass-effect">
                    <h2 className={`text-2xl font-bold mb-3 ${etapa.color}`}>{etapa.title}</h2>
                    <p className="mb-4">Foco: {etapa.focus}</p>
                </div>
            ))}
        </>
    );
};

export default JornadaPage;
