import "./styles.scss";
import React from "react";
import Carousel from "../carousel";
import { Products } from "../../models/components-props";

interface CarouselProps {
  itemList: Products[];
}

const CarouselFeatured: React.FC<CarouselProps> = ({ itemList }) => {
  const filteredItems = itemList.filter((item) => item.recentlySold > 100);

  return (
    <div className="carousel-featured">
      <p
        className="carousel-featured__title carousel-featured__title--bold carousel-featured__title--big"
        tabIndex={0}
      >
        Featured Products
      </p>
      <Carousel itemList={filteredItems} />
    </div>
  );
};

export default CarouselFeatured;
