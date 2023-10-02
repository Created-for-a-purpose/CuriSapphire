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
import axios from "axios";
import { ethers } from "ethers";
import * as sapphire from "@oasisprotocol/sapphire-paratime"
import { readContract } from "wagmi/actions";
import { useAccount } from "wagmi";
import useSignature from "../hooks/useSignature";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { pxVerifierAbi, pxVerifierAddress, tokenizationAbi, tokenizationAddress } from "../constants";
import { pharmacyWallet } from "../utils/sampleReport";
import { toBytes } from "viem";

export default function Pharmacy() {
  const [intent, setIntent] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useToggle(false);
  const [prescriptionZkp, setPrescriptionZkp] = useState("");
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [proof, setProof] = useState("");
  const addRecentTransaction = useAddRecentTransaction();
  const signature = useSignature();
  const account = useAccount();
  const provider = new ethers.BrowserProvider(window.ethereum)
  const sapphireWrappedProvider = sapphire.wrap(provider);
  const apiKey = "YOUR_API_KEY_HERE"
 

  const handleClick = async () => {
    if(prescriptionZkp === "") return
    setIsLoading(true);
    const input = {
      pxage: 10
    }
    const reqConfig = {
      url: "http://localhost:8000/generateProof/px",
      method: "POST",
      data: input
    }
    await axios.request(reqConfig).then(async (res) => {
      const proof = res.data
      setProof(proof)
      const verified = await readContract({
        address: pxVerifierAddress,
        abi: pxVerifierAbi,
        functionName: "verifyProof",
        args: [proof[0], proof[1], proof[2], proof[3]]
      })
      setVerified(verified)
    }).catch((err) => { console.log(err) })
    setIsLoading(false);
    // delay of 1 second
    setTimeout(() => {
      setIsPopupVisible();
    }, 1500);
  }

  const popClick = async () => {
    if (!proof || !verified) return
    try {
      const pxData = {
        patient: account.address,
        issuerDetails: "Pharmacy",
        medicineDetails: "Anti-depressants",
        timestamp: Math.floor(Date.now() / 1000)
      }

      const tokenizationContract = new ethers.Contract(tokenizationAddress, tokenizationAbi, await sapphireWrappedProvider.getSigner())
      const response = await tokenizationContract.createPxToken(pharmacyWallet, pxData, toBytes(signature.signature), { value: ethers.parseEther("1") })
      addRecentTransaction({
        hash: response.hash,
        description: "Issue MDT"
      })
    }
    catch (err) {
      console.log(err)
    }
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
          <Popup verified={verified} setIsVisible={setIsPopupVisible} title={"Medicine Dispensing Token (MDT)"} what={"medicine purchase"} who={"pharmacy"} clickHandle={popClick}></Popup>
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
                  {isLoading ? "🟡 " : verified ? "🟢 " : "🔴 "}<b>Prescription validity checks</b>{verified && !isLoading ? ": ZK Proof verified " : ""}
                </div>
                {verified ? (<p><b>🔐 Generated Proof: </b>{ proof[0][0].slice(0, 30) + '.....' + proof[2][0].slice(-24)}</p>) : ""}
              </div><br />
              <ConnectButton
                text={"Generate ZKP"}
                height={"50px"}
                width={"200px"}
                clickHandle={handleClick}
              ></ConnectButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
