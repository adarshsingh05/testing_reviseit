import React, { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "@/components/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isloading = false;

  const handleLogin = (e) => {
    e.preventDefault();
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
              type="text"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 transition duration-200"
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-500 transition duration-200"
            />
            <div className="flex flex-row justify-between text-sm">
              <Link to="/forgotpassword" className="text-[#ff664e]">
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
                disabled={isloading}
              >
                {isloading ? (
                  <Loader className="w-6 h-6 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
