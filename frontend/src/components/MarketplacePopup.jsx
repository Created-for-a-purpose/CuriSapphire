import React from "react";
import ConnectButton from "./ConnectButton";
import { FcInfo } from "react-icons/fc";
import "../styles/components/MarketPlacePopup.scss";
import useToggle from "../hooks/useToggle";

export default function Popup({ setIsVisible, title, purpose, clickHandle }) {
  const [verificationComplete, setVerificationComplete] = useToggle(false);

  const handleClick = () => {
    setIsVisible();
    if (verificationComplete) {
      // Perform data staking action here
      setVerificationComplete()
    } else {
        setVerificationComplete()
    //   clickHandle();
    }
  };

  return (
    <div className="market_place_popup_container" onClick={setIsVisible}>
      <div className="market_place_popup_container__content">
        <div className="market_place_popup_container__content__title">
          {title}
        </div>
        <p className="market_place_popup_container__content__body">
          <strong>Research Purpose:</strong> {purpose}
          <br />
          <strong>Research Requirements:</strong>
          <span role="img" aria-label="diagnosis-cancer">
            {" "}
            🔴 Diagnosis: Cancer
          </span>
          <br />
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
          </ol>
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
            text={verificationComplete ? "Stake Data" : "Generate ZKP"}
            height="50px"
            width="150px"
            clickHandle={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
