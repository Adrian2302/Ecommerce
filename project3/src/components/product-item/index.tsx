import "./styles.scss";
import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { ProductCard } from "../../models/components-props";
import useScreenWidth from "../../utils/useScreenWidth";
import { Link } from "react-router-dom";
import { getImageURL } from "../../utils/functions";
import AddToWishlistBtn from "../add-to-wishlist-btn";

const ProductItem: React.FC<ProductCard> = ({
  id,
  name,
  description,
  image,
  price,
}) => {
  const screenWidth = useScreenWidth();

  const truncateText = (text: string, len: number) => {
    if (screenWidth < 400 && text.length > len) {
      return text.slice(0, len - 6) + "...";
    }
    return text;
  };

  return (
    <Card
      className="product__item"
      classNames={{
        base: "justify-between p-2",
        header: "p-1 mb-2 justify-center",
        body: "justify-between p-1",
      }}
    >
      <CardHeader>
        <Link className="product__image-container" to={`/details/${id}`}>
          <Image
            alt={name}
            src={getImageURL(image)}
            className="product__image"
            classNames={{
              img: "justify-center",
              wrapper: "justify-center",
            }}
          />
        </Link>
      </CardHeader>
      <CardBody className="product__info">
        <Link
          className="product__info-title product__info-title--medium"
          to={`/details/${id}`}
        >
          {truncateText(name, 26)}
        </Link>
        <Link
          className="product__info-description product__info-description--small"
          to={`/details/${id}`}
        >
          {truncateText(description, 22)}
        </Link>
        <Link
          className="product__info-price product__info-price--xl product__info-price--bold product__info-price--gray"
          to={`/details/${id}`}
        >
          ${price}
        </Link>
      </CardBody>
      <div className="product__wishlist-btn">
        <AddToWishlistBtn productId={id} />
      </div>
    </Card>
  );
};

export default ProductItem;
