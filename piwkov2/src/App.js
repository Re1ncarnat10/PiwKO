import './App.css';
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Header} from './Components/Header';
import {Footer} from './Components/Footer';
import {Sidebar} from "./Components/Sidebar";
import {checkAdminStatus} from './Components/api';
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/HomePage";
import Admin from "./Components/Admin";
import AdminCreate from "./Components/AdminCreate";
import AdminDelete from "./Components/AdminDelete";
import AccountDetails from "./Components/AccountDetails";
import MyWallet from "./Components/MyWallet";
import UserCourses from "./Components/UserCourses";
import CourseContent from "./Components/CourseContent";
import UserFavorite from "./Components/UserFavorite";
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
            <div className="flex flex-col min-h-screen">
                <Header/>
                <Sidebar/>
                <main className="flex-grow overflow-y-auto max-h-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/my-account" element={<AccountDetails />} />]
                        <Route path="/my-wallet" element={<MyWallet />} />]
                        <Route path="/my-courses" element={<UserCourses />} />]
                        <Route path="/favorite" element={<UserFavorite />} />]
                        <Route path="/course-content/:courseId" element={<CourseContent />} />
                        {isAdmin ? <Route path="/admin" element={<Admin/>}/> : <Route path="/" element={<Home/>}/>}
                        {isAdmin ? <Route path="/admin/create" element={<AdminCreate/>}/> : <Route path="/" element={<Home/>}/>}
                        {isAdmin ? <Route path="/admin/delete" element={<AdminDelete/>}/> : <Route path="/" element={<Home/>}/>}

                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
