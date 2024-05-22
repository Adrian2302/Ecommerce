import React from "react";
import ProductItem from "../product-item";
import { Products } from "../../models/components-props";
import "./styles.scss";

interface ProductListProps {
  itemList: Products[];
}

const ProductList: React.FC<ProductListProps> = ({ itemList }) => {
  return (
    <div className="">
      {itemList.length === 0 ? (
        <p>No items found</p>
      ) : (
        <ul className="product-list">
          {itemList.map((product) => (
            <li key={product.id}>
              <ProductItem
                id={product.id}
                name={product.name}
                description={product.smallDescription}
                image={product.images[0]}
                price={product.price}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
