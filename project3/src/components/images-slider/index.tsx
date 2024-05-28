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
  const [currentImage, setCurrentImage] = useState<number>(0);

  const selectImage = (value: number) => {
    setCurrentImage(getImageIndex(value));
  };

  return (
    <div className="image-slider">
      <img src={getImageURL(imageSources[currentImage])} alt="Product" />
      <Slider
        size="sm"
        aria-label="Product image slider"
        step={1}
        minValue={0}
        maxValue={imageSources.length - 1}
        defaultValue={0}
        classNames={{
          base: "max-w-[10rem]",
        }}
        onChange={(value) => selectImage(Number(value))}
      />
    </div>
  );
};

export default ImagesSlider;
