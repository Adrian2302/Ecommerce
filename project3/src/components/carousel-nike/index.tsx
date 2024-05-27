import "./styles.scss";
import React, { useEffect, useState } from "react";
import Carousel from "../carousel";
import { Products, ProductsApiResponse } from "../../models/components-props";
import axios from "axios";

const NikeCarousel: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

  const fetchNikeProducts = async () => {
    try {
      const response = await axios.get<ProductsApiResponse>(
        "http://localhost:8080/api/product/filter",
        {
          params: {
            brands: "Nike",
            size: 20,
          },
        }
      );

      const products = response.data.content;
      setFilteredProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchNikeProducts();
  }, []);

  return (
    <div className="carousel-nike">
      <p
        className="carousel-nike__title carousel-nike__title--bold carousel-nike__title--big"
        tabIndex={0}
      >
        Nike
      </p>
      <Carousel itemList={filteredProducts} />
    </div>
  );
};

export default NikeCarousel;
