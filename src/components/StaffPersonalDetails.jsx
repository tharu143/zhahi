import React, { useState } from "react";

const StaffPersonalDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    employeeId: "",
    studentsHandled: "",
    coursesHandled: "",
    documents: null,
  });

  // Define handleChange function
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:5000/api/staff-details", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error("Error:", error);
      alert("Submission failed.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Staff Personal Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange} // Corrected
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <input
            name="role"
            type="text"
            value={formData.role}
            onChange={handleChange} // Corrected
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Employee ID</label>
          <input
            name="employeeId"
            type="text"
            value={formData.employeeId}
            onChange={handleChange} // Corrected
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Students Handled</label>
          <input
            name="studentsHandled"
            type="text"
            value={formData.studentsHandled}
            onChange={handleChange} // Corrected
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Courses Handled</label>
          <input
            name="coursesHandled"
            type="text"
            value={formData.coursesHandled}
            onChange={handleChange} // Corrected
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Documents</label>
          <input
            name="documents"
            type="file"
            onChange={handleChange} // Corrected
            className="mt-1 block w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StaffPersonalDetails;
