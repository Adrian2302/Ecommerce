// TotalPriceCalculator.tsx
import "./styles.scss";

import React from "react";
import { CartProduct } from "../../models/components-props";
import { Button, Card } from "@nextui-org/react";
import { calculateTotalPrice, calculateQuantity } from "../../utils/functions";
import { Link } from "react-router-dom";
interface CartInfoProps {
  cartItems: CartProduct[];
}

const CartInfo: React.FC<CartInfoProps> = ({ cartItems }) => {
  const totalPrice = calculateTotalPrice(cartItems);
  const totalItems = calculateQuantity(cartItems);

  return (
    <>
      {totalItems > 0 ? (
        <Card className="cart-info sticky top-20">
          <div className="cart-info__container">
            <h2>Summary:</h2>
            <p>Total products: {totalItems}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
          <div className="cart-info__link-checkout-container">
            <Link to="/checkout" className="cart-info__link-checkout">
              <Button className="cart-info__link-checkout-btn bg-[$stockx-color] text-[$white]">
                Proceed to checkout
              </Button>
            </Link>
          </div>
        </Card>
      ) : null}
    </>
  );
};

export default CartInfo;
