import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = async () => {
  const input = document.getElementById('pdf-content'); // ID of the HTML element to capture
  const canvas = await html2canvas(input);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF();
  
  pdf.addImage(imgData, 'PNG', 0, 0);
  pdf.save('fee_records.pdf');
};
