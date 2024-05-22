import "./styles.scss";
import React from "react";
import heroImage from "../../assets/images/stockx-hero2.png";
import logo from "../../assets/icons/stockx-logo.png";

const Hero: React.FC = () => {
  return (
    <>
      <div className="hero__container" role="banner">
        <div className="hero__content">
          <h1 className="hero__header">
            <img className="hero__content-logo" src={logo} alt="StockX" />
          </h1>
          <p className="hero__content-description--size">
            Enable access to the most coveted items worldwide. Buy and sell
            trending sneakers, apparel, electronics, collectibles, trading
            cards, and accessories.
          </p>
        </div>
        <img className="hero__image" src={heroImage} alt="Hero Image" />
      </div>
    </>
  );
};

export default Hero;
