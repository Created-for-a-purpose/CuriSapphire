import React from "react";
import ConnectButton from "./ConnectButton";
import { FcInfo } from "react-icons/fc";
import "../styles/components/MarketPlacePopup.scss";
import useToggle from "../hooks/useToggle";
import { tokenizationAddress, tokenizationAbi } from "../constants";
import { useAccount } from "wagmi";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import * as sapphire from "@oasisprotocol/sapphire-paratime"
import useSignature from "../hooks/useSignature";
import { researcherWallet, sampleResearchData } from "../utils/sampleReport"
import { toBytes } from "viem";

export default function Popup({ setIsVisible, verification, title, purpose, clickHandle }) {
  const [verificationComplete, setVerificationComplete] = useToggle(false);
  const provider = new ethers.BrowserProvider(window.ethereum)
  const sapphireWrappedProvider = sapphire.wrap(provider);
  const addRecentTransaction = useAddRecentTransaction();
  const account = useAccount();
  const signature = useSignature();

  const handleClick = async () => {
    setIsVisible();
    if (verification && verification[0] && verification[1]) {
      // Perform data staking action here
      try {
        const tokenizationContract = new ethers.Contract(tokenizationAddress, tokenizationAbi, await sapphireWrappedProvider.getSigner())
        const researchData = {
          dataProvider: account.address,
          requiredData: JSON.stringify(sampleResearchData),
          issueTimestamp: Date.now(),
          stakeDurationInDays: 60,
          stakeAmount: 10,
          stakeExpired: false
        }
        const response = await tokenizationContract.createResearchDataToken(researcherWallet, researchData, toBytes(signature.signature))
        addRecentTransaction({
          hash: response.hash,
          description: "Stake Data"
        })
      } catch (err) { console.log(err) }
      setVerificationComplete()
    } else {
      setVerificationComplete()
      clickHandle();
    }
  };

  return (
    <div className="market_place_popup_container" onClick={setIsVisible}>
      <div className="market_place_popup_container__content">
        <div className="market_place_popup_container__content__title">
          🧪 {title}
        </div>
        <p className="market_place_popup_container__content__body">
          <strong>Research Purpose:</strong> {purpose}
          <br />
          <strong>Prime requirements from your data:</strong>
          <span role="img" aria-label="diagnosis-cancer">
            {" "}
            <br />{verification[1] ? "🟢 " : "🔴 "} Diagnosis: Heart Disease
            <br />{verification[0] ? "🟢 " : "🔴 "} Age: 18-25
          </span>
          <br />
          <strong>Research requirements: </strong><span>Echocardiogram lab reports, Treatment history, Financial data</span><br />
          <strong>Terms the researcher has agreed to:</strong>
          <ol>
            <li>
              Researchers have agreed to use the data solely for the specified
              research purpose and not for any other commercial or
              non-research-related activities.
            </li>
            <li>
              On meeting the research requirements, the data provider will be
              rewarded with the mentioned amount for staking their data.
            </li>
          </ol><br />
          <strong>Data stake duration:</strong> 60 days
          <br />
          <strong>Stake reward:</strong> 10 ROSE
          <br />
          <br />
          <em>
            <FcInfo className="market_place_popup_container__icon"></FcInfo>
            Tip: You can use ZKP to check if you meet the researcher's
            requirements
          </em>
        </p>
        <div className="market_place_popup_container__content__confirm">
          <ConnectButton
            text={verification && verification[0] && verification[1] ? "Stake Data" : "Generate ZKP"}
            height="50px"
            width="150px"
            clickHandle={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
