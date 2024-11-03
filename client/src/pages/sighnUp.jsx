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
import MessageModal from '@/components/MessageModal'; // Import the MessageModal component

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
