import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidenavbar = ({ setActiveSection }) => {
  const [showStudentDropdown, setShowStudentDropdown] = useState(false);
  const [showStaffDropdown, setShowStaffDropdown] = useState(false);

  const handleClick = (section) => {
    setActiveSection(section);
  };

  const toggleDropdown = (dropdown) => {
    if (dropdown === "student") {
      setShowStudentDropdown(!showStudentDropdown);
    } else if (dropdown === "staff") {
      setShowStaffDropdown(!showStaffDropdown);
    }
  };

  return (
    <nav className="bg-gray-800 text-white w-64 p-4">
      <ul>
        <li className="mb-2">
          <Link
            to="#"
            onClick={() => handleClick("overview")}
            className="block py-3 px-4 hover:bg-gray-700 rounded"
          >
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <button
            onClick={() => toggleDropdown("student")}
            className="block py-3 px-4 w-full text-left hover:bg-gray-700 rounded"
          >
            Student
          </button>
          {showStudentDropdown && (
            <ul className="pl-4 mt-2">
              <li className="mb-2">
                <Link
                  to="#"
                  onClick={() => handleClick("studentDetails")}
                  className="block py-3 px-4 hover:bg-gray-600 rounded"
                >
                  Student Details
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  onClick={() => handleClick("personalDetails")}
                  className="block py-3 px-4 hover:bg-gray-600 rounded"
                >
                  Personal Details
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  onClick={() => handleClick("certificateVerification")}
                  className="block py-3 px-4 hover:bg-gray-600 rounded"
                >
                  Certificate Verification
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  onClick={() => handleClick("projectSheet")}
                  className="block py-3 px-4 hover:bg-gray-600 rounded"
                >
                  Project Sheet
                </Link>
              </li>
              
              <li className="mb-2">
                <Link
                  to="#"
                  onClick={() => handleClick("studentAttendance")}
                  className="block py-3 px-4 hover:bg-gray-600 rounded"
                >
                  Student Attendance
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="mb-2">
          <button
            onClick={() => toggleDropdown("staff")}
            className="block py-3 px-4 w-full text-left hover:bg-gray-700 rounded"
          >
            Staff
          </button>
          {showStaffDropdown && (
            <ul className="pl-4 mt-2">
              <li className="mb-2">
                <Link
                  to="#"
                  onClick={() => handleClick("staffPersonalDetails")}
                  className="block py-3 px-4 hover:bg-gray-600 rounded"
                >
                  Staff Personal Details
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  onClick={() => handleClick("staffWorksheet")}
                  className="block py-3 px-4 hover:bg-gray-600 rounded"
                >
                  Staff Worksheet
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="#"
                  onClick={() => handleClick("staffTaskSheet")}
                  className="block py-3 px-4 hover:bg-gray-600 rounded"
                >
                  Staff Task Sheet
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li className="mb-2">
          <Link
            to="#"
            onClick={() => handleClick("attendance")}
            className="block py-3 px-4 hover:bg-gray-700 rounded"
          >
            Attendance
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="#"
            onClick={() => handleClick("intern")}
            className="block py-3 px-4 hover:bg-gray-700 rounded"
          >
            Intern
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="#"
            onClick={() => handleClick("fees")}
            className="block py-3 px-4 hover:bg-gray-700 rounded"
          >
            Fees
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidenavbar;
