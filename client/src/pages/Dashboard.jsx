import React, { useEffect, useState } from "react";
import useAuthStore from "@/store/authStore";
import { CircleLoader } from 'react-spinners';
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MenubarDemo } from "@/components/menubar";
import { CgLogIn } from "react-icons/cg";
import { FaCoins, FaUpload, FaDownload, FaUser, FaEnvelope, FaEdit } from "react-icons/fa";
import Footer from "@/components/footer";
import RankingComponent from "@/components/RankingComponent";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  const { checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    const checkUserAuth = async () => {
      await checkAuth();
      setLoading(false);
    };
    checkUserAuth();
  }, [checkAuth]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("https://testing-reviseit-1.onrender.com/api/auth/logout");
      useAuthStore.setState({ user: null, isAuthenticated: false });
      navigate("/");
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const allUser = async () => {
    try {
      const fetchedUser = await axios.get("https://testing-reviseit-1.onrender.com/api/auth/alluser");
      console.log(fetchedUser);
      console.log("All users fetched successfully");
    } catch (error) {
      console.log("Error fetching users", error);
    }
  };
  
  allUser();

  if (loading) {
    return (
      <div>
        <div className="flex justify-center mt-6">
          <CircleLoader color="#4a90e2" loading={loading} size={300} />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <div>
        <nav
          className={`flex justify-between items-center w-full h-[100px] sticky top-0 z-10 rounded-full transition-all duration-300 ${
            isScrolled ? "bg-white/30 backdrop-blur-lg" : "bg-transparent"
          }`}
        >
          <img
            className="h-[80px] md:h-[100px] w-[100px] md:w-[200px] m-6"
            src="/image.png"
            alt="Logo"
          />
          <MenubarDemo />
          <Button
            className="m-6 bg-[#d9d9d9] text-black font-bold border border-black hover:text-white flex items-center space-x-2"
            onClick={handleLogout}
          >
            <CgLogIn />
            <span>Logout</span>
          </Button>
        </nav>
      </div>

      {user && (
        <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-gray-100">
          <div className="ml-4 md:ml-1 w-full md:w-[60%] max-w-3xl bg-white shadow-lg rounded-lg p-6 flex flex-col items-center mb-4 md:mb-0">
            <div className="bg-[#d9d9d9] rounded-full h-[80px] w-[80px] flex items-center justify-center text-3xl font-mono cursor-pointer text-gray-700 mb-4">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
              <FaUser className="text-blue-500" />
              <span>{user.name.toUpperCase()}</span>
            </div>

            <div className="w-full flex flex-col space-y-3">
              <div className="bg-gray-50 p-4 rounded-md flex items-center space-x-3">
                <FaEnvelope className="text-purple-500" />
                <span className="text-gray-700">Email: {user.email}</span>
              </div>

              <div className="bg-gray-50 p-4 rounded-md flex items-center space-x-3">
                <FaCoins className="text-yellow-500" />
                <span className="text-gray-700">Available Coins: {user.coins}</span>
              </div>

              <div className="bg-gray-50 p-4 rounded-md flex items-center space-x-3">
                <FaUpload className="text-green-500" />
                <span className="text-gray-700">Total Papers Uploaded: {user.paperUpload}</span>
              </div>

              <div className="bg-gray-50 p-4 rounded-md flex items-center space-x-3">
                <FaDownload className="text-red-500" />
                <span className="text-gray-700">Total Papers Downloaded: {user.paperDownload}</span>
              </div>

              <div className="bg-gray-50 p-4 rounded-md flex items-center space-x-3">
                <FaEdit className="text-gray-500" />
                <span className="text-gray-700">Number of Mock Tests: Coming Soon</span>
              </div>
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className="w-full md:w-[30%] ml-3 md:ml-0">
            <RankingComponent  />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Dashboard;
