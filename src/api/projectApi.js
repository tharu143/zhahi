import axios from 'axios';

const BASE_URL = "http://localhost:5000/api/projects";

// Function to import projects from an Excel file
export const importProjectsFromExcel = async (projects) => {
  try {
    const response = await axios.post(`${BASE_URL}/import`, projects, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error importing projects:', error);
    throw error;
  }
};
