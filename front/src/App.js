import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./lib/font-awesome/css/all.min.css";
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import Home from './Components/HomePage';
import Login from "./Components/Login";
import Register from "./Components/Register";
import Admin from "./Components/Admin";
import { checkAdminStatus } from './Components/api';
import AccountDetails from "./Components/AcountDetails"; //

function App() {
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkAdminStatus()
                .then(isAdmin => setIsAdmin(isAdmin))
                .catch(error => console.error(error));
        }
    }, []);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/my-account" element={<AccountDetails />} />
                {isAdmin ? <Route path="/admin" element={<Admin />} /> : <Route path="/" element={<Home />} />}
            </Routes>
            <Footer/>
        </Router>
    );
}

export default App;