// src/components/BarChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const BarChart = ({ data }) => {
  const attendanceChartData = {
    labels: data.attendanceData.map(item => item._id), // Dates
    datasets: [
      {
        label: 'Attendance Records',
        data: data.attendanceData.map(item => item.count), // Count of records
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const feesChartData = {
    labels: data.feesData.map(item => item._id), // Dates
    datasets: [
      {
        label: 'Fees Collected',
        data: data.feesData.map(item => item.totalFees), // Total fees collected
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h2>Attendance Records</h2>
      <Bar data={attendanceChartData} />
      <h2>Fees Collected</h2>
      <Bar data={feesChartData} />
      <h2>Total Students</h2>
      <p>{data.studentCount}</p>
    </div>
  );
};

export default BarChart;
