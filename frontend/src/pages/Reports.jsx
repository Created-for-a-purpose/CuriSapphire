import React from "react";
import Navbar from "../components/Navbar";
import ReportTable from "../components/ReportTable"; // Import the ReportTable component
import "../styles/pages/Reports.scss";
import Sidebar from "../components/Sidebar";
import useSignature from "../hooks/useSignature";

export default function Reports() {

  const sig = useSignature();

  console.log('report' + sig.signature);
  // Sample report data
  const reports = [
    {
      ID: "1",
      hospitalName: "Hospital A",
      doctorName: "Dr. Smith",
      diagnosis: "Endocarditis",
      reportLink: "1",
    },
    {
      ID: "2",
      hospitalName: "Clinic B",
      doctorName: "Dr. Johnson",
      diagnosis: "Infection",
      reportLink: "1",
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
