import "./styles.scss";
import React from "react";
import Hero from "../../components/hero";
import useFetch from "../../utils/useFetch";
import FeaturedCarousel from "../../components/carousel-featured";
import AdidasCarousel from "../../components/carousel-adidas";
import NikeCarousel from "../../components/carousel-nike";
import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import thankYouStateAtom from "../../states/thank-you-state";
import { useRecoilState } from "recoil";

const HomePage: React.FC = () => {
  const { data } = useFetch("/data/products.json");
  const [thankYouValue, setThankYou] =
    useRecoilState<boolean>(thankYouStateAtom);
  if (thankYouValue) {
    setThankYou(false);
  }

  return (
    <>
      <Hero />
      <main className="home-page">
        <FeaturedCarousel />
        <AdidasCarousel />
        <NikeCarousel />
        <div className="home-page__redirect">
          <Link className="home-page__redirect-link" to="/all-products">
            <Button
              type="button"
              className="home-page__redirect-btn home-page__redirect-btn--color bg-[$stockx-color] text-[$white]"
            >
              See All Products
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default HomePage;
