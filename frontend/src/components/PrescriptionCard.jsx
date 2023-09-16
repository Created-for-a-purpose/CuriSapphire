import React from 'react';
import '../styles/components/PrescriptionCard.scss';

const PrescriptionPad = () => {
  // Sample data for doctor information, patient information, and medications
  const doctorInfo = [
    { label: 'Doctor:', value: 'Dr. John Doe' },
    { label: 'License:', value: '12345' },
    { label: 'Contact:', value: '+1 123 456 7890' },
    { label: 'DEA Number:', value: 'ABC123' },
  ];

  const patientInfo = [
    { label: 'Patient Name:', value: 'Jane Smith' },
    { label: 'Date of Birth:', value: '30/09/1993' },
    { label: 'Gender:', value: 'Female' },
    { label: 'Address:', value: '123 Main St, Anytown, USA' },
  ];

  const medications = [
    {
      medication: 'Amoxicillin',
      dosage: '500mg',
      instructions: 'Take one tablet by mouth daily',
      quantity: '#30 tablets',
    },
    // Add more medications here if needed
  ];

  return (
    <div className="prescription-pad">
      <div className="header">
        <h1>Prescription</h1>
      </div>
      <table className="table">
        <tbody>
          <tr>
            <th colSpan="2">Doctor Information</th>
            <th colSpan="2">Patient Information</th>
          </tr>
          {doctorInfo.map((item, index) => (
            <tr key={index}>
              <td>{item.label}</td>
              <td>{item.value}</td>
              {index < patientInfo.length ? (
                <>
                  <td>{patientInfo[index].label}</td>
                  <td>{patientInfo[index].value}</td>
                </>
              ) : (
                <td></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="prescription-details">
        <h2>Medications</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Medication</th>
              <th>Dosage</th>
              <th>Instructions</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med, index) => (
              <tr key={index}>
                <td>{med.medication}</td>
                <td>{med.dosage}</td>
                <td>{med.instructions}</td>
                <td>{med.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PrescriptionPad;
