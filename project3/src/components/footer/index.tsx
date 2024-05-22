import "./styles.scss";
import xLogo from "../../assets/icons/x.svg";
import facebookLogo from "../../assets/icons/facebook.svg";
import instagramLogo from "../../assets/icons/instagram.svg";
import youtubeLogo from "../../assets/icons/youtube.svg";

const Footer = () => {
  return (
    <footer className="footer footer--color" role="contentinfo">
      <div className=" footer__container">
        <div className="footer__left-section">
          <div className="footer__socials">
            <a
              className="footer__link"
              href="https://twitter.com/stockx?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            >
              <img
                className="footer__link-img footer__link-img--white"
                src={xLogo}
                alt="x"
              />
            </a>
            <a
              className="footer__link"
              href="https://www.facebook.com/stockxdotcom/"
            >
              <img
                className="footer__link-img footer__link-img--white"
                src={facebookLogo}
                alt="Facebook"
              />
            </a>
            <a
              className="footer__link"
              href="https://www.instagram.com/stockx/?hl=en"
            >
              <img
                className="footer__link-img footer__link-img--white"
                src={instagramLogo}
                alt="Instagram"
              />
            </a>
            <a className="footer__link" href="https://www.youtube.com/c/Stockx">
              <img
                className="footer__link-img footer__link-img--white"
                src={youtubeLogo}
                alt="YouTube"
              />
            </a>
          </div>
          <div className="footer__rights">
            <p
              className="footer__rights-p footer__rights-p--white"
              tabIndex={0}
            >
              ©2024 StockX. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="footer__disclaimer">
          <p
            className="footer__disclaimer-p footer__disclaimer-p--white"
            tabIndex={0}
          >
            This disclaimer serves to elucidate that while efforts have been
            exerted to ensure the accuracy and reliability of the information
            herein, no absolute guarantee is provided regarding its completeness
            or timeliness.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
