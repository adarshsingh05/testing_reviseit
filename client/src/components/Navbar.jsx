import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { MenubarDemo } from './menubar';
import { CgLogIn } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import axios from 'axios';

const Navbar = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate(); // Use navigate for redirecting
  const [isScrolled, setIsScrolled] = useState(false);

  // Call checkAuth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle logout function
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout');
      window.location.reload(); // Refresh the page
      
      navigate('/');
      console.log("logged out successfully") // Redirect to home or desired page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <nav
      className={`flex justify-between items-center w-full h-[100px] sticky top-0 z-10 rounded-full transition-all duration-300 ${
        isScrolled ? 'bg-white/30 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <img
        className='h-[80px] md:h-[100px] w-[100px] md:w-[200px] m-6'
        src='/image.png'
        alt='Logo'
      />
      <MenubarDemo />

      {isAuthenticated && user.isVerified ? (
        <Button
          className='m-6 bg-[#d9d9d9] text-black font-bold border border-black hover:text-white flex items-center space-x-2'
          onClick={handleLogout}
        >
          <CgLogIn />
          <span>Logout</span>
        </Button>
      ) : (
        <Link to='/login'>
          <Button className='m-6 bg-[#d9d9d9] text-black font-bold border border-black hover:text-white flex items-center space-x-2'>
            <CgLogIn />
            <span>Login</span>
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
