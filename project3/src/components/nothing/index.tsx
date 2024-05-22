import "./styles.scss";
import React from "react";

import nothingImg from "../../assets/images/nothing.png";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

const Nothing: React.FC = () => {
  return (
    <div className="no-checkout">
      <img
        className="no-checkout__image"
        src={nothingImg}
        alt="Nothing to see here image"
      />
      <Link to="/home" className="no-checkout__return-link">
        <Button
          type="button"
          className="no-checkout__return-btn bg-[$stockx-color] text-[$white]"
        >
          Return to Home
        </Button>
      </Link>
    </div>
  );
};

export default Nothing;
