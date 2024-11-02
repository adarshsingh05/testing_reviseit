import '../index.css';
import axios from 'axios';
import Input from '@/components/input';
import { Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'; // Import eye icon for showing password
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; // Import eye off icon for hiding password
import Oauth from '@/components/Oauth';

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

    const handleSignup = async (e) => {
        e.preventDefault();
    
        const data = {
            name: name,
            email: email,
            password: password, // Don't forget to send the password
        };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Signup successful:', response.data);
            navigate('/');
            // Move navigate here to ensure it only runs on successful signup
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev); // Toggle password visibility
    };

    return (
        <>
            <div className="relative w-full h-screen flex items-center justify-center p-4 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-300">
                {/* Main Content Container */}
                <div className="relative w-full h-full max-w-md bg-white backdrop-blur-lg shadow-lg rounded-lg p-8">
                    <h1 className="text-center text-3xl font-bold text-gray-800 mb-4">
                        Welcome to ReviseIt
                    </h1>
                    <div className='items-center justify-start flex flex-col mb-2'>
                    <h2 className="text-xl text-gray-700 text-center mb-6">Create an Account</h2>
                    <Oauth className='text-center'/>
                    </div>
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
                                type={isPasswordVisible ? 'text' : 'password'} // Change type based on visibility
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
                                {/* {isPasswordVisible ? (
                                    <VisibilityOffIcon /> // Eye off icon for hiding password
                                ) : (
                                    <RemoveRedEyeIcon /> // Eye icon for showing password
                                )} */}
                            </button>
                        </div>
                        <PasswordStrengthMeter password={password} />
                        
                        <div className="flex justify-center mt-6">
                            <Button className="bg-[#ff664e] text-white hover:bg-[#e55b43] w-full" type="submit">
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
                    <img className="h-[200px] w-[200px] md:h-[400px] md:w-[400px] mt-6 mx-auto" src="/signupbg.png" alt="Signup Background" />
                </div>
            </div>
        </>
    );
};

export default SignUp;
