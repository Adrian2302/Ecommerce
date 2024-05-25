import "./styles.scss";
// import { useRecoilValue } from "recoil";
// import cartItemStateAtom from "../../states/cart-item-state";
// import { calculateTotalPrice } from "../../utils/functions";
// import { CartProduct } from "../../models/components-props";

interface PriceSummaryProps {
  total: number | undefined;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ total }) => {
  // const cartItem = useRecoilValue<CartProduct[]>(cartItemStateAtom);
  // const total = calculateTotalPrice(cartItem);
  return (
    <div className="price-summary__container">
      <div className="price-summary">
        <p>Subtotal</p> <p className="price-summary--bold">${total}</p>
        <p>Tax</p> <p className="price-summary--bold">+13%</p>
        <p>Shipping fee</p>
        <p className="price-summary--bold">+$10</p>
        <p>Total</p>
        <p className="price-summary--bold">
          ${((total ?? 0) * 1.13 + 10).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default PriceSummary;
