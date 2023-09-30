import Navbar from "../components/Navbar";
import "../styles/pages/Hospital.scss";
import doctor from "../images/doctor-img.svg";
import Input from "../components/Input";
import ConnectButton from "../components/ConnectButton";
import { FcInfo } from "react-icons/fc";
import { useState } from "react";
import { FaStethoscope } from "react-icons/fa";
import Popup from "../components/Popup";
import useToggle from "../hooks/useToggle";

export default function Hospital(params) {
  const [intent, setIntent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useToggle(false);

  const handleClick = () => {
    setIsPopupVisible();
    console.log("clicked");
  }
  return (
    <>
      <Navbar />
      <div className="hospital_container">
        {
          isPopupVisible &&
            <Popup setIsVisible={setIsPopupVisible}></Popup>
        }
        <div className="hospital_container__left">
          <img src={doctor} alt="doctor" className="doctor-img" />
        </div>
        <div className="hospital_container__right">
          <div className="hospital_container__right__title">
            <FaStethoscope color="#df77f3"></FaStethoscope> ZK Hospital
          </div>
          <div className="hospital_container__right__subtitle">
            Consult with our trusted doctors ✅
          </div>
          <div className="hospital_container__right__form">
            <div className="hospital_container__right__form__top">
              <FcInfo className="hospital_container__right__form__top__logo"></FcInfo>
              <Input
                label={
                  "Your doctor is requesting read access to your latest lab reports"
                }
                type={"text"}
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                placeholder={"Enter your lab report ID..."}
              ></Input>
            </div>
            <div className="hospital_container__right__form__bottom">
              <FcInfo className="hospital_container__right__form__bottom__logo"></FcInfo>
              <div className="hospital_container__right__form__bottom__tip">
                Tip: You can use ZKP to prove your diagnosis to the doctor
              </div>
              <div className="hospital_container__right__form__bottom__ask">Your doctor wants to know if you've been diagnosed with any heart disease in the past
              <br/>{'('} Endocarditis, Cardiomyopathy, Angina, etc.{')'}</div>
              <ConnectButton
                text={"Generate ZKP"}
                height={"50px"}
                width={"150px"}
              ></ConnectButton>
            </div>
            <div className="hospital_container__right__checks">
                <div className="hospital_container__right__checks__check">
                    {isLoading ? "🟡 " : verified ? "🟢 " : "🔴 "}Medical history checks
                </div>
            </div>
            <br />
            <br />
            <div className="hospital_container__right__form__bottom">
              <FcInfo className="hospital_container__right__form__bottom__logo"></FcInfo>
              <div className="hospital_container__right__form__bottom__tip">
                Tip: ZK verification status will be shared automatically
              </div>
              <div className="hospital_container__right__form__bottom__ask">
                This will give your doctor access to the above lab reports
              </div>
              <ConnectButton
                text={"Grant Access 🔓"}
                height={"50px"}
                width={"150px"}
                clickHandle={handleClick}
              ></ConnectButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
