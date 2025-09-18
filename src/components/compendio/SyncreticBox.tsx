import React from 'react';

interface SyncreticBoxProps {
    traditional: string;
    scientific: string;
}

const SyncreticBox: React.FC<SyncreticBoxProps> = ({ traditional, scientific }) => {
    return (
        <div className="syncretic-box">
            <strong>Visão Sincrética:</strong>
            <ul>
                <li><strong>Tradicional/Energética:</strong> {traditional}</li>
                <li><strong>Científica/Geológica:</strong> {scientific}</li>
            </ul>
        </div>
    );
};

export default SyncreticBox;
