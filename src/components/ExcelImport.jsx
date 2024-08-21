import React from 'react';
import { importProjectsFromExcel } from '../api/projectApi'; // Adjust the import path
// import excelLogo from '../assets/logo'; // Adjust the path to your logo

const ExcelImport = () => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    try {
      await importProjectsFromExcel(file);
      alert('Excel data imported successfully!');
      // Optionally, you can trigger a fetch here to update the project list
    } catch (error) {
      console.error('Error importing Excel data:', error);
      alert('Failed to import Excel data.');
    }
  };

  return (
    <div>
      <label htmlFor="upload" className="cursor-pointer">
        {/* <img src={excelLogo} alt="Import Excel" className="w-8 h-8" /> */}
      </label>
      <input
        id="upload"
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default ExcelImport;
