import "../styles/components/Popup.scss";
import ConnectButton from "./ConnectButton";

export default function Popup({setIsVisible}) {
  const handleClick = () => {
    alert("clicked");
  }
  return (
    <>
      <div className="popup_container" onClick={setIsVisible}>
        <div className="popup_container__content">
          <div className="popup_container__content__title">
            Healthcare data access tokens
          </div>
          <p className="popup_container__content__body">
            🟢 A data access token will be transferred to your doctor. <br /> 🟢
            The validity of the token is <span>1 hour</span>. <br /> 🟢 You will
            be charged <span>1 Rose</span> as consultation fee for this
            transaction.
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
