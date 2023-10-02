import React, { useState } from "react";
import useToggle from '../hooks/useToggle';
import { FaLock } from "react-icons/fa"; // Import the lock icon
import "../styles/components/ReportTable.scss";
import ReportCard from "./ReportCard";
import { reportData1, reportData2 } from "../utils/sampleReport";

function ReportTable({ reports }) {
  const [viewReport, setViewReport] = useToggle(false);
  const [selectedId, setSelectedId] = useState(1);

  const header = [
    "ID",
    "Hospital Name",
    "Doctor Name",
    "Diagnosis",
    "View Report",
    "Access",
  ];

  const handleClick = (e) => {
    const id = e.target.id;
    setSelectedId(id)
    setViewReport();
  }

  return (
    <div className="report_table_container">
      <ReportCard
        isVisible={viewReport} // Set this based on your logic
        setIsVisible={setViewReport}
        reportData={selectedId === '1' ? reportData1 : reportData2}
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
                  onClick={handleClick}
                  id={index+1}
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
