import React, { useState } from "react";
import ResearchCard from "../components/ResearchCard";
import Navbar from "../components/Navbar";
import MarketPlacePopup from "../components/MarketplacePopup";
import "../styles/pages/MarketPlace.scss";
import useToggle from "../hooks/useToggle";
import axios from "axios";
import { readContract } from "wagmi/actions";
import { ageVerifierAbi, ageVerifierAddress, reportVerifierAbi, reportVerifierAddress } from "../constants";
import { reportData2 } from "../utils/sampleReport"

export default function MarketPlace() {
  const [isVisible, setIsVisible] = useToggle(false);
  const [verified1, setVerified1] = useState(false);
  const [verified2, setVerified2] = useState(false);

  let img =
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c7ef6e96-c859-4393-847d-5f29b47f783f/d1x73fb-78927be1-aa08-4bb9-81bb-af5aaf228e74.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M3ZWY2ZTk2LWM4NTktNDM5My04NDdkLTVmMjliNDdmNzgzZlwvZDF4NzNmYi03ODkyN2JlMS1hYTA4LTRiYjktODFiYi1hZjVhYWYyMjhlNzQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.eZ6Wi2aSDK-LVg2ypBGUH02FCD6S_LGkxt1KxBv6OEw";
    
    const verifyRequirements = async () =>{
      const input = {
        age: 18
      }
      const reqConfig = {
        url: "http://localhost:8000/generateProof/age",
        method: "POST",
        data: input,
      };
      await axios.request(reqConfig).then(async (res) => {
        const proof = res.data;
        const isVerified = await readContract({
          address: ageVerifierAddress,
          abi: ageVerifierAbi,
          functionName: "verifyProof",
          args: [proof[0], proof[1], proof[2], proof[3]]
        })
        setVerified1(isVerified);
      }).catch((err)=>{console.log(err)});
      const input2 = {
        disease: reportData2.diagnosis
      }
      const reqConfig2 = {
        url: "http://localhost:8000/generateProof/report",
        method: "POST",
        data: input2
      }
  
      await axios.request(reqConfig2).then(async (res) => {
        const callData = res.data;
        const isVerified = await readContract({
          address: reportVerifierAddress,
          abi: reportVerifierAbi,
          functionName: "verifyProof",
          args: [callData[0], callData[1], callData[2], callData[3]]
        })
        setVerified2(isVerified)
      }).catch((err) => { console.log(err)})
    }
    return (
    <>
      <Navbar/>
     {isVisible && <MarketPlacePopup
        clickHandle={verifyRequirements}
        verification={[verified1, verified2]}
        purpose={"Explore lifestyle factors (diet, exercise, environment) influencing heart disease risk in young adults (18-25). The goal is to devise effective preventive measures for prevalent heart disease in this age group."}
        title={"Heart disease research"}
        setIsVisible={setIsVisible}
      />}
      <div className="marketplace-container">
        <h1 className="marketplace-title">Dataverse</h1>
        <div className="marketplace-cards">
          <ResearchCard
            image={img}
            name={"Dr. Brenner"}
            duration="60 days"
            title="Heart disease research 🧪"
            stakeAward={10}
            onClick={setIsVisible}
            />
          <ResearchCard
            image={img}
            name={"Dr. Strange"}
            duration="45 days"
            title="Research Project 2"
            stakeAward={45}
            onClick={setIsVisible}
          />
          <ResearchCard
            image={img}
            name={"Dr. Who"}
            duration="30 days"
            title="Research Project 3"
            stakeAward={30}
          />
          <ResearchCard
            image={img}
            name={"Prof. Lewin"}
            duration="75 days"
            title="Research Project 4"
            stakeAward={47}
          />
        </div>
      </div>
    </>
  );
}
