import "./styles.scss";

interface PriceSummaryProps {
  total: number | undefined;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ total }) => {
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
