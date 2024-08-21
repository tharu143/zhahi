import React, { useState } from "react";
import { createStudent } from "../api/studentApi";

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    degree: "",
    aadharNo: "",
    dob: "",
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
    const { name, value, files } = e.target;
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
        [name]: value,
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
        department: "",
        degree: "",
        aadharNo: "",
        dob: "",
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
    <div className="p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Register New Student</h1>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div>
        {Object.keys(formData).map((key) => (
          <label className="block mb-2" key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}:
            {key === "dob" ? (
              <input
                type="date"
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ) : ["aadharCard", "studentPicture", "studentProof"].includes(key) ? (
              <input
                type="file"
                name={key}
                accept=".png, .jpg, .jpeg, .pdf"
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <input
                type="text"
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            )}
            {renderFilePreview(formData[key], key)}
          </label>
        ))}
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
