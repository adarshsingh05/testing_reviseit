import '../index.css' 
import axios from 'axios';

import Input from '@/components/input';
import { Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
    
        const data = {
            name: name,
            email: email,
            password: password
        };
    
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Signup successful:', response.data);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };
    

    return (
        <>
            <div className="relative w-full h-screen flex items-center justify-center p-4 overflow-hidden">
                
                {/* Light Gradient Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 animate-light-gradient opacity-70"></div>

                {/* Main Content Container */}
                <div className="relative w-full h-full max-w-md md:max-w-lg lg:max-w-3xl bg-white backdrop-blur-lg shadow-lg shadow-white rounded-lg p-6 md:p-10">
                    <div className="text-center text-2xl md:text-4xl mt-2 md:mt-6 text-black font-mono">
                        Welcome to ReviseIt...
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center mt-6 md:mt-8">
                        <div className="w-full md:w-auto md:flex-1 mb-6 md:mb-0">
                            <h2 className="text-xl md:text-3xl text-center mb-6 text-black">Create an Account</h2>
                            <form onSubmit={handleSignup} className="space-y-4">
                                <Input
                                    icon={User}
                                    iconColor='text-[#ff664e]'
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Input
                                    icon={Mail}
                                    iconColor='text-[#ff664e]'
                                    type="text"
                                    placeholder="Email ID"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Input
                                    icon={Lock}
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    iconColor='text-[#ff664e]'
                                />
                                <PasswordStrengthMeter password={password}/>
                                
                                {/* Centered Button */}
                                <div className="flex justify-center mt-6">
                                    <Button className="text-[#ff664e] bg-gray-800 w-auto md:w-[100%]" type="submit">
                                        Signup
                                    </Button>
                                </div>
                            </form>
                            <div className="px-8 mt-2 py-4 bg-transparent bg-opacity-50 flex justify-center">
                                <p className="text-black">
                                    Already Have an Account?{" "}
                                    <Link className="text-[#ff664e] hover:underline" to={'/login'}>
                                        Login
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Hide Image on Smaller Screens */}
                        <img className="h-[200px] w-[200px] md:h-[400px] md:w-[400px] hidden md:block" src="/signupbg.png" alt="Signup Background" />
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default SignUp;
