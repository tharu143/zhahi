import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidenavbar from "./Sidenavbar";
import PersonalDetails from "./PersonalDetails";
import CertificateVerification from "./CertificateVerification";
import StudentReportSheet from "./StudentReportSheet";
import StaffPersonalDetails from "./StaffPersonalDetails";
import StudentAttendance from "./StudentAttendance";
import StaffWorksheet from "./StaffWorksheet";
import StaffTaskSheet from "./StaffTaskSheet";
import AddCourse from "./AddCourse";
import Intern from "./Intern";
import Fees from "./Fees";
import StudentDetails from "./StudentDetails";
import BarChart from "./BarChart";
import Footer from "./Footer"; // Import the Footer component
import logo from './assets/logo.png'; // Adjust the path based on where your image is stored

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [chartData, setChartData] = useState({
    attendanceData: [],
    feesData: [],
    studentCount: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeSection === "overview") {
      fetchChartData();
    }
  }, [activeSection]);

  const fetchChartData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/chart-data');
      setChartData(response.data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
      setError('Error fetching chart data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-r from-teal-100 to-purple-400 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-4" />
        </div>
        <div className="flex items-center">
          <span className="mr-4">Welcome</span>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </header>
      <div className="flex flex-grow">
        <Sidenavbar setActiveSection={setActiveSection} />
        <main className="flex-grow p-4">
          {activeSection === "overview" && (
            <div>
              <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
              {loading && <p>Loading chart data...</p>}
              {error && <p className="text-red-500">{error}</p>}
              <BarChart data={chartData} />
            </div>
          )}
          {activeSection === "studentDetails" && <StudentDetails />}
          {activeSection === "personalDetails" && <PersonalDetails />}
          {activeSection === "certificateVerification" && <CertificateVerification />}
          {activeSection === "studentreportsheet" && <StudentReportSheet />}
          {activeSection === "studentAttendance" && <StudentAttendance />}
          {activeSection === "staffPersonalDetails" && <StaffPersonalDetails />}
          {activeSection === "staffWorksheet" && <StaffWorksheet />}
          {activeSection === "staffTaskSheet" && <StaffTaskSheet />}
          {activeSection === "AddCourse" && <AddCourse />}
          {activeSection === "intern" && <Intern />}
          {activeSection === "fees" && <Fees />}
        </main>
      </div>
      <Footer /> {/* Add the Footer component */}
    </div>
  );
};

export default Dashboard;
