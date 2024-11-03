import React from 'react';

const Coin = () => {
  const coinStyle = {
    width: '100px', // Adjust width as needed
    height: '100px', // Adjust height as needed
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: 'rotate 2s linear infinite', // Continuous rotation
    perspective: '1000px', // For 3D effect
    '@keyframes rotate': {
      from: {
        transform: 'rotateY(0deg)',
      },
      to: {
        transform: 'rotateY(360deg)',
      },
    },
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '50%', // Optional for a coin look
  };

  return (
    <div className='flex justify-center items-center w-full h-full'> {/* Ensure full width and height of parent */}
      <div style={coinStyle}>
        <img className='text-center' src="/golden.png" alt="Coin" style={imageStyle} />
      </div>
    </div>
  );
};

export default Coin;
