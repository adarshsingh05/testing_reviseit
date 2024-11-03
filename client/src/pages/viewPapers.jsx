import * as React from "react";
import { Oval } from 'react-loader-spinner';  // Import the circular loader
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import { FiDownload } from "react-icons/fi";
import { FaTimes } from 'react-icons/fa';
import { IoSearch } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";
import { MdLockReset } from "react-icons/md";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { Link } from "react-router-dom";
import Footer from "@/components/footer";

import useAuthStore from '@/store/authStore';

const Modal = ({ isVisible, onClose, message }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl mb-4 flex flex-row mr-6">
          <FaTimes /> Insufficient Coins
        </h2>
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
  const userId = user?._id;
  const coinCost = 50;
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("subject");
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const updateCoinBalance = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/updatecoins', { userId, amount: -coinCost });
      console.log('Coins deducted successfully!');
    } catch (error) {
      console.error('Error updating coins:', error.response ? error.response.data : error);
    }
  };

  const incrementDownloadCount = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/paperdownload', { userId, paperDownloadCount: 1 });
      console.log("Paper download count updated successfully");
    } catch (error) {
      console.error('Error updating download count:', error.response ? error.response.data : error);
    }
  };

  const formatDateToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? "Invalid date" : date.toLocaleDateString('en-GB');
  };

  const handleViewPaperClick = (file) => {
    if (user.coins < coinCost) {
      setModalMessage("Insufficient coins, please upload paper to earn coins");
      setIsModalVisible(true);
    } else {
      window.open(`https://oqufvztnijspmjevvccb.supabase.co/storage/v1/object/public/user_docs/${file.filePath}`, "_blank");
      updateCoinBalance();
      incrementDownloadCount();
    }
  };

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const results = files.filter((file) => {
      if (searchBy === "subject") return file.subject.toLowerCase().includes(term);
      if (searchBy === "examType") return file.examType.toLowerCase().includes(term);
      if (searchBy === "date") return formatDateToDDMMYYYY(file.examDate) === formatDateToDDMMYYYY(searchDate);
      return true;
    });
    setFilteredFiles(results);
    setCurrentPage(1);  // Reset to the first page after search
  };

  const resetSearch = () => {
    setSearchTerm("");
    setSearchDate("");
    setFilteredFiles(files);
    setCurrentPage(1);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFiles.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        {loading ? (
          <div className="flex justify-center items-center h-screen">
          <Oval 
            height={120} 
            width={120} 
            color="black"
            secondaryColor="white"
            visible={true}
            ariaLabel="loading-spinner"
            wrapperStyle={{}}
            wrapperClass=""
            strokeWidth={5}
            strokeWidthSecondary={2}
          />
        </div>
        ) : (
          <div className="container mx-auto p-6">
            <h1 className="text-5xl font-mono text-center mb-6">All Question Papers</h1>
            <h3 className="text-xl font-mono text-center mb-6">One Click Download</h3>
            {error && <div className="text-center text-red-500">{error}</div>}

            <div className="mb-6 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)} className="border border-gray-300 rounded-lg p-2 w-full sm:w-auto">
                <option value="subject">Search by Subject</option>
                <option value="examType">Search by Exam Type</option>
                <option value="date">Search by Date</option>
              </select>

              {searchBy === "date" ? (
                <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} className="border border-gray-300 rounded-lg p-2 w-full sm:w-auto" />
              ) : (
                <input type="text" placeholder={`Search by ${searchBy}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-gray-300 rounded-lg p-2 w-full sm:w-1/2" />
              )}

              <Button onClick={handleSearch} className="w-full sm:w-auto">
                <IoSearch className="text-white" /> Search
              </Button>
              <Link to='/upload' className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">
                  <TbArrowBackUp className='text-white' /> Go to Uploads
                </Button>
              </Link>
              <Button onClick={resetSearch} className="w-full sm:w-auto">
                <MdLockReset className='text-white' /> Reset Search
              </Button>
            </div>

            {filteredFiles.length === 0 ? (
              <p className="text-center text-gray-600">No papers found for the given search.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentItems.map((file) => (
                    <Card key={file._id} className="w-full shadow-lg shadow-gray-700">
                      <CardHeader>
                        <CardTitle className='text-lg  font-bold'>SUBJECT: {file.subject}</CardTitle>
                        <CardDescription className='mt-4'>{`Semester: ${file.semester} | Exam Slot: ${file.examSlot}`}
    
                        </CardDescription>
                       <div> {`Uploaded By: ${file.uploadedBy}`}</div>
                      </CardHeader>
                      <CardContent className="mt-1">
                        <h2 className="font-bold mb-2">Exam Type: {file.examType}</h2>
                        <h2 className=" font-bold mb-2">Exam Date: {formatDateToDDMMYYYY(file.examDate)}</h2>
                      </CardContent>
                      <CardFooter className="flex justify-center">
                        <Button onClick={() => handleViewPaperClick(file)}>
                          <FiDownload className="mr-2" /> Download Paper
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-center items-center mt-6 space-x-4">
                  <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}><GrFormPreviousLink /></Button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}><GrFormNextLink /></Button>
                </div>
              </>
            )}
          </div>
        )}
        <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} message={modalMessage} />
      </div>
      <Footer />
    </>
  );
};

export default ViewPapers;
