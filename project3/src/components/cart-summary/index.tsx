import "./styles.scss";

import React from "react";
import { CartProduct, WishlistProduct } from "../../models/components-props";
import { calculateTotalPrice, calculateQuantity } from "../../utils/functions";
interface CartInfoProps {
  cartItems: CartProduct[] | WishlistProduct[];
}

const CartSummary: React.FC<CartInfoProps> = ({ cartItems }) => {
  const totalPrice = calculateTotalPrice(cartItems);
  const totalItems = calculateQuantity(cartItems);

  return (
    <>
      <div className="cart-info__container">
        <h2>Summary:</h2>
        <p>Total products: {totalItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
    </>
  );
};

export default CartSummary;
