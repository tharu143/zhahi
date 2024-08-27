import React, { useState } from 'react';
import axios from 'axios';
import { searchStudents, getStudentById } from "../api/studentApi";

const API_URL = "http://localhost:5000/api/attendance";

const StudentAttendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [status, setStatus] = useState(''); // 'Present', 'Absent', 'OD', 'HOLIDAY'
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission

    try {
      if (!searchTerm) {
        setError("Please enter a search term.");
        return;
      }

      let student;
      if (searchTerm.includes("zhahi")) {
        student = await getStudentById(searchTerm);
      } else {
        const studentsByName = await searchStudents(searchTerm);
        student = studentsByName.length > 0 ? studentsByName[0] : null;
      }

      if (student) {
        setStudentData(student);
        setError(null);
      } else {
        setError("No student found.");
        setStudentData(null);
      }
    } catch (error) {
      setError("Failed to search student.");
      console.error("Error searching student:", error);
    }
  };

  const handleAttendanceChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateAttendance = async () => {
    if (studentData) {
      const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
      try {
        await axios.put(`${API_URL}/update-attendance`, {
          studentId: studentData._id, // Assuming studentData has _id field
          date: today,
          status,
        });
        alert('Attendance status updated successfully');
      } catch (err) {
        alert('Failed to update attendance status');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-6 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search by student name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {studentData && (
        <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md">
          <div className="flex items-center mb-4">
            {studentData.studentPicPath ? (
              <img
                src={studentData.studentPicPath}
                alt={`${studentData.name}'s photo`}
                className="w-44 h-34 object-cover rounded-full mr-4"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full mr-4 flex items-center justify-center">
                <span className="text-gray-500">No Photo</span>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-semibold mb-2">{studentData.name} ({studentData.studentId})</h2>
              <p className="mb-2">Department: {studentData.department}</p>
              <p className="mb-4">Degree: {studentData.degree}</p>
            </div>
          </div>
          <select
            onChange={handleAttendanceChange}
            value={status}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Attendance Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="OD">OD</option>
            <option value="HOLIDAY">HOLIDAY</option>
          </select>
          <button
            onClick={handleUpdateAttendance}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
