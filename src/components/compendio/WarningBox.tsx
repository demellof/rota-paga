import React from 'react';

interface WarningBoxProps {
    message: string;
}

const WarningBox: React.FC<WarningBoxProps> = ({ message }) => {
    return (
        <div className="warning-box">
            <strong>Aviso de Segurança:</strong> {message}
        </div>
    );
};

export default WarningBox;
