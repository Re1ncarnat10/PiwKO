import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./lib/font-awesome/css/all.min.css";
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import Home from './Components/HomePage';
import Login from "./Components/Login";
import Register from "./Components/Register";
function App() {
  return (
      <Router>
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
          </Routes>
          <Footer/>
      </Router>
  );
}

export default App;
