import React from 'react';

interface ContentSectionProps {
    id: string;
    isActive: boolean;
    children: React.ReactNode;
}

const ContentSection: React.FC<ContentSectionProps> = ({ id, isActive, children }) => {
    if (!isActive) {
        return null;
    }

    return (
        <section id={id} className="content-section active">
            {children}
        </section>
    );
};

export default ContentSection;
