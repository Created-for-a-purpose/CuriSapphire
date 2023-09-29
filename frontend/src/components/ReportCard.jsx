import React from "react";
import "../styles/components/ReportCard.scss";
import { MdCancel } from "react-icons/md";

export default function ReportCard({ isVisible, setIsVisible, reportData }) {
  const handleClick = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="report_card_container">
          <div className="report_card_container__top">
            <MdCancel
              className="report_card_container__top__button"
              onClick={handleClick}
            />
          </div>
          <div className="report_card_container__bottom">
            <h2 className="report_title">Patient Report</h2>
            <table className="report_table">
              <tbody>
                <tr>
                  <td className="report_label">Patient Name:</td>
                  <td className="report_value">{reportData.patientName}</td>
                </tr>
                <tr>
                  <td className="report_label">Doctor:</td>
                  <td className="report_value">{reportData.doctorName}</td>
                </tr>
                <tr>
                  <td className="report_label">Lab Name:</td>
                  <td className="report_value">{reportData.labName}</td>
                </tr>
                <tr>
                  <td className="report_label">Test Name:</td>
                  <td className="report_value">{reportData.testName}</td>
                </tr>
                <tr>
                  <td className="report_label">Test Date:</td>
                  <td className="report_value">{reportData.testDate}</td>
                </tr>
              </tbody>
            </table>
            <div className="report_test_details">
              <h3 className="report_details_title">Test Details:</h3>
              <table className="report_details_table">
                <tbody>
                  {reportData.testDetails.map((detail, index) => (
                    <tr key={index}>
                      <td className="report_label">{detail.name}:</td>
                      <td className="report_value">{detail.value}</td>
                      <td className="report_reference_range">
                        {detail.referenceRange &&
                          `Reference Range: ${detail.referenceRange}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="report_diagnosis">
            <strong>Diagnosis:</strong> {reportData.diagnosis}
          </p>
        </div>
      )}
    </>
  );
}
