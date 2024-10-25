import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar'; // Importing Navbar
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'; // Importing Progress component from Shadcn UI

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [examSlot, setExamSlot] = useState('');
  const [examType, setExamType] = useState('');
  const [message, setMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [loading, setLoading] = useState(false); // State to track loading status

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file.'); // Error message
    } finally {
      setLoading(false); // Stop loading
      setUploadProgress(0); // Reset progress bar
    }
  };

  return (
    <div className="bg-[#FAEBEA] min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4">Upload Exam Paper</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4 w-full max-w-md">
          <input
            type="text"
            placeholder="Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            placeholder="Exam Slot"
            value={examSlot}
            onChange={(e) => setExamSlot(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            placeholder="examType"
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="p-2 border border-gray-300 rounded w-full"
          />
          <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
            Upload
          </Button>
        </form>

        {/* Progress bar and message display */}
        {loading && (
          <div className="w-full max-w-md mt-4">
            <Progress value={uploadProgress} className="h-4 bg-blue-500" />
          </div>
        )}
        {message && <p className="mt-4 text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default UploadPage;
