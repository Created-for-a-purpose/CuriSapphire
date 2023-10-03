import "../styles/components/Popup.scss";
import ConnectButton from "./ConnectButton";

export default function Popup({ verified, setIsVisible, title, who, what, clickHandle }) {
  
  const handleClick = () => {
    clickHandle();
  };
  return (
    <>
      <div className="popup_container" onClick={setIsVisible}>
        <div className="popup_container__content">
          <div className="popup_container__content__title">{title}</div>
          <p className="popup_container__content__body">
            🟢 A data access token will be transferred to your {who}. <br /> 🟢
            The validity of the token is <span>1 hour</span>. <br /> 🟢 You will
            be charged <span>1 Rose</span> as {what} fee for this transaction.<br/>
            {typeof verified !== "boolean" ? "" : (verified ? "🟢 Requested proof is verified": "⚠️ Requested proof is not verified")}
          </p>
          <div className="popup_container__content__confirm">
            <ConnectButton
              text={"Confirm"}
              height={"50px"}
              width={"150px"}
              clickHandle={handleClick}
            ></ConnectButton>
          </div>
        </div>
      </div>
    </>
  );
}
