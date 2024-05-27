import React from 'react';

const BeerCard = ({ name, rating }) => {
    return (
        <div className="beer-card">
            <div className="favorite">♡</div>
            <div className="beer-name">{name}</div>
            <div className="rating">{rating}</div>
        </div>
    );
};

export default BeerCard;