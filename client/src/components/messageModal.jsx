// src/components/MessageModal.js
import React from 'react';
import { useSpring, animated } from 'react-spring';
import { X } from 'lucide-react'; // Importing Lucide icon for close button

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

export default MessageModal;
