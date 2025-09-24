import React from 'react';

const PantaculosPage: React.FC = () => {
    return (
        <section className="content-panel p-6">
            <h2 className="font-fantasy text-4xl text-yellow-200 mb-4">Pantáculos Planetários: O Poder dos Selos</h2>
            <p className="mb-6">Os Quadrados Mágicos, ou Kameas Planetários, são a base da magia cerimonial ocidental (como detalhado nas Clavículas de Salomão e na Cabala Prática). Eles são pantáculos que traduzem a energia pura de um planeta em uma matriz matemática. Ao usá-los, você alinha sua intenção com a força cósmica específica do planeta. Você está em um ciclo de Júpiter (Chesed) e vem de um ciclo do Sol (Tipheret).</p>

            <div className="mb-6">
                <h3 className="font-fantasy text-2xl text-yellow-300 mb-2">O Selo do Sol (Tipheret / 6x6)</h3>
                <p className="mb-3">O Sol rege a identidade, o sucesso, a vitalidade, a liderança e a consciência superior (o "Eu Superior"). Seu ciclo dura 3 anos no sistema Schutz.</p>
                <ul className="list-disc list-inside mb-4 pl-4 space-y-1">
                    <li><strong>Número Mágico:</strong> 111</li>
                    <li><strong>Soma Total:</strong> 666</li>
                    <li><strong>Associado a:</strong> Tipheret (Beleza, Harmonia), Arcanjo Miguel, Ouro.</li>
                    <li><strong>Usos Mágicos:</strong> Vitalidade, cura, sucesso em empreendimentos, clareza espiritual, autoridade e iluminação.</li>
                </ul>
                <p className="text-sm text-yellow-200/70 italic">Suas palavras "Fé", "Magia", "Disciplina" e "Farol" foram forjadas sob esta influência para construir sua identidade central.</p>
            </div>

            <div>
                <h3 className="font-fantasy text-2xl text-yellow-300 mb-2">O Selo de Júpiter (Chesed / 4x4)</h3>
                <p className="mb-3">Júpiter rege a expansão, abundância, sorte, sabedoria superior, oportunidades e generosidade. Este é o seu ciclo atual (39-46 anos).</p>
                <ul className="list-disc list-inside mb-4 pl-4 space-y-1">
                    <li><strong>Número Mágico:</strong> 34</li>
                    <li><strong>Soma Total:</strong> 136</li>
                    <li><strong>Associado a:</strong> Chesed (Misericórdia, Expansão), Arcanjo Sachiel (ou Tzadkiel), Estanho.</li>
                    <li><strong>Usos Mágicos:</strong> Atrair abundância material e espiritual, expandir negócios, obter sabedoria e promover generosidade.</li>
                </ul>
                 <p className="text-sm text-yellow-200/70 italic">Este é o quadrado mágico que você usará para forjar seus sigilos durante este ciclo de 7 anos, começando com "Florescer".</p>
            </div>
        </section>
    );
};

export default PantaculosPage;
