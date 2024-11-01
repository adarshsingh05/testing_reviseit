import React, { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye"; // Import eye icon for showing password
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"; // Import eye off icon for hiding password

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Login successful:", response.data);

      if (response.data.success) {
        // Show success dialog
        setSuccessDialogVisible(true);
        
        // Wait for 1 second before navigating
        setTimeout(() => {
          setIsLoading(false); // Stop loading
          navigate("/"); // Navigate to home page
        }, 1000); // 1 second
      } else {
        // Handle login failure (optional)
        setIsLoading(false);
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setIsLoading(false);
      alert("An error occurred during login");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev); // Toggle password visibility
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 animate-light-gradient opacity-70"></div>

      {/* Main Content Container */}
      <div className="relative flex flex-col md:flex-row items-center justify-center w-full max-w-4xl bg-white rounded-md shadow-lg">
        {/* Image Section - Hidden on Smaller Screens */}
        <img
          className="w-full h-auto md:w-[45%] md:h-[450px] hidden md:block rounded-l-md p-4"
          src="/login.png"
          alt="Login Illustration"
        />

        {/* Login Form Section */}
        <div className="w-full md:w-[75%] p-8 md:p-14 flex flex-col items-center justify-center bg-opacity-90">
          <h1 className="text-3xl text-center mb-8 font-mono">
            Welcome Back to, <span className="text-green-500">ReviseIt</span>
          </h1>
          <form onSubmit={handleLogin} className="w-full space-y-4">
            <Input
              icon={Mail}
              className="w-full"
              type="text"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <Input
                icon={Lock}
                className="w-full"
                type={isPasswordVisible ? 'text' : 'password'} // Change type based on visibility
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // className="pr-12" // Add padding to the right for the icon
              />
              <span
                className="absolute right-3 top-2 text-gray-400 cursor-pointer mb-2"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
              </span>
            </div>
            <div className="flex flex-row justify-between text-sm">
              <Link to="/forgetpassword" className="text-[#ff664e]">
                Forgot Password?
              </Link>
              <Link to="/signup">
                Don't Have an Account? <span className="text-green-500">Signup Here</span>
              </Link>
            </div>

            {/* Centered Button */}
            <div className="flex justify-center mt-6">
              <Button
                className="text-green-400 bg-gray-800 w-auto md:w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="w-6 h-6 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* Success Dialog */}
      {successDialogVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h2 className="text-lg font-semibold">Logged in successfully! Redirecting to the Home Page</h2>
            <div className="flex justify-center items-center mt-4">
              <Loader className="w-8 h-8 animate-spin text-green-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
