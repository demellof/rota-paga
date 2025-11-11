import React from 'react';

interface ContentPageProps {
    children: React.ReactNode;
}

const ContentPage: React.FC<ContentPageProps> = ({ children }) => {
    return (
        <div className="flex-1 p-8 bg-yellow-50" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/old-paper.png)', border: '10px solid #c8a44d', borderImageSlice: 1, borderImageSource: 'linear-gradient(to bottom, #c8a44d, #785523)' }}>
            {children}
        </div>
    );
};

export default ContentPage;
