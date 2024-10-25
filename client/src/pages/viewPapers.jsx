// src/pages/ViewPapers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar"; // Adjust the path according to your structure
import { Progress } from "@radix-ui/react-progress";

const ViewPapers = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // State for the search term
    const [searchBy, setSearchBy] = useState("subject"); // State for search type (subject or exam type)

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axios.get("http://localhost:5000/files"); // Adjust this URL for production
                setFiles(response.data);
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

    // Filter files based on the search term and selected search type
    const filteredFiles = files.filter(file => {
        const term = searchTerm.toLowerCase();
        return searchBy === "subject"
            ? file.subject.toLowerCase().includes(term) // Filter by subject name
            : file.examType.toLowerCase().includes(term); // Filter by exam name
    });

    return (
        <div className="bg-[#FAEBEA] min-h-screen">
            <Navbar />
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <Progress value={100} className="w-72 h-4 bg-blue-500" /> {/* Customize the loader */}
                </div>
            ) : (
                <div className="container mx-auto p-6">
                    <h2 className="text-3xl font-bold text-center mb-6">Uploaded Papers</h2>

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
                    </div>

                    {filteredFiles.length === 0 ? (
                        <p className="text-center text-gray-600">No papers found for the given search.</p>
                    ) : (
                        <ul className="space-y-4">
                            {filteredFiles.map((file) => (
                                <li key={file._id} className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
                                    <strong className="text-lg">Semester:</strong> {file.semester} <br />
                                    <strong className="text-lg">Subject:</strong> {file.subject} <br />
                                    <strong className="text-lg">Exam Slot:</strong> {file.examSlot} <br />
                                    <strong className="text-lg">Exam Type:</strong> {file.examType} <br />
                                    <strong className="text-lg">Tags:</strong> {file.tags ? file.tags.join(", ") : "No tags available"} <br />
                                    <a
                                        href={`http://localhost:5000/${file.filePath}`} // Adjust for production
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-block text-blue-600 underline hover:text-blue-800"
                                    >
                                        View Paper
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default ViewPapers;
