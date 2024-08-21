import React, { useState, useEffect } from "react";
import axios from "axios";

const Intern = () => {
  const [form, setForm] = useState({
    name: "",
    department: "",
    degree: "",
    aadharNo: "",
    dob: "",
    phoneNo: "",
    mailId: "",
    linkedinId: "",
    githubId: "",
    startMonth: "",
    baseDomain: "",
    workTaskDetails: "",
    certificateProvided: false,
    personalDetails: "",
    assignedStaff: "",
    fileAadhar: null,
    filePhoto: null,
    fileCertificate: null,
  });

  const [showDetails, setShowDetails] = useState(false);
  const [interns, setInterns] = useState([]);
  const [staff, setStaff] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    // Fetch staff data
    axios
      .get("/api/staff")
      .then((response) => setStaff(response.data))
      .catch((error) => console.error("Error fetching staff:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, [name]: files[0] });
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] !== null) {
        formData.append(key, form[key]);
      }
    });

    axios
      .post("/api/interns", formData)
      .then(() => {
        setShowDetails(true);
        alert("Intern details submitted!");
      })
      .catch((error) => console.error("Error submitting form:", error));
  };

  const handleSearch = () => {
    axios
      .get(`/api/interns/search?name=${searchName}`)
      .then((response) => {
        setSearchResults(response.data);
        setShowSearchResults(true);
      })
      .catch((error) => console.error("Error searching interns:", error));
  };

  const handleBack = () => {
    setShowSearchResults(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        {/* Search Bar */}
        {!showSearchResults && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Search Intern</h2>
            <div className="mb-4 flex">
              <input
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter name to search"
              />
              <button
                onClick={handleSearch}
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {/* Conditional Rendering */}
        {showSearchResults ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
            <button
              onClick={handleBack}
              className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
            >
              Back to Form
            </button>
            {searchResults.length > 0 ? (
              <ul>
                {searchResults.map((intern) => (
                  <li
                    key={intern._id}
                    className="mb-4 p-4 bg-gray-200 rounded-lg"
                  >
                    <h3 className="text-xl font-bold">{intern.name}</h3>
                    <p>
                      <strong>Department:</strong> {intern.department}
                    </p>
                    <p>
                      <strong>Degree:</strong> {intern.degree}
                    </p>
                    <p>
                      <strong>Aadhar No:</strong> {intern.aadharNo}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong> {intern.dob}
                    </p>
                    <p>
                      <strong>Phone No:</strong> {intern.phoneNo}
                    </p>
                    <p>
                      <strong>Email:</strong> {intern.mailId}
                    </p>
                    <p>
                      <strong>LinkedIn:</strong> {intern.linkedinId}
                    </p>
                    <p>
                      <strong>GitHub:</strong> {intern.githubId}
                    </p>
                    <p>
                      <strong>Start Month:</strong> {intern.startMonth}
                    </p>
                    <p>
                      <strong>Base Domain:</strong> {intern.baseDomain}
                    </p>
                    <p>
                      <strong>Work Task Details:</strong>{" "}
                      {intern.workTaskDetails}
                    </p>
                    <p>
                      <strong>Certificate Provided:</strong>{" "}
                      {intern.certificateProvided ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Personal Details:</strong>{" "}
                      {intern.personalDetails}
                    </p>
                    <p>
                      <strong>Assigned Staff:</strong>{" "}
                      {staff.find(
                        (staffMember) =>
                          staffMember._id === intern.assignedStaff
                      )?.name || "None"}
                    </p>
                    <p>
                      <strong>Aadhar Card:</strong>{" "}
                      <a
                        href={intern.fileAadhar}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </p>
                    <p>
                      <strong>Photo:</strong>{" "}
                      <a
                        href={intern.filePhoto}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </p>
                    <p>
                      <strong>Certificate:</strong>{" "}
                      <a
                        href={intern.fileCertificate}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No interns found.</p>
            )}
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-6">Intern Details</h1>

            {/* Form for Intern Details */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Enter Intern Details
              </h2>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Department</label>
                <input
                  type="text"
                  name="department"
                  value={form.department}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter department"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={form.degree}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter degree"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Aadhar Number
                </label>
                <input
                  type="text"
                  name="aadharNo"
                  value={form.aadharNo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter Aadhar number"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Phone Number</label>
                <input
                  type="text"
                  name="phoneNo"
                  value={form.phoneNo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Email</label>
                <input
                  type="email"
                  name="mailId"
                  value={form.mailId}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter email address"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">LinkedIn ID</label>
                <input
                  type="text"
                  name="linkedinId"
                  value={form.linkedinId}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter LinkedIn ID"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">GitHub ID</label>
                <input
                  type="text"
                  name="githubId"
                  value={form.githubId}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter GitHub ID"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Start Month</label>
                <input
                  type="text"
                  name="startMonth"
                  value={form.startMonth}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter start month"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Base Domain</label>
                <input
                  type="text"
                  name="baseDomain"
                  value={form.baseDomain}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter base domain"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Work Task Details
                </label>
                <textarea
                  name="workTaskDetails"
                  value={form.workTaskDetails}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter work task details"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Certificate Provided
                </label>
                <input
                  type="checkbox"
                  name="certificateProvided"
                  checked={form.certificateProvided}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span>Yes</span>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Personal Details
                </label>
                <textarea
                  name="personalDetails"
                  value={form.personalDetails}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter personal details"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Assign to Staff
                </label>
                <select
                  name="assignedStaff"
                  value={form.assignedStaff}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Staff</option>
                  {staff.map((staffMember) => (
                    <option key={staffMember._id} value={staffMember._id}>
                      {staffMember.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Upload Aadhar Card
                </label>
                <input
                  type="file"
                  name="fileAadhar"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  accept=".jpg,.png,.pdf"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Upload Photo</label>
                <input
                  type="file"
                  name="filePhoto"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  accept=".jpg,.png"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 font-semibold">
                  Upload Bonafide Certificate
                </label>
                <input
                  type="file"
                  name="fileCertificate"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  accept=".jpg,.png,.pdf"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </div>

            {/* Display Intern Details */}
            {showDetails && (
              <div className="mt-6 p-4 bg-gray-200 rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">
                  Intern Details Summary
                </h2>
                <div className="mb-4">
                  <p>
                    <strong>Name:</strong> {form.name}
                  </p>
                  <p>
                    <strong>Department:</strong> {form.department}
                  </p>
                  <p>
                    <strong>Degree:</strong> {form.degree}
                  </p>
                  <p>
                    <strong>Aadhar No:</strong> {form.aadharNo}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {form.dob}
                  </p>
                  <p>
                    <strong>Phone No:</strong> {form.phoneNo}
                  </p>
                  <p>
                    <strong>Email:</strong> {form.mailId}
                  </p>
                  <p>
                    <strong>LinkedIn:</strong> {form.linkedinId}
                  </p>
                  <p>
                    <strong>GitHub:</strong> {form.githubId}
                  </p>
                  <p>
                    <strong>Start Month:</strong> {form.startMonth}
                  </p>
                  <p>
                    <strong>Base Domain:</strong> {form.baseDomain}
                  </p>
                  <p>
                    <strong>Work Task Details:</strong> {form.workTaskDetails}
                  </p>
                  <p>
                    <strong>Certificate Provided:</strong>{" "}
                    {form.certificateProvided ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Personal Details:</strong> {form.personalDetails}
                  </p>
                  <p>
                    <strong>Assigned Staff:</strong>{" "}
                    {staff.find(
                      (staffMember) => staffMember._id === form.assignedStaff
                    )?.name || "None"}
                  </p>
                  <p>
                    <strong>Aadhar Card:</strong>{" "}
                    {form.fileAadhar && (
                      <a
                        href={URL.createObjectURL(form.fileAadhar)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    )}
                  </p>
                  <p>
                    <strong>Photo:</strong>{" "}
                    {form.filePhoto && (
                      <a
                        href={URL.createObjectURL(form.filePhoto)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    )}
                  </p>
                  <p>
                    <strong>Certificate:</strong>{" "}
                    {form.fileCertificate && (
                      <a
                        href={URL.createObjectURL(form.fileCertificate)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Intern;
