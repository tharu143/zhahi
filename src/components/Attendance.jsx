import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import {
  getAttendanceRecords,
  createAttendanceRecord,
  updateAttendanceRecord,
  deleteAttendanceRecord,
  searchStudents,
} from "../api/attendanceApi";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    id: null,
    studentId: "",
    date: "",
    status: "", // "present" or "absent"
  });
  const [editing, setEditing] = useState(false);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAttendanceRecords();
    fetchStudents();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      const data = await getAttendanceRecords();
      setRecords(data);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
      setError("Failed to fetch attendance records");
    }
  };

  const fetchStudents = async () => {
    try {
      const data = await searchStudents(""); // Fetch all students initially
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Failed to fetch students");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAdd = async () => {
    if (form.studentId && form.date && form.status) {
      try {
        await createAttendanceRecord(form);
        fetchAttendanceRecords();
        setForm({
          id: null,
          studentId: "",
          date: "",
          status: "",
        });
      } catch (error) {
        console.error("Error creating attendance record:", error);
        setError("Failed to create attendance record");
      }
    }
  };

  const handleEdit = (record) => {
    setForm(record);
    setEditing(true);
  };

  const handleUpdate = async () => {
    if (form.studentId && form.date && form.status) {
      try {
        await updateAttendanceRecord(form.id, form);
        fetchAttendanceRecords();
        setForm({
          id: null,
          studentId: "",
          date: "",
          status: "",
        });
        setEditing(false);
      } catch (error) {
        console.error("Error updating attendance record:", error);
        setError("Failed to update attendance record");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteAttendanceRecord(id);
      fetchAttendanceRecords();
    } catch (error) {
      console.error("Error deleting attendance record:", error);
      setError("Failed to delete attendance record");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Attendance Records", 14, 16);
    doc.setFontSize(12);

    let y = 30;
    records.forEach((record) => {
      doc.text(`Student: ${record.studentId.name}`, 14, y);
      doc.text(`Date: ${record.date}`, 14, y + 10);
      doc.text(`Status: ${record.status}`, 14, y + 20);
      y += 40;
    });

    doc.save("attendance_records.pdf");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Attendance Management</h1>

        {/* Form for adding or editing records */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            {editing ? "Edit Attendance Record" : "Add New Attendance Record"}
          </h2>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Student</label>
            <select
              name="studentId"
              value={form.studentId}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded text-sm md:text-base"
            >
              <option value="">Select Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          <div>
            {editing ? (
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded text-sm md:text-base"
              >
                Update Record
              </button>
            ) : (
              <button
                onClick={handleAdd}
                className="bg-blue-500 text-white px-4 py-2 rounded text-sm md:text-base"
              >
                Add Record
              </button>
            )}
          </div>
        </div>

        {/* PDF Generation Button */}
        <div className="mb-6">
          <button
            onClick={generatePDF}
            className="bg-green-500 text-white px-4 py-2 rounded text-sm md:text-base"
          >
            Generate PDF
          </button>
        </div>

        {/* Table of attendance records */}
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Attendance Records</h2>
          <table className="w-full border border-gray-300 rounded text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Student</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id}>
                  <td className="p-2 border">{record.studentId.name}</td> {/* Ensure this is a string */}
                  <td className="p-2 border">{record.date}</td>
                  <td className="p-2 border">{record.status}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => handleEdit(record)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded text-sm md:text-base mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(record._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm md:text-base"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
