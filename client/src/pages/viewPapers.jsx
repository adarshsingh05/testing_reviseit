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

const ViewPapers = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("subject");
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/files");
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
            <IoSearch className=" text-white"/>
              Search</Button>

            <Link to='/upload' className="w-full sm:w-auto">

              <Button className="w-full sm:w-auto">
              <TbArrowBackUp className='text-white'/>
              Go to Uploads</Button> 
            </Link>
            <Button onClick={handleReset} className="w-full sm:w-auto">
            <MdLockReset className='text-white' />
              Reset Search</Button>

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
                      {file.tags ? file.tags.join(", ") : "No tags available"}
                    </p>
                  </CardContent>
                  <p className="ml-6"><strong> Exam Date:</strong> {formatDateToDDMMYYYY(file.examDate)}</p>    
                  <CardFooter className="flex justify-end">
                    <a
                      href={`http://localhost:5000/${file.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>
                      <GrView className='text-white' />
                        View Paper</Button>
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
    <div className="flex w-full h-auto ">
    <Footer/>
</div>
</>
  );
};

export default ViewPapers;
