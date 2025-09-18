import React from 'react';
import { CompendioItem, Ritual } from '../../data/compendioData';
import SyncreticBox from './SyncreticBox';
import WarningBox from './WarningBox';

interface ChakraCardProps {
    item: CompendioItem;
}

const ChakraCard: React.FC<ChakraCardProps> = ({ item }) => {
    const chakraColorClass = `text-${item.id}`;
    const borderColorClass = `border-${item.id}`;

    return (
        <section className="chakra-card" id={item.id}>
            <h2 className={`chakra-title ${chakraColorClass}`}>{item.title}</h2>
            <p className="mb-4 text-lg font-light">{item.focus}</p>

            <h3 className={`section-title ${borderColorClass}`}>💎 Cristais</h3>
            <p><strong>Cristais Chave:</strong> {item.crystals.list}</p>
            <SyncreticBox
                traditional={item.crystals.synergy.traditional}
                scientific={item.crystals.synergy.scientific}
            />

            <h3 className={`section-title ${borderColorClass}`}>🌿 Ervas</h3>
            <p><strong>Ervas Chave:</strong> {item.herbs.list}</p>
            <SyncreticBox
                traditional={item.herbs.synergy.traditional}
                scientific={item.herbs.synergy.scientific}
            />

            <h3 className={`section-title ${borderColorClass}`}>🛁 Rituais (Banhos & Chás)</h3>
            {item.rituals.map((ritual, index) => (
                <div key={index} className="mt-2">
                    <p><strong>{ritual.title}:</strong></p>
                    <ul>
                        <li><strong>Ritual:</strong> {ritual.ritual}</li>
                        <li><strong>Ciência:</strong> {ritual.science}</li>
                    </ul>
                </div>
            ))}

            {item.warning && (
                <WarningBox message={item.warning} />
            )}
        </section>
    );
};

export default ChakraCard;
