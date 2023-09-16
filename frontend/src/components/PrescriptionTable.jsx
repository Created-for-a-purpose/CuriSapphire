import React from "react";
import { FaLock } from "react-icons/fa"; // Import the lock icon
import "../styles/components/PrescriptionTable.scss";

function PrescriptionTable({ prescriptions }) {
  return (
    <div className="prescription-table">
      <table>
        <thead>
          <tr>
            <th>Healthcare Provider</th>
            <th>Doctor Name</th>
            <th>Date of Visit</th>
            <th>Prescription Link</th>
            <th>Locked</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription, index) => (
            <tr key={index}>
              <td>{prescription.healthcareProvider}</td>
              <td>{prescription.doctorName}</td>
              <td>{prescription.dateOfVisit}</td>
              <td>
                <a
                  href={prescription.prescriptionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Prescription
                </a>
              </td>
              <td>
                <FaLock />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrescriptionTable;
