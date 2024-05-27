import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer >
            <div className="container">
                <div className="inner-content">
                    <div className="brand">
                        <Link to="/">PiwKO</Link>
                    </div>
                    <p className="no-margin">&copy; {year} PiwKO. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
