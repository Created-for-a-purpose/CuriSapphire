import React from "react";
import "../styles/components/Navbar.scss";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="navbar_container">
        <div className="navbar_container__left">
          <div className="navbar_container__left__name">zk-Health</div>
        </div>
        <div className="navbar_container__middle">
          <Link to = "/dashboard/user" className="navbar_container__middle__link">Dashboard</Link>
          <Link to = "/hospital" className="navbar_container__middle__link">Hospitals</Link>
          <Link to = "/pharmacy" className="navbar_container__middle__link">Pharmacy</Link>
          <Link to = "/pharmacy" className="navbar_container__middle__link">DataHub</Link>
        </div>
        <div className="navbar_container__right">
          <ConnectButton chainStatus="icon" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
