import React from 'react';
import { useSpring, animated } from 'react-spring';
import Coin from './Coin'; // Import the Coin component

const CoinModal = ({ isOpen, onClose }) => {
  const fade = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0)' : 'translateY(-50px)',
    config: { tension: 300, friction: 20 }
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
  };

  return (
    isOpen && (
      <animated.div style={modalStyle}>
        <animated.div style={fade}>
          <div style={contentStyle}>
            <Coin />
            <h2>+100 Coins added!</h2>
            <button onClick={onClose}>Close</button>
          </div>
        </animated.div>
      </animated.div>
    )
  );
};

export default CoinModal;
