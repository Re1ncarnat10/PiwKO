import React from 'react';

const Sidebar = () => {
    return (
        <aside>
            <div className="account-section">
                <a href="#my-account">Moje konto</a>
                <a href="#favorites">Ulubione</a>
                <a href="#rated">Ocenione</a>
                <a href="#logout">Wyloguj</a>
                <a href="#about-us">O nas</a>
            </div>
            <div className="feedback-section">
                Masz feedback? Skontaktuj się z nami
            </div>
        </aside>
    );
};

export default Sidebar;