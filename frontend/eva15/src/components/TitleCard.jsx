import React from 'react';
const TitleCard = ({ title, description }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}
export default TitleCard;