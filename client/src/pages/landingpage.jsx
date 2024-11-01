import Footer from "@/components/footer";
import Motivation from "@/components/Motivation";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from '@/store/authStore'

const LandingPage = () => {
  // getting the user object
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();


  // Call checkAuth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Function to format the date to a readable format
  const getCurrentDate = () => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };
 
  return (
    <div className="">
      <Navbar />
      <div className="w-full flex flex-row justify-center items-center">
        {/* Top Banner Section */}
        <div className="bg-gradient-to-r from-purple-500 to-gray-400 text-white py-8 px-6 rounded-2xl h-[200px] w-[80%] flex flex-col md:flex-row items-center justify-around m-6 mt-10">
          <div className="flex flex-col space-y-2">
            <p className="text-sm">{getCurrentDate()}</p> {/* Display dynamic date here */}
            <h1 className="text-2xl font-bold">
              Welcome back, {user ? user.name : "Guest"}!
            </h1>
            <p className="text-base">Always stay updated in your student portal</p>
          </div>

          {/* Decorative Images */}
          <div className="relative flex items-center mt-4 md:mt-0 space-x-4">
            <div className="flex items-center justify-center">
              <img
                src="/Scholarcap scroll.png"
                alt="Graduation Hat"
                className="w-auto h-[auto] object-contain hidden md:flex"
              />
            </div>

            <div className="flex items-center justify-center">
              <img
                src="/collegestudent.png"
                alt="College Student"
                className="w-auto h-[180px] object-contain hidden md:flex"
              />
            </div>

            <div className="flex items-center justify-center">
              <img
                src="/Backpack.png"
                alt="Backpack"
                className="w-auto h-[auto] object-contain hidden md:flex"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="h-[100%] flex flex-col items-center justify-center">
        <div className="p-6 max-w-[100%] md:max-w-[80%] flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="text-left space-y-4 md:max-w-sm m-6">
            <span className="bg-black h-5 text-white px-4 py-1 rounded-full text-s font-bold uppercase tracking-wide">
              All for Free
            </span>
            <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
              Get all VIT Exam Papers, Subject-wise Notes, Mock Papers, and a Lot more at one Stop Place
            </h1>
            <p className="text-sm text-gray-600">Crafted By</p>
            <p className="text-lg font-bold text-gray-900">Open Source Contributors</p>
            <Link to="/upload">
              <Button className="m-3">Upload Papers</Button>
            </Link>
            <Link to="/viewpapers">
              <Button className="m-3">Download Papers</Button>
            </Link>
          </div>

          <div className="flex-shrink-0 m-7 bg-white rounded-full">
            <img src="/image 21.png" alt="Illustrations" className="w-full h-auto object-cover m-8" />
          </div>
        </div>

        <Motivation />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;

