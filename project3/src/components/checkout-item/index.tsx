import "./styles.scss";
import React from "react";
import { Card, Input } from "@nextui-org/react";
import { CartProduct } from "../../models/components-props";
import cartItemStateAtom from "../../states/cart-item-state";
import { useSetRecoilState } from "recoil";

const CheckoutItem: React.FC<CartProduct> = ({
  id,
  name,
  image,
  price,
  color,
  releaseDate,
  size,
  quantity,
}) => {
  const setCartItem = useSetRecoilState<CartProduct[]>(cartItemStateAtom);

  const modifyItem = (newQuantity: number) => {
    setCartItem((prevCart) => {
      if (newQuantity <= 0) {
        newQuantity = 1;
      }
      return prevCart.map((item: CartProduct) => {
        if (item.size === size && item.id === id) {
          return {
            ...item,
            quantity: newQuantity,
          };
        }
        return item;
      });
    });
  };

  const clickRemove = () => {
    setCartItem((prevCart) => {
      const filteredCart = prevCart.filter(
        (item) => !(item.id === id && item.size === size)
      );
      return filteredCart;
    });
  };

  return (
    <Card isBlurred shadow="sm" className="mx-0 my-2">
      <div className="cart-item">
        <button
          className="cart-item__remove-btn cart-item__remove-btn--big"
          onClick={clickRemove}
        >
          &times;
        </button>
        <div className="cart-item__image-container">
          <img alt={name} className="cart-item__image" src={image} />
        </div>
        <div className="cart-item__info">
          <h2 className="font-semibold text-foreground/90">{name}</h2>
          <p className="text-small text-foreground/80">
            {releaseDate} | {color}
          </p>
          {size ? <p>Size: {size}</p> : null}
          <Input
            className="cart-item__quantity"
            type="number"
            label="Quantity:"
            placeholder="1"
            defaultValue={String(quantity)}
            min="1"
            labelPlacement="outside"
            onChange={(event) => modifyItem(Number(event.target.value))}
            startContent={
              <div className="pointer-events-none flex items-center"></div>
            }
          />
        </div>
        <p className="cart-item__price cart-item__price--bold cart-item__price--xl">
          ${price}
        </p>
      </div>
    </Card>
  );
};

export default CheckoutItem;
