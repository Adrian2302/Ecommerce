import "./styles.scss";
import React from "react";
import { Products } from "../../models/components-props";
import SellingFastBadge from "../../assets/icons/SellingFastBadge.gif";
import BelowRetailBadge from "../../assets/icons/BelowRetailBadge.gif";
interface ProductPerformanceProp {
  product: Products | undefined;
}

const ProductPerformance: React.FC<ProductPerformanceProp> = ({ product }) => {
  return (
    <>
      {product !== undefined ? (
        product.recentlySold > 100 ? (
          <div className="product-performance product-performance--color">
            <img
              className="product-performance-icon"
              src={SellingFastBadge}
              alt="Selling fast icon"
            />
            <p
              className="product-performance__info product-performance__info--bold"
              tabIndex={0}
            >
              This Item Sells Fast!
            </p>
          </div>
        ) : product.price < product.retailPrice ? (
          <div className="product-performance product-performance--color">
            <img
              className="product-performance-icon"
              src={BelowRetailBadge}
              alt="Selling fast icon"
            />
            <p className="product-performance__info product-performance__info--bold">
              Price Currently Below Retail
            </p>
          </div>
        ) : null
      ) : null}
    </>
  );
};

export default ProductPerformance;
