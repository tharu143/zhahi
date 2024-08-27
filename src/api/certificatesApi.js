import axios from 'axios';

const API_URL = 'http://localhost:5000/api/certificates';

export const createCertificate = async (certificateData) => {
  return await axios.post(API_URL, certificateData);
};

export const getCertificates = async () => {
  return await axios.get(API_URL);
};

export const getCertificateById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const updateCertificate = async (id, certificateData) => {
  return await axios.put(`${API_URL}/${id}`, certificateData);
};

export const deleteCertificate = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
