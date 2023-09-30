import React from "react";
import useToggle from '../hooks/useToggle';
import { FaLock } from "react-icons/fa"; // Import the lock icon
import "../styles/components/ReportTable.scss";
import ReportCard from "./ReportCard";

function ReportTable({ reports }) {
  const [viewReport, setViewReport] = useToggle(false);

  const header = [
    "ID",
    "Hospital Name",
    "Doctor Name",
    "Diagnosis",
    "View Report",
    "Access",
  ];

  return (
    <div className="report_table_container">
      <ReportCard
        isVisible={viewReport} // Set this based on your logic
        setIsVisible={setViewReport}
        reportData={{
          patientName: "John Doe",
          doctorName: "Dr. Smith",
          labName: "Sample Lab",
          testName: "Blood Test",
          testDate: "2023-09-29",
          testDetails: [
            { name: "Sample A", value: "10.5", referenceRange: "5.0-15.0" },
            { name: "Sample B", value: "3.2", referenceRange: "2.0-4.0" },
            { name: "Sample A", value: "10.5", referenceRange: "5.0-15.0" },
            { name: "Sample B", value: "3.2", referenceRange: "2.0-4.0" },
            { name: "Sample A", value: "10.5", referenceRange: "5.0-15.0" },
            { name: "Sample B", value: "3.2", referenceRange: "2.0-4.0" },
            // Add more test details as needed
          ],
          diagnosis: "Healthy",
        }}
      />

      <table className="report_table_container__table">
        <thead className="report_table_container__table__header">
          <tr>
            {header.map((item, index) => (
              <th
                key={index}
                className="report_table_container__table__header__heading"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index}>
              {report.map((item, index) => (
                <td
                  key={index}
                  className="report_table_container__table__row__data"
                >
                  {item}
                </td>
              ))}
              <td className="report_table_container__table__row__data">
                <div
                  onClick={setViewReport}
                  className="report_table_container__table__row__data__button"
                >
                  👀
                </div>
              </td>
              <td className="report_table_container__table__row__data">
                <FaLock /> &nbsp;Only you
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportTable;
