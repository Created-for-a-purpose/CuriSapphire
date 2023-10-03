import "../styles/components/OTCPopup.scss";
import ConnectButton from "./ConnectButton";
import MedicineCard from "./MedicineCard";
import { medicineData } from "../utils/medicineData";

export default function Popup({ setIsVisible, medicine, clickHandle, title }) {
  const handleClick = () => {
    clickHandle();
  };

  return (
    <div className="otc-popup-container" onClick={setIsVisible}>
      <div className="otc-popup-content">
        <div className="otc-popup-title">{title}</div>
        <div className="otc-popup-body">
          {medicine.map((item, index) => (
            <MedicineCard
              key={index}
              image={medicineData[item[0].toLowerCase()]}
              dose={!item[1] || item[1] === "-" ? "250 mg" : item[1]}
              name={item[0].toUpperCase()}
              quantity={item[2]}
            />
          ))}
        </div>
        <div className="otc-popup-confirm">
          <ConnectButton
            text="Pay 1 Rose"
            height="50px"
            width="150px"
            clickHandle={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
