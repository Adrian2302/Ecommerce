import "./styles.scss";
import React from "react";
import CartItem from "../cart-item";
import { CartProduct } from "../../models/components-props";
import { motion } from "framer-motion";

interface CarListProps {
  itemList: CartProduct[];
}

const CartList: React.FC<CarListProps> = ({ itemList }) => {
  return (
    <div className="cart-list__container">
      <ul className="cart-list">
        {itemList.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CartItem
              id={item.id}
              product={item.product}
              price={item.price}
              size={item.size}
              quantity={item.quantity}
            />
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default CartList;
