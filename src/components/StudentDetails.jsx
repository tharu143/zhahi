import React, { useState, useEffect } from "react";
import { searchStudents, getStudentById, updateStudent, deleteStudent } from "../api/studentApi";

const StudentDetails = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [studentDetails, setStudentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [updatedStudent, setUpdatedStudent] = useState({}); // State to hold updated student details

  useEffect(() => {
    if (studentDetails) {
      setUpdatedStudent(studentDetails); // Initialize update form with current student details
    }
  }, [studentDetails]);

  const handleSearch = async () => {
    try {
      if (!searchTerm) {
        setError("Please enter a search term.");
        return;
      }

      if (searchTerm.includes("zhahi")) {
        // If searchTerm contains "zhahi", search by ID
        const student = await getStudentById(searchTerm);
        if (student) {
          setStudentDetails(student);
          setSelectedStudentId(student._id); // Set selected student ID
          setError(null);
        } else {
          setError("No student found.");
          setStudentDetails(null);
        }
      } else {
        // Search by name
        const studentsByName = await searchStudents(searchTerm);
        if (studentsByName.length > 0) {
          setStudentDetails(studentsByName[0]);
          setSelectedStudentId(studentsByName[0]._id); // Set selected student ID
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
        setStudentDetails(updatedStudent); // Update student details
        alert("Student updated successfully.");
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
    <div className="p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Student Details</h1>
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

      {error && <div className="text-red-500">{error}</div>}

      {studentDetails && (
        <div>
          <div>
            <strong>Name:</strong>
            <input
              type="text"
              name="name"
              value={updatedStudent.name || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          <div>
            <strong>ID:</strong> {studentDetails._id}
          </div>
          <div>
            <strong>Department:</strong>
            <input
              type="text"
              name="department"
              value={updatedStudent.department || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          <div>
            <strong>Degree:</strong>
            <input
              type="text"
              name="degree"
              value={updatedStudent.degree || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          <div>
            <strong>Aadhar No:</strong>
            <input
              type="text"
              name="aadharNo"
              value={updatedStudent.aadharNo || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          <div>
            <strong>DOB:</strong>
            <input
              type="date"
              name="dob"
              value={updatedStudent.dob || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          <div>
            <strong>Phone No:</strong>
            <input
              type="text"
              name="phoneNo"
              value={updatedStudent.phoneNo || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          <div>
            <strong>Email:</strong>
            <input
              type="email"
              name="mailId"
              value={updatedStudent.mailId || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          <div>
            <strong>LinkedIn:</strong>
            <input
              type="text"
              name="linkedinId"
              value={updatedStudent.linkedinId || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          <div>
            <strong>GitHub:</strong>
            <input
              type="text"
              name="githubId"
              value={updatedStudent.githubId || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full mt-1"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
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
    </div>
  );
};

export default StudentDetails;
