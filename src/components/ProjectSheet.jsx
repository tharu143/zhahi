import React, { useState } from 'react';
import { importProjectsFromExcel } from '../api/projectApi';
import * as XLSX from 'xlsx';

const ProjectSheet = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await readExcel(file);
      const formattedProjects = formatProjects(data);
      const response = await importProjectsFromExcel(formattedProjects);

      if (Array.isArray(response)) {
        setProjects(response);
        setError(null);
      } else {
        console.error('API response is not an array:', response);
        setError('Failed to import projects.');
      }
    } catch (error) {
      console.error('Failed to import projects:', error);
      setError('Failed to import projects.');
    }
  };

  const readExcel = async (file) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet);
  };

  const formatProjects = (data) => {
    return data.map((row) => ({
      name: row['Name'] || '',
      work: row['Work'] || '',
      reportedBy: row['Reported By'] || '',
      status: row['Status'] || '',
      startDate: row['Start Date'] ? new Date(row['Start Date']) : null,
      endDate: row['End Date'] ? new Date(row['End Date']) : null,
      projectStatus: row['Project Status'] || '',
      files: row['Files'] || '',
      screenshot: row['Screenshot'] || '',
      remark: row['Remark'] || '',
      updatedDate: row['Updated Date'] ? new Date(row['Updated Date']) : null,
    }));
  };

  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toLocaleDateString();
    }
    return 'N/A';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Sheet</h1>
      <div className="mb-4">
        <label htmlFor="upload" className="cursor-pointer flex items-center">
          <span className="text-blue-500 hover:underline">Upload Excel File</span>
        </label>
        <input
          id="upload"
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">Work Assigned To</th>
              <th className="border-b px-4 py-2">Reported</th>
              <th className="border-b px-4 py-2">Status</th>
              <th className="border-b px-4 py-2">Start Date</th>
              <th className="border-b px-4 py-2">End Date</th>
              <th className="border-b px-4 py-2">Project Status</th>
              <th className="border-b px-4 py-2">Files</th>
              <th className="border-b px-4 py-2">Screenshot</th>
              <th className="border-b px-4 py-2">Remark</th>
              <th className="border-b px-4 py-2">Updated Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(projects) && projects.map((project, index) => (
              <tr key={index}>
                <td className="border-b px-4 py-2">{project.work || 'N/A'}</td>
                <td className="border-b px-4 py-2">{project.reportedBy || 'N/A'}</td>
                <td className="border-b px-4 py-2">{project.status || 'N/A'}</td>
                <td className="border-b px-4 py-2">{project.startDate ? formatDate(project.startDate) : 'N/A'}</td>
                <td className="border-b px-4 py-2">{project.endDate ? formatDate(project.endDate) : 'N/A'}</td>
                <td className="border-b px-4 py-2">{project.projectStatus || 'N/A'}</td>
                <td className="border-b px-4 py-2">{project.files || 'N/A'}</td>
                <td className="border-b px-4 py-2">{project.screenshot || 'N/A'}</td>
                <td className="border-b px-4 py-2">{project.remark || 'N/A'}</td>
                <td className="border-b px-4 py-2">{formatDate(project.updatedDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectSheet;
