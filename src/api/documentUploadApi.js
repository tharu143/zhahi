export const uploadDocuments = async (formData) => {
  const response = await fetch("http://localhost:5000/api/document-upload", {
    method: "POST",
    body: formData,
  });
  return response.json();
};

export const getDocumentsByStudentId = async (studentId) => {
  const response = await fetch(`http://localhost:5000/api/document-upload/${studentId}`);
  return response.json();
};

export const updateDocuments = async (studentId, formData) => {
  const response = await fetch(`http://localhost:5000/api/document-upload/${studentId}`, {
    method: "PUT",
    body: formData,
  });
  return response.json();
};

export const deleteDocuments = async (studentId) => {
  const response = await fetch(`http://localhost:5000/api/document-upload/${studentId}`, {
    method: "DELETE",
  });
  return response.status === 204;
};
