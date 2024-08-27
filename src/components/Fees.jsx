import React, { useState } from 'react';
import { searchStudents, getFeeRecords, createFeeRecord, updateFeeRecord } from '../api/feesApi';

const Fees = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [studentDetails, setStudentDetails] = useState(null);
  const [feeRecords, setFeeRecords] = useState([]);
  const [paymentType, setPaymentType] = useState('full'); // 'full' or 'monthly'
  const [paymentDate, setPaymentDate] = useState('');
  const [nextDueDate, setNextDueDate] = useState('');
  const [status, setStatus] = useState(''); // 'paid' or 'unpaid'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Success message

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (!searchTerm) {
        setError("Please enter a search term.");
        return;
      }

      // Search for student by name or ID
      const studentsByName = await searchStudents(searchTerm);
      const student = studentsByName.length > 0 ? studentsByName[0] : null;

      if (student) {
        setStudentDetails(student);
        setError(null);
        setSuccess('Student found successfully');
        // Fetch fee records for the student
        await fetchFeeRecords(student._id);
      } else {
        setError("No student found.");
        setStudentDetails(null);
        setFeeRecords([]);
      }
    } catch (error) {
      setError("Failed to search student.");
      console.error("Error searching student:", error);
    }
  };

  const fetchFeeRecords = async (studentId) => {
    try {
      // Fetch fee records based on student ID
      const records = await getFeeRecords(); // Assuming getFeeRecords returns all records
      const studentFeeRecords = records.filter(record => record.studentId === studentId);
      setFeeRecords(studentFeeRecords);
    } catch (error) {
      setError("Failed to fetch fee records.");
      console.error("Error fetching fee records:", error);
    }
  };

  const calculateNextDueDate = () => {
    if (paymentDate) {
      const date = new Date(paymentDate);
      if (paymentType === 'monthly') {
        date.setMonth(date.getMonth() + 1);
      } else if (paymentType === 'full') {
        date.setMonth(date.getMonth() + 6); // Example: next due in 6 months
      }
      setNextDueDate(date.toISOString().split('T')[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!studentDetails) {
        setError("No student details available.");
        return;
      }

      const feeRecord = {
        studentId: studentDetails._id,
        paymentType,
        paymentDate,
        nextDueDate,
        status,
      };

      if (feeRecords.length > 0) {
        // Update existing record
        await updateFeeRecord(feeRecords[0]._id, feeRecord);
      } else {
        // Create new record
        await createFeeRecord(feeRecord);
      }

      setSuccess('Fee record saved successfully');
      setError('');
      // Refetch fee records
      await fetchFeeRecords(studentDetails._id);
    } catch (error) {
      setError("Failed to save fee record.");
      console.error("Error saving fee record:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Fee Management</h1>
      <form onSubmit={handleSearch} className="mb-4 flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          placeholder="Search by name or student ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Search
        </button>
      </form>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      {success && <div className="text-green-500 text-center mb-4">{success}</div>}

      {studentDetails && (
        <div className="bg-gray-100 p-4 rounded shadow-md">
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

          {feeRecords.length > 0 ? (
            <div>
              <h3 className="text-lg font-semibold mb-2">Fee Records</h3>
              <ul>
                {feeRecords.map((record) => (
                  <li key={record._id} className="mb-2">
                    <p>Payment Type: {record.paymentType}</p>
                    <p>Payment Date: {record.paymentDate}</p>
                    <p>Next Due Date: {record.nextDueDate}</p>
                    <p>Status: {record.status}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No fee records found for this student.</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Payment Type:</label>
              <select
                value={paymentType}
                onChange={(e) => {
                  setPaymentType(e.target.value);
                  calculateNextDueDate();
                }}
                className="border p-2 rounded w-full"
              >
                <option value="full">Full Payment</option>
                <option value="monthly">Monthly Payment</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Payment Date:</label>
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => {
                  setPaymentDate(e.target.value);
                  calculateNextDueDate();
                }}
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Next Due Date:</label>
              <input
                type="text"
                value={nextDueDate}
                readOnly
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save Fee Record
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Fees;
