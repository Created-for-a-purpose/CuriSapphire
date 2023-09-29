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
    [
      "1",
      "Hospital A",
      "Dr. Smith",
      "Endocarditis",
    ],
    [
      "2",
      "Hospital A",
      "Dr. Smith",
      "Endocarditis",
    ]
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
