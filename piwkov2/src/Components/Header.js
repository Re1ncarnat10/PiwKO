import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getAccountDetails, checkAdminStatus } from "./api";
export const Header = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');
    const token = localStorage.getItem('token');
    const isLoggedIn = token !== null;
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // Add this line

    const handleToggle = (e) => {
        if(e.target.checked){
            setTheme('business');
        }
        else {
            setTheme('light');
        }
    }
    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localTheme = localStorage.getItem('theme');
        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [theme]);
    useEffect(() => {
        if (isLoggedIn) {
            getAccountDetails()
                .then(data => setUsername(data.name))
                .catch(error => console.error(error));
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (isLoggedIn) {
            checkAdminStatus()
                .then(isAdmin => setIsAdmin(isAdmin))
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (selectedOption) {
            navigate(selectedOption);
        }
    }, [selectedOption, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };
    return (
        <header className="navbar bg-neutral text-neutral-content w-full sticky top-0 relative z-[1000]">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost rounded-3xl text-xl">PiwKO</a>
                <label className="swap swap-rotate pr-2">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" onChange={handleToggle} checked={theme === 'business'}/>

                    {/* moon icon */}
                    <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                        <path
                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/>
                    </svg>
                    {/* sun icon */}
                    <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24">
                        <path
                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/>
                    </svg>
                </label>
            </div>
            <div className="flex-none">


                {isLoggedIn && (
                    <>
                        <p className="text p-2">Welcome {username}</p>
                        <button onClick={handleLogout} className="btn rounded-2xl btn-default">Logout</button>
                        {isAdmin && (
                            <button onClick={() => navigate('/admin')} className="btn rounded-2xl btn-default">
                                Admin Panel
                            </button>
                        )}
                        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 className="inline-block w-5 h-5 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                            </svg>
                        </label>
                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <button className="btn rounded-2xl btn-default" onClick={() => navigate('/login')}>Login
                        </button>
                        <button className="btn rounded-2xl btn-default" onClick={() => navigate('/register')}>Register
                        </button>
                    </>
                )}


            </div>
        </header>
    )
}
