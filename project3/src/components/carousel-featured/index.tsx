import "./styles.scss";
import React, { useEffect, useState } from "react";
import Carousel from "../carousel";
import { Products, ProductsApiResponse } from "../../models/components-props";
import axios from "axios";

const CarouselFeatured: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get<ProductsApiResponse>(
        "http://localhost:8080/api/product/filter",
        {
          params: {
            years: 2024,
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
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="carousel-featured">
      <p
        className="carousel-featured__title carousel-featured__title--bold carousel-featured__title--big"
        tabIndex={0}
      >
        Featured Products
      </p>
      <Carousel itemList={filteredProducts} />
    </div>
  );
};

export default CarouselFeatured;
