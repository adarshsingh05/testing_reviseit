import React, { useState } from 'react';
import {supabase} from '../utils/supabaseClient'
import { CircleLoader } from 'react-spinners';  // Import CircleLoader from react-spinners
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'; 
import { FaUpload, FaCalendarAlt, FaBook, FaUserGraduate } from 'react-icons/fa'; 
import { FaCheckToSlot } from "react-icons/fa6";
import Footer from '@/components/footer';
import useAuthStore from '@/store/authStore';
import axios from 'axios';
import CoinModal from '@/components/coin component/CoinModal';


const UploadPage = () => {
    const [isCoinModalOpen, setIsCoinModalOpen] = useState(false); // State for CoinModal visibility
    const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
    const userId = user._id;
    const coin = Number(100);

    const [file, setFile] = useState(null);
    const [semester, setSemester] = useState('');
    const [subject, setSubject] = useState('');
    const [examSlot, setExamSlot] = useState('');
    const [examType, setExamType] = useState('');
    const [examDate, setExamDate] = useState('');
    const [message, setMessage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    
    const closeCoinModal = () => {
        setIsCoinModalOpen(false); // Close the modal
    };

    // update coin function
    
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
}


// paper upload count
const updatePaperUploadCount = async () => {
  const uploadData = {
      userId: userId,
      paperUploadCount: Number(1), // Make sure coin is a number
  };

  console.log('Sending paper upload data:', uploadData);
  
  try {
      await axios.post('http://localhost:5000/api/auth/paperupload', uploadData, {
          headers: {
              'Content-Type': 'application/json', // Ensure JSON content type
          },
      });
      // setMessage('Paper and Coins uploaded successfully! Thanx'); // Success message
      console.log("paper data sent successfully")
  } catch (error) {
      if (error.response) {
          console.error('Error uploading paper data:', error.response.data);
      } else {
          console.error('Error uploading paper:', error);
      }
      setMessage('Error uploading paperdata.'); // Error message
  }
};

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      if (!file) {
          setMessage('Please select a file to upload.');
          setLoading(false);
          return;
      }
  
      const uniqueFilePath = `${userId}/${Date.now()}-${file.name}`;
  
      try {
          // Upload file to Supabase
          const { data, error } = await supabase.storage.from('user_docs').upload(uniqueFilePath, file, {
              cacheControl: '3600',
              upsert: false,
          });
  
          if (error) {
              throw error;
          }
  
          // Insert metadata into the 'documents' table
          const { error: dbError } = await supabase.from('documents').insert([
              {
                  userId,
                  semester: semester.toUpperCase(),
                  subject: subject.toUpperCase(),
                  examSlot: examSlot.toUpperCase(),
                  examType: examType.toUpperCase(),
                  examDate,
                  filePath: uniqueFilePath,
                  uploadedBy: user.name,
              }
          ]);
  
          if (dbError) {
              throw dbError;
          }
  
          setMessage('File uploaded successfully!');
          setSemester('');
          setSubject('');
          setExamSlot('');
          setExamType('');
          setExamDate('');
          setFile(null);
          await updatecoin();
     await updatePaperUploadCount();
     setIsCoinModalOpen(true); // Open the CoinModal on successful upload

  
      } catch (error) {
          console.error('Error uploading file:', error);
          setMessage('Error uploading file.');
      } finally {
          setLoading(false);
          setUploadProgress(0);
      }
  };
  

    return (
        <>
            <div className="bg-gray-50">
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
                                <label className="block text-sm font-medium text-gray-700 mb-1 items-center">
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
                                <label className="block text-sm font-medium text-gray-700 mb-1 items-center">
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
                                    <option value="Other">Modal Papers</option>
                                </select>
                            </div>

                            {/* Upload File Field */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 items-center">
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
                            <div className="flex justify-center mt-6">
                            <CircleLoader color="#4a90e2" loading={loading} size={50} />
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
            <CoinModal isOpen={isCoinModalOpen} onClose={closeCoinModal} /> {/* Pass props to CoinModal */}
                <Footer />
            </div>
        </>
    );
};

export default UploadPage;
