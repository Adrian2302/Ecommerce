import "./styles.scss";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProductItem from "../product-item";
import { Products } from "../../models/components-props";
import prev from "../../assets/icons/prev.svg";
import next from "../../assets/icons/next.svg";

interface CarouselProps {
  itemList: Products[];
}

const Carousel: React.FC<CarouselProps> = ({ itemList }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container" style={{ display: "flex" }}>
          {itemList.map((item, index) => (
            <div key={index} className="embla__slide" style={{ width: "20%" }}>
              <ProductItem
                id={item.id}
                name={item.name}
                description={item.smallDescription}
                image={item.images[0]}
                price={item.price}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="carousel__btns">
        <button className="embla__prev" onClick={scrollPrev}>
          <img src={prev} alt="Previous previous"></img>
        </button>
        <button className="embla__next" onClick={scrollNext}>
          <img src={next} alt="Next product"></img>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
