import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PrescriptionTable from "../components/PrescriptionTable"; // Import the PrescriptionTable component
import "../styles/pages/Prescriptions.scss";

export default function Prescriptions(params) {
  // Sample prescription data
  const prescriptions = [
    {
      healthcareProvider: "Hospital A",
      doctorName: "Dr. Smith",
      dateOfVisit: "2023-09-15",
      prescriptionLink: "https://example.com/prescription1",
    },
    {
      healthcareProvider: "Clinic B",
      doctorName: "Dr. Johnson",
      dateOfVisit: "2023-09-20",
      prescriptionLink: "https://example.com/prescription2",
    },
    // Add more prescription data as needed
  ];

  return (
    <>
      <Navbar />
      <div className="prescriptions_container">
        <Sidebar></Sidebar>
        {/* Pass the prescription data as props to the PrescriptionTable component */}
        <div className="prescriptions_container__content">
          <PrescriptionTable prescriptions={prescriptions} />
        </div>
      </div>
    </>
  );
}
