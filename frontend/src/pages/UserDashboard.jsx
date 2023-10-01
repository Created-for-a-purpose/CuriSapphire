import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import UserData from "../components/UserData"; // Import the UserData component
import "../styles/pages/UserDashboard.scss";
import { dataAddress, dataAbi } from "../constants";
import * as sapphire from "@oasisprotocol/sapphire-paratime";
import { signMessage } from "wagmi/actions";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import useSignature from "../hooks/useSignature";

export default function UserDashboard() {
  const sig = useSignature();
  const account = useAccount();
  // Sample user data
  const [userData, setUserData] = useState({
    name: "-",
    age: "-",
    bloodGroup: "-",
    address: "-",
    phoneNumber: "-",
    email: "-",
  });

  useEffect(() => {
    async function retrieveData() {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const dataContract = new ethers.Contract(
          dataAddress,
          dataAbi,
          await sapphire.wrap(provider).getSigner()
        );
        let signature = sig.signature;
        if (sig.signature === "") {
          const message = await dataContract.getHash(account.address);
          signature = await signMessage({ message: { raw: message } });
          sig.setSignature(signature);
        }
        const userData = await dataContract.getPatientData(
          account.address,
          signature
        );
        setUserData({
          name: userData[2],
          age: userData[3].toString(),
          bloodGroup: userData[4],
          address: userData[5],
          phoneNumber: userData[6],
          email: userData[7],
        });
      } catch (err) {
        console.log(err);
      }
    }
    retrieveData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="user_dashboard_container">
        <div className="user_dashboard_container__content">
          <UserData {...userData} />
        </div>
      </div>
    </>
  );
}
