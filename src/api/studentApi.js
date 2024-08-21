import axios from 'axios';

const API_URL = "http://localhost:5000/api/students";

// Function to create a new student
export const createStudent = async (formData) => {
  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create student:", error);
    throw new Error("Failed to create student");
  }
};

// Function to update student details
export const updateStudent = async (studentId, formData) => {
  try {
    const response = await axios.put(`${API_URL}/${studentId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update student:", error);
    throw new Error("Failed to update student");
  }
};

// Function to get a student by ID
export const getStudentById = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to get student details:", error);
    throw new Error("Failed to get student details");
  }
};

// Function to search students by query
export const searchStudents = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { query },  // Send the search term as a query parameter
    });
    return response.data;
  } catch (error) {
    console.error("Failed to search students:", error);
    throw new Error("Failed to search students");
  }
};

// Function to delete a student by ID
export const deleteStudent = async (studentId) => {
  try {
    const response = await axios.delete(`${API_URL}/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete student:", error);
    throw new Error("Failed to delete student");
  }
};
