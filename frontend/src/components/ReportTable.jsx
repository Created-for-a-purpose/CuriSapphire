import React from "react";
import { FaLock } from "react-icons/fa"; // Import the lock icon
import "../styles/components/ReportTable.scss";
import { Link } from "react-router-dom";

function ReportTable({ reports }) {
  return (
    <div className="report-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hospital Name</th>
            <th>Doctor Name</th>
            <th>Diagnosis</th>
            <th>Report Link</th>
            <th>Locked</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              <td>{report.ID}</td>
              <td>{report.hospitalName}</td>
              <td>{report.doctorName}</td>
              <td>{report.diagnosis}</td>
              <td>
                <Link
                  to={`./${report.reportLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Report
                </Link>
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

export default ReportTable;
