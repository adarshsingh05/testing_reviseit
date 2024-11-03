import React from 'react';
import { useSpring, animated } from 'react-spring';
import Coin from './Coin'; // Import the Coin component
import { FaTimes } from 'react-icons/fa'; // Import a cross icon from react-icons

const CoinModal = ({ isOpen, onClose }) => {
  const fade = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-50px)',
    config: { tension: 300, friction: 20 },
  });

  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // Ensure it's above other content
  };

  const contentStyle = {
    background: 'white',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    position: 'relative', // Relative positioning to position the close button
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px', // Adjust the size of the icon
    color: '#333', // Change color as needed
  };

  return (
    isOpen && (
      <animated.div style={modalStyle}>
        <animated.div style={fade}>
          <div style={contentStyle}>
            <button style={closeButtonStyle} onClick={onClose}>
              <FaTimes />
            </button>
            <Coin />
            <h1 className='text-xl'>Paper Uploaded Successfully</h1>
            <h2>+100 Coins added!</h2>
          </div>
        </animated.div>
      </animated.div>
    )
  );
};

export default CoinModal;
