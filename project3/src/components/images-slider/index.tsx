import "./styles.scss";
import { Slider } from "@nextui-org/react";
import React, { useState } from "react";
import { getImageURL } from "../../utils/functions";

interface ImagesSliderProp {
  imageSources: string[];
}
const range = 1;
const getImageIndex = (value: number) => Math.floor(value / range);

const ImagesSlider: React.FC<ImagesSliderProp> = ({ imageSources }) => {
  // imageSources = imageSources.sort();
  // console.log(imageSources);
  const [currentImage, setCurrentImage] = useState<number>(0);

  const selectImage = (value: number) => {
    setCurrentImage(getImageIndex(value));
  };

  return (
    <div className="image-slider">
      <img
        src={getImageURL(`../assets/products/${imageSources[currentImage]}`)}
        alt="Product"
      />
      <Slider
        size="sm"
        aria-label="Product image slider"
        step={1}
        minValue={0}
        maxValue={imageSources.length - 1}
        defaultValue={0}
        // className="max-w-md"
        classNames={{
          base: "max-w-[10rem]",
          // filler: "bg-[#5f5f5f]",
          // thumb: ["bg-[#5f5f5f]", "text-[#5f5f5f]"],
        }}
        onChange={(value) => selectImage(Number(value))}
      />
    </div>
  );
};

export default ImagesSlider;
