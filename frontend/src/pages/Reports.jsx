import React from "react";
import Navbar from "../components/Navbar";
import ReportTable from "../components/ReportTable"; // Import the ReportTable component
import "../styles/pages/Reports.scss";
import Sidebar from "../components/Sidebar";

export default function Reports(params) {
  // Sample report data
  const reports = [
    {
      hospitalName: "Hospital A",
      doctorName: "Dr. Smith",
      diagnosis: "Infection",
      reportLink: "https://example.com/report1",
    },
    {
      hospitalName: "Clinic B",
      doctorName: "Dr. Johnson",
      diagnosis: "Fracture",
      reportLink: "https://example.com/report2",
    },
    // Add more report data as needed
  ];

  return (
    <>
      <Navbar />
      <div className="reports_container">
        <Sidebar></Sidebar>
        {/* Pass the prescription data as props to the PrescriptionTable component */}
        <div className="reports_container__content">
            <ReportTable reports={reports} />
        </div>
      </div>
    </>
  );
}
