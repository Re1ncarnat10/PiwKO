import React from 'react';
import { Link, useNavigate } from "react-router-dom";


export const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="inner-content">
                    <div className="brand">
                        <Link to="/">PiwKO</Link>
                    </div>
                    <ul className="nav-links">
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>

                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                    </ul>
                </div>
            </div>
        </header>
    );
};


