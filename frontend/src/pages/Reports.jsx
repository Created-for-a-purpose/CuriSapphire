import React from "react";
import Navbar from "../components/Navbar";
import ReportTable from "../components/ReportTable"; // Import the ReportTable component
import "../styles/pages/Reports.scss";
import useSignature from "../hooks/useSignature";

export default function Reports() {

  const sig = useSignature();

  console.log('report' + sig.signature);
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
        <div className="reports_container__content">
            <ReportTable reports={reports} />
        </div>
      </div>
    </>
  );
}
