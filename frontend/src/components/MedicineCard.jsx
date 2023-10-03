import React from "react";
import "../styles/components/MedicineCard.scss";

export default function MedicineCard({ name, quantity, dose, image }) {
  return (
    <div className="medicine-card">
      <div className="medicine-card-image">
        <img src={image} alt={name} />
      </div>
      <div className="medicine-card-content">
        <div className="medicine-card-content-name">{name}</div>
        <div className="medicine-card-content-info">
          <div className="medicine-card-content-quantity">
            Quantity: {quantity}
          </div>
          <div className="medicine-card-content-dose">Dose: {dose}</div>
        </div>
      </div>
    </div>
  );
}
