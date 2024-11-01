import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'; // Import eye icon
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'; // Import eye off icon

const VerificationPage = () => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(false); // State for code visibility
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();
    const data = { code };

    console.log('Sending data:', data);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/verifysignup', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response.data);

      if (response.data.success) {
        setMessage('Account Created Successfully!');
        setShowSuccess(true);

        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setMessage('Invalid or expired code. Please try again.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
        setMessage(error.response.data.message || 'Invalid or expired code. Please try again.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setMessage('No response received from the server.');
      } else {
        console.error('Error message:', error.message);
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  const toggleCodeVisibility = () => {
    setIsCodeVisible((prev) => !prev); // Toggle visibility
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50">
      <div className="flex flex-col justify-center items-start w-full md:w-[600px] m-8 md:mr-4">
        <a href="/" className="text-blue-600 text-2xl ml-8 font-semibold mb-6">
          <span className="material-icons"></span> Enter The Verification Code to Continue
        </a>
        <div className="space-y-6 ml-8">
          <a href="/login" className="text-sm text-gray-600 hover:text-gray-900">&lt; Back to login</a>
          <h1 className="text-3xl font-bold text-gray-800">Verify code</h1>
          <p className="text-gray-600">An authentication code has been sent to your email.</p>
          <form onSubmit={handleVerification} className="space-y-4">
            <div className="flex items-center border-b border-gray-300 py-2">
              <input
                type={isCodeVisible ? 'text' : 'password'} // Change input type based on visibility
                placeholder="Enter Code"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <button type="button" onClick={toggleCodeVisibility} className="text-gray-500 focus:outline-none">
                {isCodeVisible ? (
                  <VisibilityOffIcon /> // Eye off icon for hiding code
                ) : (
                  <RemoveRedEyeIcon /> // Eye icon for showing code
                )}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Didn’t receive a code? <a href="#" className="text-blue-600 hover:underline">Resend</a></span>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Verify
            </button>
          </form>
          {message && <p className="text-center">{message}</p>}
          {showSuccess && (
            <div className="flex items-center justify-center mt-4">
              <div className="flex items-center animate-pulse">
                <span className="material-icons text-green-600">check_circle</span>
                <span className="ml-2 text-green-600 text-lg font-bold">Account Created Successfully!</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:flex w-[400px] h-[500px] ml-4">
        <img
          src="forgot.png" // Replace with the correct path
          alt="Illustration"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default VerificationPage;
