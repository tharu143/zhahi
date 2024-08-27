import React, { useState, useEffect } from "react";
import { searchStudents, getStudentById, updateStudent, deleteStudent } from "../api/studentApi";

const StudentDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    if (studentDetails) {
      setUpdatedStudent(studentDetails);
    }
  }, [studentDetails]);

  const handleSearch = async () => {
    try {
      if (!searchTerm) {
        setError("Please enter a search term.");
        return;
      }

      if (searchTerm.includes("zhahi")) {
        const student = await getStudentById(searchTerm);
        if (student) {
          setStudentDetails(student);
          setSelectedStudentId(student._id);
          setError(null);
        } else {
          setError("No student found.");
          setStudentDetails(null);
        }
      } else {
        const studentsByName = await searchStudents(searchTerm);
        if (studentsByName.length > 0) {
          setStudentDetails(studentsByName[0]);
          setSelectedStudentId(studentsByName[0]._id);
          setError(null);
        } else {
          setError("No student found.");
          setStudentDetails(null);
        }
      }
    } catch (error) {
      setError("Failed to search student.");
      console.error("Error searching student:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      if (selectedStudentId) {
        await updateStudent(selectedStudentId, updatedStudent);
        setStudentDetails(updatedStudent);
        alert("Student updated successfully.");
        setShowUpdateForm(false); // Hide form after update
      }
    } catch (error) {
      setError("Failed to update student.");
      console.error("Error updating student:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedStudentId) {
        await deleteStudent(selectedStudentId);
        setStudentDetails(null);
        setSearchTerm("");
        setError(null);
        alert("Student deleted successfully.");
      }
    } catch (error) {
      setError("Failed to delete student.");
      console.error("Error deleting student:", error);
    }
  };

  const handleChange = (e) => {
    setUpdatedStudent({
      ...updatedStudent,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Details</h1>
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

      {studentDetails && !showUpdateForm && (
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
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => setShowUpdateForm(true)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {showUpdateForm && studentDetails && (
        <div className="mt-4">
          <div className="mb-2">
            <strong>Name:</strong>
            <input
              type="text"
              name="name"
              value={updatedStudent.name || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          <div className="mb-2">
            <strong>Course:</strong>
            <input
              type="text"
              name="courseName"
              value={updatedStudent.courseName || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          <div className="mb-2">
            <strong>Batch:</strong>
            <select
              name="batch"
              value={updatedStudent.batch || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            >
              <option value="Morning">Morning</option>
              <option value="Evening">Evening</option>
            </select>
          </div>
          <div className="mb-2">
            <strong>Mode:</strong>
            <select
              name="mode"
              value={updatedStudent.mode || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
          {/* Add other fields here as needed */}
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setShowUpdateForm(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
