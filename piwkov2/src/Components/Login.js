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
            sessionStorage.setItem('alertShown', 'false');
        } catch (error) {
            // Check if the error message contains the specific string about the password length
            if (error.message.includes("The field Password must be a string or array type with a minimum length of '6'.")) {
                // Set a custom error message
                setLoginError('Password must be at least 6 characters long');
            } else {
                setLoginError(error.message);
            }
        }
    };
    return (
        <div className="relative flex flex-col justify-center h-192  overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
                {registerSuccess && <div className="alert alert-success">{registerSuccess}</div>}
                {loginError && <div className="alert alert-warning">{loginError}</div>}
                <h1 className="text-3xl font-semibold text-center text-gray-700">Login</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Email Address"
                            className="w-full input input-bordered"
                            id="email" // Change id to email
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full input input-bordered"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <a href="/Register" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Dont have
                        a account? Register.</a>

                    <div>
                        <button className="btn-neutral btn btn-block">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;