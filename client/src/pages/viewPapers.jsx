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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar"; // Adjust the path according to your structure

const ViewPapers = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // State for the search term
  const [searchBy, setSearchBy] = useState("subject"); // State for search type (subject or exam type)
  const [filteredFiles, setFilteredFiles] = useState([]); // State for filtered files

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/files"); // Adjust this URL for production
        setFiles(response.data);
        setFilteredFiles(response.data); // Initialize filtered files with all files
      } catch (err) {
        console.error("Error fetching files:", err);
        setError("Failed to fetch files.");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Convert input to lowercase for case-insensitive search
  };

  // Handle search type change
  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  // Handle search button click
  const handleSearchClick = () => {
    const term = searchTerm.toLowerCase();
    const newFilteredFiles = files.filter((file) => {
      return searchBy === "subject"
        ? file.subject.toLowerCase().includes(term) // Filter by subject name
        : file.examType.toLowerCase().includes(term); // Filter by exam name
    });
    setFilteredFiles(newFilteredFiles);
  };

  return (
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

          {/* Search Bar and Dropdown */}
          <div className="mb-6 flex justify-center items-center space-x-4">
            <select
              value={searchBy}
              onChange={handleSearchByChange}
              className="border border-gray-300 rounded-lg p-2"
            >
              <option value="subject">Search by Subject</option>
              <option value="examType">Search by Exam Type</option>
            </select>
            <input
              type="text"
              placeholder={`Search by ${searchBy}...`}
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-lg p-2 w-1/2"
            />
            <Button onClick={handleSearchClick}>Search</Button> {/* Add click handler */}
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
                    <p>Exam Type: {file.examType};</p>
                    <p>
                      <strong>Tags:</strong>{" "}
                      {file.tags ? file.tags.join(", ") : "No tags available"}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <a
                      href={`http://localhost:5000/${file.filePath}`} // Adjust for production
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button>View Paper</Button>
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ViewPapers;
