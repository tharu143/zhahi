import React, { useState } from 'react';
import axios from 'axios';

// Define the API URL
const API_URL = "http://localhost:5000/api/course/add";

const AddCourse = () => {
  // State variables to hold form data and messages
  const [courseName, setCourseName] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [courseModulesFile, setCourseModulesFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send file and other data
    const formData = new FormData();
    formData.append('courseName', courseName);
    formData.append('courseDuration', courseDuration);
    formData.append('courseModules', courseModulesFile); // 'courseModules' is the field name for the file

    try {
      // Post request to backend API with the form data
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle successful response
      setSuccessMessage(`Course added successfully: ${response.data.courseName}`);
      setCourseName('');
      setCourseDuration('');
      setCourseModulesFile(null);
      setErrorMessage('');
    } catch (error) {
      // Handle errors
      setErrorMessage(`Failed to add course: ${error.response?.data?.error || error.message}`);
      setSuccessMessage('');
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setCourseModulesFile(e.target.files[0]);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-lg mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Add New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">
            Course Name:
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">
            Course Duration:
            <input
              type="text"
              value={courseDuration}
              onChange={(e) => setCourseDuration(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">
            Course Modules (PDF):
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          Add Course
        </button>
      </form>
      {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
    </div>
  );
};

export default AddCourse;
