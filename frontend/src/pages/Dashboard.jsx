import React from 'react';
import "../styles/pages/Dashboard.scss"
import Navbar from "../components/Navbar";
import ConnectButton from '../components/ConnectButton';
import { useNavigate } from 'react-router-dom';

export default function Dashboard(params) {
    const navigate = useNavigate();
    const options = [
        "What is your role?",
        "Patient",
        "Hospital",
        "Pharmacy"
    ]
    const [role, setRole] = React.useState(null);

  const proceed = () => {
    if (role === "Patient") {
      navigate("/dashboard/patient");
    } else if (role === "Hospital") {
      navigate("/dashboard/hospital");
    } else if (role === "Pharmacy") {
      navigate("/dashboard/pharmacy");
    }
  };

  return (
    <>
      <Navbar />
      <div className="dashboard_container">
        <div className="dashboard_container__form">
            <select onChange={(e)=>setRole(e.target.value)}>
                {options.map((val, ind) => {
                    return <option value={val} key={ind}>{val}</option>
                })}
            </select>
            <ConnectButton text="Next" height="40px" width="100px" clickHandle={proceed}></ConnectButton>
        </div>
      </div>
    </>
  );
}
