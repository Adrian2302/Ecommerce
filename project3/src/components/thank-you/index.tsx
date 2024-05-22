import "./styles.scss";
import React from "react";
import thankyou from "../../assets/icons/completed.png";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

const ThankYou: React.FC = () => {
  return (
    <div className="thank-you">
      <img
        className="thank-you__image"
        src={thankyou}
        alt="Thank you image"
      ></img>
      <Link to="/home" className="thank-you__return-link">
        <Button
          type="button"
          className="thank-you__return-btn bg-[$stockx-color] text-[$white]"
        >
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default ThankYou;
