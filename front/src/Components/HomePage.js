import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import CourseCard from './CourseCard';
const Home = () => {
    const location = useLocation(); // Get the location
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;
    const loginSuccess = location.state?.loginSuccess; // Get the loginSuccess state


    return(
        <div className="home">
            <div className="container">
                <div className="inner-content">
                    {loginSuccess && <div className="alert alert-success">{loginSuccess}</div>}
                    {isLoggedIn && (
                        <div className="content-container">
                            <CourseCard/> {/* Use CourseCard with courseId 1 */}
                        </div>
                    )}
                    {!isLoggedIn && (
                        <div className="content-container">
                            <h1>Welcome to PiwKO!</h1>
                            <p>Welcome to the PiwKO app! Here you will find the best beers from around the world.
                                Register or log in to be able to rate beers, add them to your favorites,
                                and share your opinions with other users.</p>
                            <Link to="/register" className="btn">Register</Link>
                            <Link to="/login" className="btn">Login</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Home;
