import React from 'react';
import BeerCard from './BeerCard';

const SortBar = () => {
    const beers = [
        { name: 'Lech', rating: 10 },
        { name: 'Żywiec', rating: 8 },
        { name: 'Perła', rating: 9 },
        { name: 'Żubr', rating: 9 },
        { name: 'Other', rating: 7 },
    ];

    return (
        <main>
            <div className="filters">Filtry</div>
            <div className="search">Pole do wpisania tekstu</div>
            <div className="sort">Sortuj po</div>
            <div className="beer-list">
                {beers.map((beer, index) => (
                    <BeerCard key={index} name={beer.name} rating={beer.rating} />
                ))}
            </div>
        </main>
    );
};
export default SortBar;