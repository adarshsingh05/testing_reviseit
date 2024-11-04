import React, { useState } from 'react';
import { Button } from './button';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '@/firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OauthLogin = () => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const navigate = useNavigate();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const handleLogin = async () => {
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            const user = resultsFromGoogle.user;

            const data = { email: user.email };

            await axios.post('https://testing-reviseit-1.onrender.com/api/auth/login', data, {
                headers: { 'Content-Type': 'application/json' }
            });

            console.log('Logged in', data);
            setShowSuccessModal(true);

            setTimeout(() => {
                setShowSuccessModal(false);
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error('Error logging in with Google:', error);
            setShowErrorModal(true);

            setTimeout(() => {
                setShowErrorModal(false);
                navigate("/signup");
            }, 2000);
        }
    };

    return (
        <>
            <Button
                onClick={handleLogin}
                className="bg-[#6198f0] text-white hover:bg-[#357ae8] w-full flex items-center justify-center py-2 rounded-md shadow-md transition-all duration-200"
            >
                <img
                    src="/google.png"
                    alt="Google logo"
                    className="w-5 h-5 mr-2"
                />
                Login with Google
            </Button>

            {showSuccessModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        zIndex: 1000, // High z-index to overlay other content
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                            textAlign: 'center',
                            width: '90%',
                            maxWidth: '400px',
                        }}
                    >
                        <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '16px' }}>
                            Login Successful! Redirecting to Home Page
                        </p>
                        <div
                            style={{
                                border: '4px solid #f3f3f3',
                                borderTop: '4px solid #6198f0',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                animation: 'spin 1s linear infinite',
                                margin: '0 auto',
                            }}
                        ></div>
                    </div>
                </div>
            )}

            {showErrorModal && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        zIndex: 1000, // High z-index to overlay other content
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
                            textAlign: 'center',
                            width: '90%',
                            maxWidth: '400px',
                        }}
                    >
                        <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '16px', color: '#e63946' }}>
                            Account does not exist. Please create an account.
                        </p>
                        <div
                            style={{
                                fontSize: '2.5rem',
                                color: '#e63946',
                                margin: '0 auto',
                            }}
                        >
                            &#x2716; {/* Cross icon */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OauthLogin;
