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
import { hospitalWallet, reportData1, reportData2 } from "../utils/sampleReport"
import { tokenizationAddress, tokenizationAbi, reportVerifierAbi, reportVerifierAddress } from "../constants"
import { readContract } from "wagmi/actions";
import { useAccount } from "wagmi";
import axios from "axios";
import useSignature from "../hooks/useSignature";
import { ethers } from "ethers";
import * as sapphire from "@oasisprotocol/sapphire-paratime"
import { toBytes } from "viem";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";

export default function Hospital(params) {
  const [intent, setIntent] = useState("");
  const [isLoading, setIsLoading] = useToggle(false);
  const [verified, setVerified] = useToggle(false);
  const [isPopupVisible, setIsPopupVisible] = useToggle(false);
  const [proof, setProof] = useState("")
  const signature = useSignature()
  const account = useAccount()
  const provider = new ethers.BrowserProvider(window.ethereum)
  const sapphireWrappedProvider = sapphire.wrap(provider);
  const addRecentTransaction = useAddRecentTransaction();

  const handleClick = () => {
    if(intent === "") return
    setIsPopupVisible();
  }
  const popClick = async () => {
    if(!proof) return
    //confirm access
    try{
    const reportdata = (intent === "1") ? reportData1 : reportData2
    const reportData = {
      patient: account.address,
      reportIssuers: reportdata.doctorName + ", " + reportdata.labName,
      testName: reportdata.testName,
      testDetails: "Sample details",
      diagnosis: reportdata.diagnosis,
      timestamp: reportdata.testDate
    }
    const tokenizationContract = new ethers.Contract(tokenizationAddress, tokenizationAbi, await sapphireWrappedProvider.getSigner())
    const response = await tokenizationContract.createReportToken(hospitalWallet, reportData, toBytes(signature.signature), { value: ethers.parseEther("1") })
    
    addRecentTransaction({
      hash: response.hash,
      description: "Issue HDT"
    })
  }
  catch(err){
    console.log(err)}
  }
  const handleZk = async () => {
    setIsLoading(true)

    const input = {
      disease: reportData2.diagnosis,
    }

    const reqConfig = {
      url: "http://localhost:8000/generateProof/report",
      method: "POST",
      data: input
    }

    await axios.request(reqConfig).then(async (res) => {
      const callData = res.data;
      if (callData === null) {
        setVerified(false)
        return
      }
      setProof(callData)
      const verified = await readContract({
        address: reportVerifierAddress,
        abi: reportVerifierAbi,
        functionName: "verifyProof",
        args: [callData[0], callData[1], callData[2], callData[3]]
      })
      setVerified(verified)
    }).catch((err) => { console.log(err); setIsLoading(false) })

    setIsLoading(false)
  }

  return (
    <>
      <Navbar />
      <div className="hospital_container">
        {
          isPopupVisible &&
          <Popup verified={verified} setIsVisible={setIsPopupVisible} what={"consultation"} who={"doctor"} title={"Healthcare Data Token (HDT)"} clickHandle={popClick}></Popup>
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
                <br />{'('} Endocarditis, Cardiomyopathy, Angina, etc.{')'}</div>
              <ConnectButton
                text={"Generate ZKP"}
                height={"50px"}
                width={"150px"}
                clickHandle={handleZk}
              ></ConnectButton>{verified ? (<p><br />{"Generated Proof:  " + proof[0][0].slice(0, 30) + '.....' + proof[3][0].slice(-30)}</p>) : ""}
            </div>
            <div className="hospital_container__right__checks">
              <div className="hospital_container__right__checks__check">
                {isLoading ? "🟡 " : (verified ? "🟢 " : "🔴 ")}Medical history checks{verified ? ": ZK proof verified ✅" : ""}
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
