import React from "react";
import "../styles/components/PrescriptionCard.scss";
import { MdCancel } from "react-icons/md";

export default function PrescriptionCard({ isVisible, setIsVisible, prescriptionData }) {
  return (
    <>
      {isVisible && (
        <div className="prescription_card_container">
          <div className="prescription_card_container__top">
            <MdCancel
              className="prescription_card_container__top__button"
              onClick={setIsVisible}
            />
          </div>
          <div className="prescription_card_container__bottom">
            <h2 className="prescription_title">Prescription</h2>
            <div className="prescription_card_container__bottom__prescription_table_container">
              <table className="prescription_card_container__bottom__prescription_table_container__table">
                <tbody>
                  <tr>
                    <td className="prescription_label">Doctor:</td>
                    <td className="prescription_value">{prescriptionData.doctorName}</td>
                  </tr>
                  <tr>
                    <td className="prescription_label">Patient Name:</td>
                    <td className="prescription_value">{prescriptionData.patientName}</td>
                  </tr>
                  <tr>
                    <td className="prescription_label">Date:</td>
                    <td className="prescription_value">{prescriptionData.prescriptionDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="prescription_medications">
              <h3 className="prescription_medications_title">Medications:</h3>
              <div className="prescription_medications_container">
                <table className="prescription_medications_container__table">
                  <tbody>
                    {prescriptionData.medications.map((medication, index) => (
                      <tr key={index}>
                        <td className="prescription_label">{medication.name}:</td>
                        <td className="prescription_value">{medication.dosage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <p className="prescription_notes">
            <strong>Notes:</strong> {prescriptionData.notes}
          </p>
        </div>
      )}
    </>
  );
}
