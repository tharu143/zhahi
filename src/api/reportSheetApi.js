export const upsertReportSheet = async (data) => {
  try {
    const response = await fetch('http://localhost:5000/api/report-sheets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to upsert report sheet:", error);
    throw error;
  }
};
