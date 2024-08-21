import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/attendance";

const StudentAttendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [status, setStatus] = useState(''); // 'Present' or 'Absent'
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');

    if (searchTerm) {
      try {
        const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
        const response = await axios.put(`${API_URL}/search-and-update`, {
          date: today,
          status,
        }, {
          params: { name: searchTerm }
        });

        setStudentData(response.data.student);
        setStatus(response.data.attendanceRecord ? response.data.attendanceRecord.status : ''); // Set status if available
      } catch (err) {
        console.error('Error fetching student:', err);
        setStudentData(null);
        setError('Student not found');
      }
    } else {
      setStudentData(null);
    }
  };

  const handleAttendanceChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateAttendance = async () => {
    if (studentData) {
      const today = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
      try {
        await axios.put(`${API_URL}/search-and-update`, {
          date: today,
          status,
        }, {
          params: { name: studentData.name }
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
          placeholder="Search by student name"
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
            {studentData.photoUrl ? (
              <img
                src={studentData.photoUrl}
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
