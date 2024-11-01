import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EnterNewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { token } = useParams(); // Destructure token from URL parameters
    console.log(token);
    

    const handlesubmit = async (e) => {
        e.preventDefault();
        
        // Ensure both passwords match
        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        const email = { password };

        console.log('Sending data:', password);

        try {
            const response = await axios.post(`http://localhost:5000/api/auth/resetpassword/${token}`, email, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Redirect to the login page after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                setMessage(error.response.data.message || 'Invalid or expired code. Please try again.');
            } else if (error.request) {
                console.error('Error request:', error.request);
                setMessage('No response received from the server.');
            } else {
                console.error('Error message:', error.message);
                setMessage('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8">
                {/* Left Section */}
                <div className="w-full md:w-1/2">
                    <div className="flex items-center mb-6">
                        <img src="/logo-placeholder.png" alt="Logo" className="w-8 h-8 mr-2" />
                        <h1 className="text-2xl font-bold"></h1>
                    </div>
                    <h2 className="text-3xl font-semibold mb-4">Set a password</h2>
                    <p className="text-gray-600 mb-6">
                        Your previous password has been reset. Please set a new password for your account.
                    </p>
                    {message && <p className="text-red-500 mb-4">{message}</p>}
                    <form onSubmit={handlesubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Create Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    placeholder="Create Password"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700">Re-enter Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    placeholder="Re-enter Password"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none"
                        >
                            Set password
                        </button>
                    </form>
                </div>
                
                {/* Right Section */}
                <div className="hidden md:flex md:w-1/2 items-center justify-center">
                    <img src="/forget.png" alt="Password Lock" className="w-full max-w-xs" />
                </div>
            </div>
        </div>
    );
};

export default EnterNewPassword;
