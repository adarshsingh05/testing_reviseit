import React, { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MenubarDemo } from "@/components/menubar";
import { CgLogIn } from "react-icons/cg";

const Dashboard = () => {
  
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const { checkAuth, isAuthenticated, user } = useAuthStore();

  // Call checkAuth on mount
  useEffect(() => {
    const checkUserAuth = async () => {
      await checkAuth();
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

  // Handle logout function
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout");
      useAuthStore.setState({ user: null, isAuthenticated: false }); // Clear auth state
      navigate("/"); // Redirect to home after logout
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, display an error message to the user
    }
  };

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
          <MenubarDemo />{" "}
          <Button
            className="m-6 bg-[#d9d9d9] text-black font-bold border border-black hover:text-white flex items-center space-x-2"
            onClick={handleLogout}
          >
            <CgLogIn />
            <span>Logout</span>
          </Button>
        </nav>
      </div>

      <div> Your Coins : {user.coins}</div>
      
    </>
  );
};

export default Dashboard;
