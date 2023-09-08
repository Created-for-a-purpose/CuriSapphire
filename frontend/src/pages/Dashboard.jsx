import React from 'react';
import "../styles/pages/Dashboard.scss"
import Navbar from "../components/Navbar";
import ConnectButton from '../components/ConnectButton';

export default function Dashboard(params) {
    const options = [
        "What is your role?",
        "Patient",
        "Hospital",
        "Pharmacy"
    ]
  return (
    <>
      <Navbar />
      <div className="dashboard_container">
        <div className="dashboard_container__form">
            <select>
                {options.map((val, ind) => {
                    return <option value={val} key={ind}>{val}</option>
                })}
            </select>
            <ConnectButton text="Next" height = "40px" width="100px"></ConnectButton>
        </div>
      </div>
    </>
  );
}
