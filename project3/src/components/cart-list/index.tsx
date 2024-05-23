import "./styles.scss";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface CartListProps {
  children: ReactNode[];
}

const CartList: React.FC<CartListProps> = ({ children }) => {
  return (
    <div className="cart-list__container">
      <ul className="cart-list">
        {children.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default CartList;
