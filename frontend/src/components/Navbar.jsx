import React from "react";
import "../styles/components/Navbar.scss";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import useToggle from "../hooks/useToggle"

const Navbar = () => {
  const [showDashboardDropdown, setShowDashboardDropdown] = useToggle(false);

  const toggleDashboardDropdown = () => {
    setShowDashboardDropdown();
  };

  return (
    <>
      <div className="navbar_container">
        <div className="navbar_container__left">
          <div className="navbar_container__left__name">💎 zk-Sapphire  </div>
        </div>
        <div className="navbar_container__middle">
          <div
            className="navbar_container__middle__link"
            onMouseEnter={toggleDashboardDropdown}
            onMouseLeave={toggleDashboardDropdown}
          >
            Dashboard
            {showDashboardDropdown && (
              <div className="dropdown-content">
                <Link to="/dashboard/user">User</Link>
                <Link to="/dashboard/prescriptions">Prescriptions</Link>
                <Link to="/dashboard/reports">Reports</Link>
              </div>
            )}
          </div>
          <Link to="/hospital" className="navbar_container__middle__link">
            Hospital
          </Link>
          <Link to="/pharmacy" className="navbar_container__middle__link">
            Pharmacy
          </Link>
          <Link to="/marketplace" className="navbar_container__middle__link">
            Marketplace
          </Link>
        </div>
        <div className="navbar_container__right">
          <ConnectButton chainStatus="icon" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
