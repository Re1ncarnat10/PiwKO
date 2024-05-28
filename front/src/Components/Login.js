import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { login } from './api';
import { useLocation } from 'react-router-dom'; // Import useLocation


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(''); // Add this line
    const registerSuccess = useLocation().state?.registerSuccess; // Get the registerSuccess state


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            navigate('/', { state: { loginSuccess: 'Login successful. Welcome!' } });
        } catch (error) {
            setLoginError(error.message);
        }
    };
    return (
        <div className="d-block container mt-5  pt-5 align-self-center ">
            <div className="row justify-content-center align-items-center">
                <div className="col-12 col-sm-8 col-md-6 m-auto">
                    {registerSuccess && <div className="alert alert-success">{registerSuccess}</div>}
                    {loginError && <div className="alert alert-danger">{loginError}</div>}
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label> {/* Change label to Email */}
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email" // Change id to email
                                        placeholder="Enter email" // Change placeholder to Enter email
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-3">Login</button>
                            </form>
                            <p className="mt-3">Don't have an account? <Link to="/register">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;