import "./styles.scss";
import React from "react";
import { Products } from "../../models/components-props";
interface ProductPerformanceProp {
  product: Products | undefined;
}

const Details: React.FC<ProductPerformanceProp> = ({ product }) => {
  return (
    <>
      <h2
        className="details__title details__title--xl details__title--semibold"
        tabIndex={0}
      >
        Product Details
      </h2>
      <div className="details__container">
        <div className="details__part1">
          <div className="details__color">
            <p tabIndex={0}>Color</p>
            <p className="details--bold" tabIndex={0}>
              {product?.color}
            </p>
          </div>
          <div className="details__price">
            <p tabIndex={0}>Price</p>
            <p className="details--bold" tabIndex={0}>
              ${product?.price}
            </p>
          </div>
          <div className="details__price">
            <p tabIndex={0}>Retail Price</p>
            <p className="details--bold" tabIndex={0}>
              ${product?.retailPrice}
            </p>
          </div>
          <div className="details__date">
            <p tabIndex={0}>Release Date</p>
            <p className="details--bold" tabIndex={0}>
              {product?.releaseYear}
            </p>
          </div>
        </div>
        <div className="details__part2">
          <h3
            className="details__subtitle details__subtitle--semibold details__subtitle--lg"
            tabIndex={0}
          >
            Description
          </h3>
          <p className="details__description" tabIndex={0}>
            {product?.fullDescription}
          </p>
        </div>
      </div>
    </>
  );
};

export default Details;
