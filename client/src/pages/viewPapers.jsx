import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaTimes } from 'react-icons/fa'; // Font Awesome icon
import { IoSearch } from "react-icons/io5";
import { GrView } from "react-icons/gr";
import { TbArrowBackUp } from "react-icons/tb";
import { MdLockReset } from "react-icons/md";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar"; // Adjust the path according to your structure
import { Link } from "react-router-dom";
import Footer from "@/components/footer";

import useAuthStore from '@/store/authStore'

// Modal Component
const Modal = ({ isVisible, onClose, message }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-5 rounded shadow-lg">
      <h2 className="text-xl mb-4 flex flex-row mr-6"> <FaTimes/>Insufficient Coins</h2>
      <p>{message}</p>
      <div className="flex justify-between mt-4">
          <Link to='/upload'>
      <button className="bg-black text-white px-4 py-2 rounded">
          Upload
        </button>
        </Link>
        <button onClick={onClose} className="bg-black text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  </div>
  );
};

const ViewPapers = () => {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  const userId = user._id;
  var coin = Number(-50);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("subject");
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [modalMessage, setModalMessage] = useState(""); // Modal message state

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/view");
        setFiles(response.data);
        setFilteredFiles(response.data);
      } catch (err) {
        console.error("Error fetching files:", err);
        setError("Failed to fetch files.");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  // update coin
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
      console.log('Coins uploaded successfully!');
    } catch (error) {
      if (error.response) {
        console.log('Error uploading coins:', error.response.data);
      } else {
        console.log('Error uploading coins:', error);
      }
      console.log('Error uploading coins.'); // Error message
    }
  };

  // paper download count
  const updateDownloadUploadCount = async () => {
    const uploadData = {
        userId: userId,
        paperDownloadCount: Number(1), // Make sure coin is a number
    };

    console.log('Sending paper upload data:', uploadData);
    
    try {
        await axios.post('http://localhost:5000/api/auth/paperdownload', uploadData, {
            headers: {
                'Content-Type': 'application/json', // Ensure JSON content type
            },
        });
        // setMessage('Paper and Coins uploaded successfully! Thanx'); // Success message
        console.log("paper download data sent successfully")
    } catch (error) {
        if (error.response) {
            console.error('Error uploading paper data:', error.response.data);
        } else {
            console.error('Error uploading paper:', error);
        }
        setMessage('Error uploading paperdata.'); // Error message
    }
};

  const formatDateToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    setSearchTerm("");
    setSearchDate("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const handleSearchClick = () => {
    const term = searchTerm.toLowerCase();
    const newFilteredFiles = files.filter((file) => {
      if (searchBy === "subject") {
        return file.subject.toLowerCase().includes(term);
      } else if (searchBy === "examType") {
        return file.examType.toLowerCase().includes(term);
      } else if (searchBy === "date") {
        return formatDateToDDMMYYYY(file.examDate) === formatDateToDDMMYYYY(searchDate);
      }
      return true;
    });
    setFilteredFiles(newFilteredFiles);
  };

  const handleReset = () => {
    setSearchTerm("");
    setSearchDate("");
    setFilteredFiles(files);
  };

  const handleViewPaperClick = (file) => {
    if (user.coins < 50) {
      setModalMessage("Insufficient coins, please upload paper to earn coins");
      setIsModalVisible(true); // Show modal
    } else {
      window.open(`https://oqufvztnijspmjevvccb.supabase.co/storage/v1/object/public/user_docs/${file.filePath}`, "_blank");
      updatecoin(); // Call updatecoin if the user has enough coins
      updateDownloadUploadCount();
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <Navbar />

        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Progress value={100} className="w-72 h-4 bg-blue-500" />
          </div>
        ) : (
          <div className="container mx-auto p-6">
            <h1 className="text-5xl font-mono text-center mb-6">All Question Papers</h1>
            <h3 className="text-xl font-mono text-center mb-6">One Click Download</h3>

            {error && <div className="text-center text-red-500">{error}</div>}

            {/* Responsive Search Bar and Dropdown */}
            <div className="mb-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <select
                value={searchBy}
                onChange={handleSearchByChange}
                className="border border-gray-300 rounded-lg p-2 w-full sm:w-auto"
              >
                <option value="subject">Search by Subject</option>
                <option value="examType">Search by Exam Type</option>
                <option value="date">Search by Date</option>
              </select>

              {searchBy === "date" ? (
                <input
                  type="date"
                  value={searchDate}
                  onChange={handleDateChange}
                  className="border border-gray-300 rounded-lg p-2 w-full sm:w-auto"
                />
              ) : (
                <input
                  type="text"
                  placeholder={`Search by ${searchBy}...`}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/2"
                />
              )}

              <Button onClick={handleSearchClick} className="w-full sm:w-auto">
                <IoSearch className=" text-white" />
                Search
              </Button>

              <Link to='/upload' className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">
                  <TbArrowBackUp className='text-white' />
                  Go to Uploads
                </Button>
              </Link>

              <Button onClick={handleReset} className="w-full sm:w-auto">
                <MdLockReset className='text-white' />
                Reset Search
              </Button>
            </div>

            {filteredFiles.length === 0 ? (
              <p className="text-center text-gray-600">No papers found for the given search.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFiles.map((file) => (
                  <Card key={file._id} className="w-full shadow-lg shadow-gray-700">
                    <CardHeader>
                      <CardTitle><span className="text-l font-bold">SUBJECT :</span> {file.subject}</CardTitle>
                      <CardDescription className='mt-4'>{`Semester: ${file.semester} | Exam Slot: ${file.examSlot}`}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p><strong>Exam Type</strong>: {file.examType};</p>
                      <p>
                        <strong>Tags:</strong>{" "}
                        {file.tags ? file.tags.join(", ") : "No tags"}
                      </p>
                      <p><strong>Uploaded on:</strong> {formatDateToDDMMYYYY(file.uploadDate)}</p>
                      <p><strong>Exam Date:</strong> {formatDateToDDMMYYYY(file.examDate)}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button onClick={() => handleViewPaperClick(file)} className="bg-black">
                        <GrView className="text-white" /> View Paper
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
        {/* Modal for insufficient coins */}
        <Modal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          message={modalMessage}
        />
        <Footer />
      </div>
    </>
  );
};

export default ViewPapers;
