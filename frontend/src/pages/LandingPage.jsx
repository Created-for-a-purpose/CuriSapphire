import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/pages/LandingPage.scss";
import { Heading, useHighlight } from "@chakra-ui/react";
import img from "../images/landing-1.svg";
import ConnectButton from "../components/ConnectButton";
import { useAccount } from "wagmi"

export default function LandingPage() {
  const navigate = useNavigate();
  const { account, isConnected, isDisconnected } = useAccount();
  const [text, setText] = useState("Get started");

  const chunks = useHighlight({
    text: `Curi-Sapphire
    Your Health, Your Data, Your Control 🛂
    CuriSapphire empowers user privacy by leveraging the Sapphire paratime and ZKPs. 
    Enhanced privacy and tokenized data allow us to help create the first-ever responsible data economy
    `,
    query: ["Curi-Sapphire"],
  });
  function Text() {
    return (
      <>
        {chunks.map(({ match, text }) => {
          console.log(match + " " + text);
          if (match) {
            return (
              <Heading
                fontSize="5.5rem"
                fontWeight="lighter"
                fontFamily="mono"
                textAlign="left"
                width="fit-content"
              >
                {text}
              </Heading>
            );
          }
          return (
            <Heading
              fontSize="2rem"
              fontWeight="lighter"
              fontFamily="mono"
              textAlign="left"
              width="fit-content"
              lineHeight="1.5"
            >
              {text}
            </Heading>
          );
        })}
      </>
    );
  }

  const proceed = () => {
    if (isConnected) navigate("/dashboard")
  }

  useEffect(() => {
    if (isConnected) {
      setText("Get Started");
    } 
    else if(isDisconnected){
      setText("Connect a wallet first...");
    }
  }, [account, isConnected, isDisconnected]);

  return (
    <>
      <Navbar/>
      <div className="landing_page">
        <div className="landing_page__left">
          <Text></Text>
          <ConnectButton height={"50px"} width={"200px"} text={text} clickHandle={proceed}/>
          <b>Powered by Sapphire 💪</b>
        </div>
        <div className="landing_page__right">
          <img src={img} alt="img"></img>
        </div>
      </div>
    </>
  );
}
