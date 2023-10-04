import React from "react";
import "../styles/components/ResearchCard.scss";

const HouseCard = ({
  image,
  name,
  title,
  duration,
  stakeAward,
  onClick,
}) => {
  return (
    <div className="house_card_container" onClick={onClick}>
      <div className="house_card_container__left">
        <div className="house_card_container__left__image_container">
          <img
            src={image}
            alt="house"
            className="house_card_container__left__image_container__image"
          />
        </div>
      </div>
      <div className="house_card_container__right">
        <div className="house_card_container__right__title_container">
          <div className="house_card_container__right__title_container__title">
            Name : {name}
          </div>
          <div className="house_card_container__right__title_container__subtitle">
            Title : {title}
          </div>
          <div className="house_card_container__right__title_container__subtitle">
            Stack Duration : {duration}
          </div>
        </div>{" "}
        <div className="house_card_container__right__price">
          <div className="house_card_container__right__price__title">Stake Reward : </div>
          <div className="house_card_container__right__price__price">
            &nbsp; {stakeAward} Rose
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default HouseCard;
