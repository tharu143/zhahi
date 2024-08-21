const API_URL = "http://localhost:5000/api/fees"; // Update to your actual fees API endpoint

// Fetch all fee records
export const getFeeRecords = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching fee records:", error);
    throw error;
  }
};

// Create a new fee record
export const createFeeRecord = async (fee) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fee),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating fee record:", error);
    throw error;
  }
};

// Update an existing fee record
export const updateFeeRecord = async (id, fee) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fee),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating fee record:", error);
    throw error;
  }
};

// Delete a fee record
export const deleteFeeRecord = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error deleting fee record:", error);
    throw error;
  }
};

// Fetch students for the dropdown
export const getStudents = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/students"); // Update to your actual students API endpoint
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// Optionally, you can search students by name
export const searchStudents = async (name) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/students/search?name=${encodeURIComponent(name)}` // Update to your actual search API endpoint
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error searching students:", error);
    throw error;
  }
};
