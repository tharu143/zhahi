import React, { useState } from "react";
import { searchStudents, getStudentById } from "../api/studentApi";
// import { upsertReportSheet } from "../api/reportSheetApi"; // Adjust import based on your file structure

const StudentReportSheet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [reportLink, setReportLink] = useState("");

  const handleSearch = async () => {
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
        setStudentDetails(student);
        setError(null);
      } else {
        setError("No student found.");
        setStudentDetails(null);
      }
    } catch (error) {
      setError("Failed to search student.");
      console.error("Error searching student:", error);
    }
  };

  const handleSaveReportLink = async () => {
    try {
      if (studentDetails) {
        // Ensure this matches the endpoint in your backend
        await fetch('http://localhost:5000/api/report-sheets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            studentId: studentDetails._id,
            reportLink: reportLink,
          }),
        });

        alert("Report link saved successfully.");
      }
    } catch (error) {
      setError("Failed to save report link.");
      console.error("Error saving report link:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Report Sheet</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or student ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Search
        </button>
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {studentDetails && (
        <div className="bg-gray-100 p-4 rounded shadow-md text-center">
          <div className="mb-4">
            <img
              src={studentDetails.studentPicPath}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full mx-auto"
            />
          </div>
          <div className="mb-2">
            <strong>ID:</strong> {studentDetails._id}
          </div>
          <div className="mb-2">
            <strong>Name:</strong> {studentDetails.name}
          </div>
          <div className="mb-2">
            <strong>Course:</strong> {studentDetails.courseName}
          </div>
          <div className="mb-2">
            <strong>Batch:</strong> {studentDetails.batch}
          </div>
          <div className="mb-2">
            <strong>Mode:</strong> {studentDetails.mode}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter report link"
              value={reportLink}
              onChange={(e) => setReportLink(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              onClick={handleSaveReportLink}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Save Report Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentReportSheet;
