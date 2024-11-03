// src/pages/signup.jsx
import '../index.css';
import axios from 'axios';
import Input from '@/components/input';
import { Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Oauth from '@/components/Oauth';
import { useSpring, animated } from 'react-spring'; // Importing react-spring
import { X } from 'lucide-react'; // Importing Lucide icon for close button

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

    const handleSignup = async (e) => {
        e.preventDefault();
        const data = { name, email, password };

        // Show the modal instead of console log
        setIsModalVisible(true);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prev => !prev);
    };

    const closeModal = () => {
        setIsModalVisible(false);
    };

    // MessageModal Component
    const MessageModal = ({ isOpen, onClose, message }) => {
        const fade = useSpring({
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0)' : 'translateY(-50px)',
            config: { tension: 300, friction: 20 },
        });

        const overlayStyle = {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        };

        const contentStyle = {
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center',
            position: 'relative',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease',
        };

        const messageStyle = {
            fontSize: '18px',
            color: '#333',
            margin: '10px',
        };

        const closeButtonStyle = {
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
            transition: 'color 0.2s',
        };

        const closeButtonHoverStyle = {
            color: '#ff664e', // Change to your theme color on hover
        };

        return (
            isOpen && (
                <div style={overlayStyle}>
                    <animated.div style={fade}>
                        <div className='ml-2 mb-3' style={contentStyle}>
                            <button 
                                style={closeButtonStyle} 
                                onMouseOver={(e) => (e.currentTarget.style.color = closeButtonHoverStyle.color)}
                                onMouseOut={(e) => (e.currentTarget.style.color = 'initial')}
                                onClick={onClose}
                            >
                                <X className='ml-2 mb-2' size={24} />
                            </button>
                            <h1 className='m-4' style={messageStyle}>{message}</h1>
                        </div>
                    </animated.div>
                </div>
            )
        );
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 to-purple-300">
            <div className="relative w-full max-w-md rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-4">Welcome to <span className="text-[#ff664e]">ReviseIt</span></h1>
                <h2 className="text-xl text-gray-700 text-center mb-6">Create an Account</h2>
                <Oauth className='text-center' />
                <hr className='mb-4' />
                <form onSubmit={handleSignup} className="space-y-4">
                    <Input
                        icon={User}
                        className='w-full'
                        iconColor='text-[#ff664e]'
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        icon={Mail}
                        className='w-full'
                        iconColor='text-[#ff664e]'
                        type="text"
                        placeholder="Email ID"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="relative">
                        <Input
                            icon={Lock}
                            className='w-full'
                            type={isPasswordVisible ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            iconColor='text-[#ff664e]'
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 focus:outline-none"
                        >
                            {isPasswordVisible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                        </button>
                    </div>
                    <PasswordStrengthMeter password={password} />
                    <div className="flex justify-center mt-4">
                        <Button className="bg-[#2b2a2a] text-white hover:bg-[#000000] w-full" type="submit">
                            Signup
                        </Button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Already Have an Account?{" "}
                        <Link className="text-[#ff664e] hover:underline" to={'/login'}>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
            <MessageModal 
                isOpen={isModalVisible} 
                onClose={closeModal} 
                message="Use Google Signup to Proceed, Unable to Fetch Provided Email" 
            />
        </div>
    );
};

export default SignUp;
