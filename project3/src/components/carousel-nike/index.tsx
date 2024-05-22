import "./styles.scss";
import React from "react";
import Carousel from "../carousel";
import { Products } from "../../models/components-props";

interface CarouselProps {
  itemList: Products[];
}

const NikeCarousel: React.FC<CarouselProps> = ({ itemList }) => {
  const filteredItems = itemList.filter((item) => item.brand === "Nike");

  return (
    <div className="carousel-nike">
      <p
        className="carousel-nike__title carousel-nike__title--bold carousel-nike__title--big"
        tabIndex={0}
      >
        Nike
      </p>
      <Carousel itemList={filteredItems} />
    </div>
  );
};

export default NikeCarousel;
