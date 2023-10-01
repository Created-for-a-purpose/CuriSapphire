import React from "react";
import { FaLock } from "react-icons/fa"; // Import the lock icon
import "../styles/components/PrescriptionTable.scss";
import useToggle from "../hooks/useToggle";
import PrescriptionCard from "./PrescriptionCard";

function PrescriptionTable({ prescriptions }) {
  const [viewReport, setViewReport] = useToggle(false);

  const header = [
    "ID",
    "Hospital Name",
    "Doctor Name",
    "Date",
    "View Prescription",
    "Access",
  ];

  const value = {
    doctorName: "Dr. Smith",
    patientName: "John Doe",
    prescriptionDate: "2023-10-01",
    medications: [
      { name: "Medication A", dosage: "2 tablets daily" },
      { name: "Medication B", dosage: "1 tablet before meals" },
      { name: "Medication C", dosage: "1 capsule at bedtime" },
    ],
    notes: "Take medications as prescribed. Follow up in two weeks.",
  };

  return (
    <div className="prescription_table_container">
      <PrescriptionCard
        isVisible={viewReport} // Set this based on your logic
        setIsVisible={setViewReport}
        prescriptionData={value}
      />

      <table className="prescription_table_container__table">
        <thead className="prescription_table_container__table__header">
          <tr>
            {header.map((item, index) => (
              <th
                key={index}
                className="prescription_table_container__table__header__heading"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((prescription, index) => (
            <tr key={index}>
              {prescription.map((item, index) => (
                <td
                  key={index}
                  className="prescription_table_container__table__row__data"
                >
                  {item}
                </td>
              ))}
              <td className="prescription_table_container__table__row__data">
                <div
                  onClick={setViewReport}
                  className="prescription_table_container__table__row__data__button"
                >
                  👀
                </div>
              </td>
              <td className="prescription_table_container__table__row__data">
                <FaLock /> &nbsp;Only you
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PrescriptionTable;
