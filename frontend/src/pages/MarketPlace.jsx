import React from "react";
import ResearchCard from "../components/ResearchCard";
import Navbar from "../components/Navbar";
import MarketPlacePopup from "../components/MarketplacePopup";
import "../styles/pages/MarketPlace.scss";
import useToggle from "../hooks/useToggle";

export default function MarketPlace() {
  const [isVisible, setIsVisible] = useToggle(false);
  let img =
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c7ef6e96-c859-4393-847d-5f29b47f783f/d1x73fb-78927be1-aa08-4bb9-81bb-af5aaf228e74.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M3ZWY2ZTk2LWM4NTktNDM5My04NDdkLTVmMjliNDdmNzgzZlwvZDF4NzNmYi03ODkyN2JlMS1hYTA4LTRiYjktODFiYi1hZjVhYWYyMjhlNzQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.eZ6Wi2aSDK-LVg2ypBGUH02FCD6S_LGkxt1KxBv6OEw";
  return (
    <>
      <Navbar></Navbar>

     {isVisible && <MarketPlacePopup
        clickHandle={() => {}}
        purpose={"Research"}
        title={"Title"}
        setIsVisible={setIsVisible}
      ></MarketPlacePopup>}
      <div className="marketplace-container">
        <h1 className="marketplace-title">Marketplace</h1>
        <div className="marketplace-cards">
          <ResearchCard
            image={img}
            name={"Name"}
            duration="60 days"
            title="Research Project 1"
            stakeAward={60}
            onClick={setIsVisible}
            />
          <ResearchCard
            image={img}
            name={"Name"}
            duration="45 days"
            title="Research Project 2"
            stakeAward={45}
            onClick={setIsVisible}
          />
          <ResearchCard
            image={img}
            name={"Name"}
            duration="30 days"
            title="Research Project 3"
            stakeAward={30}
          />
          <ResearchCard
            image={img}
            name={"Name"}
            duration="75 days"
            title="Research Project 4"
            stakeAward={75}
          />
        </div>
      </div>
    </>
  );
}
