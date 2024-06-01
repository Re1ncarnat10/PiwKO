import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { register } from './api'; // Import the register function

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerError, setRegisterError] = useState(''); // Add this line

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await register(name, email, password, confirmPassword);
            navigate('/login', {state: {registerSuccess: 'Registration successful. Please log in.'}}); // Navigate with state
        } catch (error) {
            setRegisterError(error.message);
        }
    };
    return (
        <div className="relative flex flex-col justify-center h-208  overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
                {registerError && <div className="alert alert-warning">{registerError}</div>}
                <h1 className="text-3xl font-semibold text-center text-gray-700">Register</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Name</span>
                        </label>
                        <input
                            type="text"
                            className="w-full input input-bordered"
                            id="name"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            className="w-full input input-bordered"
                            id="email"
                            placeholder="Enter email"
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
                            className="w-full input input-bordered"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">Confirm password</span>
                        </label>
                        <input
                            type="password"
                            className="w-full input input-bordered"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <a href="/login" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Already have a account? Log In.</a>

                    <div>
                        <button className="btn-neutral btn btn-block">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register;