import React, { useState } from 'react';
import { searchStudents, getStudentById } from '../api/studentApi';
import { createCertificate } from '../api/certificatesApi';

const CertificateVerification = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [certificateData, setCertificateData] = useState({
    certificateId: '',
    issuedDate: '',
    projectName: '',
    status: '',
    company: '',
    role: '',
    branch: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
        setStudentDetails(student);
        setError(null);
        setShowUpdateForm(true); // Show the form when student details are found
      } else {
        setError("No student found.");
        setStudentDetails(null);
      }
    } catch (error) {
      setError("Failed to search student.");
      console.error("Error searching student:", error);
    }
  };

  const handleCertificateChange = (e) => {
    const { name, value } = e.target;
    setCertificateData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createCertificate({
        ...certificateData,
        studentId: studentDetails._id,
      });
      setSuccess("Certificate created successfully!");
      setCertificateData({
        certificateId: '',
        issuedDate: '',
        projectName: '',
        status: '',
        company: '',
        role: '',
        branch: '',
      });
    } catch (error) {
      setError("Failed to create certificate.");
      console.error("Error creating certificate:", error);
    }
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
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}

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
        </div>
      )}

      {showUpdateForm && studentDetails && (
        <form onSubmit={handleSubmit} className="mt-6">
          <h2 className="text-xl font-bold mb-4">Add Certificate</h2>
          <div className="mb-4">
            <label className="block mb-1">Certificate ID</label>
            <input
              type="text"
              name="certificateId"
              value={certificateData.certificateId}
              onChange={handleCertificateChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Issued Date</label>
            <input
              type="date"
              name="issuedDate"
              value={certificateData.issuedDate}
              onChange={handleCertificateChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Project Name</label>
            <input
              type="text"
              name="projectName"
              value={certificateData.projectName}
              onChange={handleCertificateChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={certificateData.status}
              onChange={handleCertificateChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={certificateData.company}
              onChange={handleCertificateChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Role</label>
            <input
              type="text"
              name="role"
              value={certificateData.role}
              onChange={handleCertificateChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Branch</label>
            <input
              type="text"
              name="branch"
              value={certificateData.branch}
              onChange={handleCertificateChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Certificate
          </button>
        </form>
      )}
    </div>
  );
};

export default CertificateVerification;
