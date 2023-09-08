import React from "react";
import "../styles/components/Navbar.scss";
import ConnectButton from "./ConnectButton";
// import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar_container">
        <div className="navbar_container__left">
          Dashboard
        </div>
        <div className="navbar_container__right">
          <ConnectButton height={"100%"} width={"100px"} text="Connect"/>
        </div>
      </div>
    </>
  );
};

export default Navbar;