import ConnectButton from "../components/ConnectButton";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import pharmacyLogo from "../images/pharmacy.svg";
import "../styles/pages/Pharmacy.scss";
import { GiMedicines } from "react-icons/gi";
import { SiOpenai } from "react-icons/si";
import { BsPrescription2 } from "react-icons/bs";
import { useState } from "react";
export default function Pharmacy() {
  const [intent, setIntent] = useState("");
  const [prescriptionZkp, setPrescriptionZkp] = useState("");
  return (
    <>
      <Navbar></Navbar>
      <div className="pharmacy_container">
        <div className="pharmacy_container__left">
          <img
            src={pharmacyLogo}
            alt="##"
            className="pharmacy_container__left__img"
          />
        </div>
        <div className="pharmacy_container__right">
          <div className="pharmacy_container__right__title">
            <GiMedicines color="#df77f3"></GiMedicines> ZK Pharmacy
          </div>
          <div className="pharmacy_container__right__subtitle">
            Order from our trusted pharmacies ✅
          </div>
          <div className="pharmacy_container__right__form">
            <div className="pharmacy_container__right__form__top">
              <SiOpenai className="pharmacy_container__right__form__top__logo"></SiOpenai>
              <Input
                label={"Order OTC Medicines (No Prescription required)"}
                type={"text"}
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                placeholder={
                  "I want to order 5 tablets of 500mg paracetamol..."
                }
              ></Input>

              <ConnectButton
                text={"Order OTC medicine"}
                height={"50px"}
                width={"200px"}
              ></ConnectButton>
            </div>
            <div className="pharmacy_container__right__form__bottom">
              <BsPrescription2 className="pharmacy_container__right__form__bottom__logo"></BsPrescription2>
              <Input
                label={"Order using prescription (Only medicine & dosage details will be shared)"}
                type={"text"}
                placeholder={"Enter prescription ID"}
                value={prescriptionZkp}
                onChange={(e) => setPrescriptionZkp(e.target.value)}
              ></Input>
              <div className="hospital_container__right__checks">
                <div className="hospital_container__right__checks__check">
                    {false ? "🟡 " : true? "🟢 " : "🔴 "}Prescription validity checks
                </div>
            </div><br/>
              <ConnectButton
                text={"Generate ZKP"}
                height={"50px"}
                width={"200px"}
              ></ConnectButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
