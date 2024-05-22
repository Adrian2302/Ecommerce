import "./styles.scss";
import React from "react";
import Carousel from "../carousel";
import { Products } from "../../models/components-props";

interface CarouselProps {
  itemList: Products[];
}

const AdidasCarousel: React.FC<CarouselProps> = ({ itemList }) => {
  const filteredItems = itemList.filter((item) => item.brand === "Adidas");

  return (
    <div className="carousel-adidas">
      <p
        className="carousel-adidas__title carousel-adidas__title--bold carousel-adidas__title--big"
        tabIndex={0}
      >
        Adidas
      </p>
      <Carousel itemList={filteredItems} />
    </div>
  );
};

export default AdidasCarousel;
