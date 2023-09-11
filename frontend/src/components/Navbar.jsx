import React, {forwardRef} from "react";
import "../styles/components/Navbar.scss";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar_container">
        <div className="navbar_container__left">
          Dashboard
        </div>
        <div className="navbar_container__right">
          <ConnectButton accountStatus="address" chainStatus="icon"/>
        </div>
      </div>
    </>
  );
};

export default Navbar;