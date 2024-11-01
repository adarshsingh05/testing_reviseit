import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar'; // Importing Navbar
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'; // Importing Progress component from Shadcn UI
import { FaUpload, FaCalendarAlt, FaBook, FaUserGraduate } from 'react-icons/fa'; // Importing icons
import { FaCheckToSlot } from "react-icons/fa6";
import Footer from '@/components/footer';
import useAuthStore from '@/store/authStore'

const UploadPage = () => {
   // getting the user object
   const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
    
    const userId= user._id;
    var coin=Number(100);
    // const coinData = {userId,coin};
  const [file, setFile] = useState(null);
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [examSlot, setExamSlot] = useState('');
  const [examType, setExamType] = useState('');
  const [examDate, setExamDate] = useState('');
  const [message, setMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const updatecoin = async () => {
    const coinData = {
        userId: userId,
        amount: Number(coin), // Make sure coin is a number
    };

    console.log('Sending coin data:', coinData);
    
    try {
        await axios.post('http://localhost:5000/api/auth/updatecoins', coinData, {
            headers: {
                'Content-Type': 'application/json', // Ensure JSON content type
            },
        });
        setMessage('Paper and Coins uploaded successfully! Thanx'); // Success message
    } catch (error) {
        if (error.response) {
            console.error('Error uploading coins:', error.response.data);
        } else {
            console.error('Error uploading coins:', error);
        }
        setMessage('Error uploading coins.'); // Error message
    }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append('file', file);
    formData.append('semester', semester);
    formData.append('subject', subject);
    formData.append('examSlot', examSlot);
    formData.append('examType', examType);
    formData.append('examDate', examDate);

    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          const percentage = Math.floor((current * 100) / total);
          setUploadProgress(percentage); // Update the progress state
        },
      });

      setMessage('File uploaded successfully!'); // Success message
     
     await updatecoin();
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file.'); // Error message
    } finally {
      setLoading(false); // Stop loading
      setUploadProgress(0); // Reset progress bar
    }
  };

  return (
    <>
    <div className=" bg-gray-50 ">
      <Navbar />
      <h1 className="text-4xl font-mono font-semibold text-center mb-6 mt-4 text-[#f692a1]">
        Upload Question Papers, Help Others
      </h1>
<div className='flex flex-row'>
      <div className="flex flex-col md:ml-14 p-6 w-[100] md:w-[40%]">
        <form onSubmit={handleSubmit} className="p-6 rounded-lg shadow-xl bg-white space-y-4 w-full max-w-md">
          <p className="text-center font-sans font-semibold text-lg text-gray-800">
            Fill the Below Form to Upload the Paper
          </p>

          {/* Semester Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1  items-center">
              <FaUserGraduate className="mr-2 text-gray-500" /> Semester
            </label>
            <input
              type="text"
              placeholder="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Subject Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 items-center">
              <FaBook className="mr-2 text-gray-500" /> Subject
            </label>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Exam Slot Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaCheckToSlot className="mr-2 text-gray-500" /> Exam Slot

              </label>
            <input
              type="text"
              placeholder="Exam Slot"
              value={examSlot}
              onChange={(e) => setExamSlot(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Exam Date Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1  items-center">
              <FaCalendarAlt className="mr-2 text-gray-500" /> Exam Date
            </label>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Exam Type Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple-500"
            >
              <option value="" disabled>Select Exam Type</option>
              <option value="CAT 1">CAT 1</option>
              <option value="CAT 2">CAT 2</option>
              <option value="FAT">FAT</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Upload File Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1  items-center">
              <FaUpload className="mr-2 text-gray-500" /> Upload File
            </label>
          
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-[#8bdbcc] text-white text-xl font-bold px-4 py-2 rounded-3xl w-full hover:bg-[#49dec3] transition duration-200 ease-in-out shadow-lg"
          >
            Upload
          </Button>
        </form>

        {/* Progress bar and message display */}
        {loading && (
          <div className="w-full max-w-md mt-4">
            <Progress value={uploadProgress} className="h-4 bg-blue-500 rounded" />
          </div>
        )}
        {message && (
          <p className="mt-4 text-center text-lg font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
      <img className='hidden md:block h-19 w-[60%] h-19' src='/uploadbg.jpeg' alt=''></img>
      </div>
    </div>
    <div>
    <Footer/>

    </div>
          </>
  );
};

export default UploadPage;
