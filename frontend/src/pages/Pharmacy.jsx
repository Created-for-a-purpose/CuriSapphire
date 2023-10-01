import ConnectButton from "../components/ConnectButton";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import pharmacyLogo from "../images/pharmacy.svg";
import "../styles/pages/Pharmacy.scss";
import { GiMedicines } from "react-icons/gi";
import { SiOpenai } from "react-icons/si";
import { BsPrescription2 } from "react-icons/bs";
import { useState } from "react";
import { OpenAI } from "openai"
import useToggle from "../hooks/useToggle";
import Popup from "../components/Popup";

export default function Pharmacy() {
  const [intent, setIntent] = useState("");
  const [prescriptionZkp, setPrescriptionZkp] = useState("");
  const apiKey = "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"

  const [isPopupVisible, setIsPopupVisible] = useToggle(false);

  const handleClick = () => {
    setIsPopupVisible();
    console.log("clicked");
  }

  const popClick = () => {
    console.log("clicked");
  }

  const openAi = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  })

  const handleIntent = async () => {
    const chat = await openAi.chat.completions.create({
      messages: [{
        role: "user",
        content: "Extract the drug name (y), quantity (x) and dose (z) (dose is optional) from the user's request to purchase a medicine. The user's request might be in the form: 'I want to purchase x tablets of y drug of dose z mg.' Provide the extracted drug name (y), quantity (x) and if dose is provided, dose (z) in your response in json object of array for each medicine. If you think that the medicine name does not correspond to a real one or you encounter an invalid medicine amount then you should respond with a hyphen(-). " +
        `This is the user's prompt: ${intent}`
      }],
      model: "gpt-3.5-turbo"
    })
    const response = JSON.parse(chat.choices[0].message.content)
    console.log(response)
    
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="pharmacy_container">
      {
          isPopupVisible &&
            <Popup setIsVisible={setIsPopupVisible} title={"Medicine Dispensing Token (MDT)"} what={"medicine purchase"} who={"pharmacy"} clickHandle={popClick}></Popup>
        }
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
                clickHandle={handleIntent}
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
                  {false ? "🟡 " : true ? "🟢 " : "🔴 "}Prescription validity checks
                </div>
              </div><br />
              <ConnectButton
                text={"Generate ZKP"}
                height={"50px"}
                width={"200px"}
                clickHandle = {handleClick}
              ></ConnectButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
