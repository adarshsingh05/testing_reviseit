import Footer from '@/components/footer';
import Input from '@/components/input';
import { Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="w-full h-screen bg-black flex items-center justify-center p-4">
                <div className="w-full h-full max-w-md md:max-w-lg lg:max-w-3xl bg-white/10 backdrop-blur-lg shadow-lg shadow-white rounded-lg p-6 md:p-10">
                    <div className="text-center text-2xl md:text-4xl mt-2 md:mt-6 text-white font-mono">
                        Welcome to ReviseIt...
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center mt-6 md:mt-8">
                        <div className="w-full md:w-auto md:flex-1 mb-6 md:mb-0">
                            <h2 className="text-xl md:text-3xl text-center mb-6 text-gray-100">Create an Account</h2>
                            <form onSubmit={handleSignup} className="space-y-4">
                                <Input
                                    icon={User}
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Input
                                    icon={Mail}
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
                                />
                                
                                {/* Centered Button */}
                                <div className="flex justify-center mt-6">
                                    <Button className="text-green-400 bg-gray-800 w-auto md:w-[100%]" type="submit">
                                        Signup
                                    </Button>
                                </div>
                            </form>
                        </div>
                        
                        {/* Hide Image on Smaller Screens */}
                        <img className="h-[200px] w-[200px] md:h-[400px] md:w-[400px] hidden md:block" src="/signupbg.png" alt="Signup Background" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SignUp;
