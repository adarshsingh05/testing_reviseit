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
    <div className=" min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-mono text-center mb-6 mt-4">Upload Question Papers,Help other</h1>

      <div className="flex flex-col  p-6">
        <form onSubmit={handleSubmit} className=" p-6 rounded-lg shadow-lg shadow-gray-700  space-y-4 w-full max-w-md">
          <p className='text-center font-sans font-medium text-l'>Fill the Below Form to Upload the Paper</p>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
            <input
              type="text"
              placeholder="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exam Slot</label>
            <input
              type="text"
              placeholder="Exam Slot"
              value={examSlot}
              onChange={(e) => setExamSlot(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded w-full"
            >
              <option value="" disabled>Select Exam Type</option>
              <option value="CAT 1">CAT 1</option>
              <option value="CAT 2">CAT 2</option>
              <option value="FAT">FAT</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <Button type="submit" className="bg-purple-500 text-white text-xl font-bold px-4 py-2 rounded-3xl w-full hover:bg-purple-600 transition duration-200">
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
