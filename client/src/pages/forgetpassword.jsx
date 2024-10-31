import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  // State to manage email input and modal visibility
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  const handlereset = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const data = {
      email: email,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgotpassword",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Mail reset sent:", response.data);
      setModalVisible(true); // Show the modal on success
    } catch (error) {
      console.error("Error sending reset mail:", error);
      // Optionally, you could show an error modal here
    }
  };

  const closeModal = () => {
    setModalVisible(false); // Function to close the modal
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-3xl font-mono">
        Enter Your Email to Reset the Password
      </div>

      <div className="flex flex-col lg:flex-row w-[60%] justify-around items-center mt-8 ">
        <div className="max-w-md ">
          <Link to="/login">
            <h3 className="text-sm text-gray-600 cursor-pointer mb-2">
              &larr; Back to Login
            </h3>
          </Link>

          <h1 className="text-2xl font-semibold mb-2">Forgot Your Password</h1>
          <h3 className="text-gray-600 mb-4">
            Don’t worry, happens to all of us. Enter your email below to recover
            your password
          </h3>

          <form className="mt-6" onSubmit={handlereset}>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="absolute -top-2 left-3 bg-[#f3f4f6] px-1 text-sm text-gray-500"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 pt-4 pb-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="your-email@gmail.com"
                required // Optional: Make email input required
              />
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center mt-8 lg:mt-0">
          <img
            className="w-[379.59px] h-[500.38px]"
            src="/forget.png"
            alt="Forgot Password Illustration"
          />
        </div>
      </div>

      {/* Modal for success message */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-2">
              Mail Sent Successfully!
            </h2>
            <p>Please check your email to reset your password.</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
