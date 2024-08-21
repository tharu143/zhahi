const API_URL = "http://localhost:5000/api/attendance"; // Update to your actual attendance API endpoint

// Fetch all attendance records
export const getAttendanceRecords = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    throw error;
  }
};
// Create a new attendance record
export const createAttendanceRecord = async (attendance) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendance),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error creating attendance record:", error);
    throw error;
  }
};

// Update an existing attendance record
export const updateAttendanceRecord = async (id, attendance) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attendance),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating attendance record:", error);
    throw error;
  }
};

// Delete an attendance record
export const deleteAttendanceRecord = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error deleting attendance record:", error);
    throw error;
  }
};

// Fetch students for the dropdown
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
