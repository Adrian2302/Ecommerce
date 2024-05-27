import "./styles.scss";
import React, { useEffect, useState } from "react";
import Carousel from "../carousel";
import { Products, ProductsApiResponse } from "../../models/components-props";
import axios from "axios";

const AdidasCarousel: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

  const fetchAdidasProducts = async () => {
    try {
      const response = await axios.get<ProductsApiResponse>(
        "http://localhost:8080/api/product/filter",
        {
          params: {
            brands: "Adidas",
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
    fetchAdidasProducts();
  }, []);

  return (
    <div className="carousel-adidas">
      <p
        className="carousel-adidas__title carousel-adidas__title--bold carousel-adidas__title--big"
        tabIndex={0}
      >
        Adidas
      </p>
      <Carousel itemList={filteredProducts} />
    </div>
  );
};

export default AdidasCarousel;
