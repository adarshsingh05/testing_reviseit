import React, { useState } from 'react';
import { Button } from './ui/button';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '@/firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Oauth = () => {
    const navigate = useNavigate();
    const auth = getAuth(app);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isSuccessModal, setIsSuccessModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const handleGoogleClick = async () => {
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const user = resultsFromGoogle.user;

            const data = {
                name: user.displayName,
                email: user.email,
                password: "passcode", 
                isVerified: true,
            };

            await axios.post('http://localhost:5000/api/auth/signup', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('User data saved to MongoDB:', data);
            setModalMessage("Account created successfully! Redirecting to homepage...");
            setIsSuccessModal(true);
            setIsModalVisible(true);

            setTimeout(() => {
                setIsModalVisible(false);
                navigate("/"); 
            }, 2000);
        } catch (error) {
            console.error('Error signing in with Google:', error);
            setModalMessage("User already exists. Please log in.");
            setIsSuccessModal(false);
            setIsModalVisible(true);

            setTimeout(() => {
                setIsModalVisible(false);
                navigate('/login');
            }, 2000);
        }
    };

    return (
        <>
            <Button 
                onClick={handleGoogleClick}
                className="bg-[#6198f0] text-white hover:bg-[#357ae8] w-full flex items-center justify-center py-2 rounded-md shadow-md transition-all duration-200"
            >
                <img 
                    src="/google.png"
                    alt="Google logo" 
                    className="w-5 h-5 mr-2" 
                />
                Continue with Google
            </Button>

            {isModalVisible && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1000, // Ensure modal is above other content
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '24px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}>
                        <p style={{
                            fontSize: '1rem',
                            color: isSuccessModal ? '#4CAF50' : '#e53e3e',
                            marginBottom: '16px'
                        }}>
                            {modalMessage}
                        </p>
                        <div style={{
                            border: '4px solid #f3f3f3',
                            borderTop: `4px solid ${isSuccessModal ? '#4CAF50' : '#e53e3e'}`,
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            margin: '0 auto',
                            animation: 'spin 1s linear infinite',
                        }}></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Oauth;
