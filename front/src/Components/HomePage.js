import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; // Import useLocation

const Home = () => {
    const location = useLocation(); // Get the location
    const loginSuccess = location.state?.loginSuccess; // Get the loginSuccess state

    return(
        <div className="home">
            <div className="container">
                <div className="inner-content">
                    <h1>Witaj w PiwKO!</h1>
                    <p>Welcome to the PiwKO app! Here you will find the best beers from around the world.
                        Register or log in to be able to rate beers, add them to your favorites,
                        and share your opinions with other users.</p>
                    <Link to="/register" className="btn">Regiser</Link>
                    <Link to="/login" className="btn">Login</Link>
                </div>
            </div>
        </div>
    );
};
export default Home;
