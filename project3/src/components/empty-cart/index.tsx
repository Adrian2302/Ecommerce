import "./styles.scss";
import React from "react";

import emptyCart from "../../assets/images/empty.png";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";

const EmptyCart: React.FC = () => {
  return (
    <div className="empty-cart">
      <img className="empty-cart__image" src={emptyCart} alt="Empty Cart" />
      <Link to="/all-products" className="empty-cart__return-link">
        <Button
          type="button"
          className="empty-cart__return-btn bg-[$stockx-color] text-[$white]"
        >
          See All Products
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCart;
