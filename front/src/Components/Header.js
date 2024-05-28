import React, {useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {getAccountDetails} from "./api";

export const Header = () => {
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;
    const navigate = useNavigate();
    const [username, setUsername] = useState(''); // Add this line
    useEffect(() => {
        if (isLoggedIn) {
            getAccountDetails()
                .then(data => setUsername(data.name))
                .catch(error => console.error(error));
        }
    }, [isLoggedIn]);
    const handleLogout = () => {
        localStorage.removeItem('token');

        navigate('/');
    };
    return (
        <header>
            <div className="container">
                <div className="inner-content">
                    <div className="brand">
                        <Link to="/">Strona Gołówna</Link>
                    </div>
                    <ul className="nav-links">
                        {isLoggedIn && (
                            <>
                                <li>
                                    <div className="user-info">
                                        <p>Welcome {username}</p>
                                        <button onClick={handleLogout} className="btn">
                                            Logout
                                        </button>
                                    </div>
                                </li>
                            </>
                        )}
                        {!isLoggedIn && (
                            <>
                                <li>
                                <Link to="/login">Login</Link>
                                </li>

                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
};


