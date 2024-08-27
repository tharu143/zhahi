import React, { useState } from "react";
import { createStudent } from "../api/studentApi";

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    collegeName: "",
    degree: "",
    passedOut: "",
    address: "",
    batch: "Morning", // Default value for dropdown
    courseName: "",
    dateOfJoining: "",
    mode: "Online", // Checkbox for online/offline
    phoneNo: "",
    mailId: "",
    linkedinId: "",
    githubId: "",
    aadharCard: null,
    studentPicture: null,
    studentProof: null,
  });
  const [fileUrls, setFileUrls] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
      setFileUrls((prevUrls) => ({
        ...prevUrls,
        [name]: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formDataToSubmit = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSubmit.append(key, formData[key]);
      });

      await createStudent(formDataToSubmit);
      alert("Student registered successfully!");
      setFormData({
        name: "",
        collegeName: "",
        degree: "",
        passedOut: "",
        address: "",
        batch: "Morning",
        courseName: "",
        dateOfJoining: "",
        mode: "Onlime",
        phoneNo: "",
        mailId: "",
        linkedinId: "",
        githubId: "",
        aadharCard: null,
        studentPicture: null,
        studentProof: null,
      });
    } catch (error) {
      setError("Failed to register student.");
      console.error("Error registering student:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderFilePreview = (file, key) => {
    if (!file || !file.name) return null;
    
    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (['png', 'jpg', 'jpeg'].includes(fileExtension)) {
      return <img src={fileUrls[key]} alt="File Preview" className="h-24 mt-2 rounded" />;
    } else if (fileExtension === 'pdf') {
      return (
        <a href={fileUrls[key]} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2">
          View PDF
        </a>
      );
    }
    return null;
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-2xl mx-auto md:p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Register New Student</h1>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          College Name:
          <input
            type="text"
            name="collegeName"
            value={formData.collegeName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Degree:
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Passed Out:
          <input
            type="text"
            name="passedOut"
            value={formData.passedOut}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Batch:
          <select
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>
        </label>
        <label className="block mb-2">
          Course Name:
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Date of Joining:
          <input
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Mode:
          <select
            name="batch"
            value={formData.mode}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </label>
        <label className="block mb-2">
          Phone No:
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Mail Id:
          <input
            type="email"
            name="mailId"
            value={formData.mailId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          LinkedIn Id:
          <input
            type="text"
            name="linkedinId"
            value={formData.linkedinId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          GitHub Id:
          <input
            type="text"
            name="githubId"
            value={formData.githubId}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </label>
        <label className="block mb-2">
          Aadhar Card:
          <input
            type="file"
            name="aadharCard"
            accept=".png, .jpg, .jpeg, .pdf"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          {renderFilePreview(formData.aadharCard, "aadharCard")}
        </label>
        <label className="block mb-2">
          Student Picture:
          <input
            type="file"
            name="studentPicture"
            accept=".png, .jpg, .jpeg, .pdf"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          {renderFilePreview(formData.studentPicture, "studentPicture")}
        </label>
        <label className="block mb-2">
          Student Proof:
          <input
            type="file"
            name="studentProof"
            accept=".png, .jpg, .jpeg, .pdf"
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          {renderFilePreview(formData.studentProof, "studentProof")}
        </label>
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors duration-300"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
