import React, { useState } from "react";
import { CircleLoader } from 'react-spinners';  // Import CircleLoader from react-spinners

import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Input from "@/components/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import OauthLogin from "@/components/ui/OauthLogin";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { email, password };

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", data, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data.success) {
        setSuccessDialogVisible(true);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/");
        }, 1000);
      } else {
        setIsLoading(false);
        alert("Invalid login credentials");
      }
    } catch (error) {
      setIsLoading(false);
      alert("An error occurred during login");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-100 to-purple-300">
      <div className="relative w-full max-w-md  rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-4">Welcome Back !! </h1>
        <OauthLogin />
        <hr className="mb-4" />
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            icon={Mail}
            className="w-full"
            type="text"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="relative">
            <Input
              icon={Lock}
              className="w-full"
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="absolute right-3 top-2 cursor-pointer" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <Link to="/forgetpassword" className="text-[#ff664e]">Forgot Password?</Link>
            <Link to="/signup">Don't Have an Account? <span className="text-[#ff664e]">Signup Here</span></Link>
          </div>
          <div className="flex justify-center mt-4">
            <Button
              className="bg-[#2f2e2e] text-white hover:bg-[#000000] w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <div className="flex justify-center mt-6">
    <CircleLoader color="#4a90e2" loading={isLoading} size={30} />
</div> : "Login"}
            </Button>
          </div>
        </form>
      </div>
      {successDialogVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md text-center">
            <h2 className="text-lg font-semibold">Logged in successfully! Redirecting to Home...</h2>
            <CircleLoader color="#4a90e2" loading={isLoading} size={30} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
