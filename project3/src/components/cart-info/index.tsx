// TotalPriceCalculator.tsx
import "./styles.scss";

import React from "react";
import { CartProduct } from "../../models/components-props";
import { Button, Card } from "@nextui-org/react";
import { calculateQuantity } from "../../utils/functions";
import { Link } from "react-router-dom";
import CartSummary from "../cart-summary";
interface CartInfoProps {
  cartItems: CartProduct[];
}

const CartInfo: React.FC<CartInfoProps> = ({ cartItems }) => {
  const totalItems = calculateQuantity(cartItems);

  return (
    <>
      {totalItems > 0 ? (
        <Card className="cart-info sticky top-20">
          <CartSummary cartItems={cartItems} />
          <div className="cart-info__link-checkout-container">
            <Link to="/checkout" className="cart-info__link-checkout">
              <Button
                className="cart-info__link-checkout-btn bg-[$stockx-color] text-[$white]"
                tabIndex={0}
              >
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
