import React from "react";
import Navbar from "../components/Navbar";
import PrescriptionTable from "../components/PrescriptionTable"; // Import the PrescriptionTable component
import "../styles/pages/Prescriptions.scss";

export default function Prescriptions(params) {
  // Sample prescription data
  const prescriptions = [
    [
      "1",
      "Hospital A",
      "Dr. Smith",
      "2023-09-15",
    ],
    [
      "2",
      "Clinic B",
      "Dr. Johnson",
      "2023-09-20",
    ],
  ];

  return (
    <>
      <Navbar />
      <div className="prescriptions_container">
        <div className="prescriptions_container__content">
          <PrescriptionTable prescriptions={prescriptions} />
        </div>
      </div>
    </>
  );
}
