import "./styles.scss";
import React from "react";
import { Card, Input } from "@nextui-org/react";
import { CartProduct } from "../../models/components-props";
// import cartItemStateAtom from "../../states/cart-item-state";
import { useRecoilState } from "recoil";
import { getImageURL } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import tokenStateAtom from "../../states/token-state";
import updateCartStateAtom from "../../states/update-cart-state";

const CartItem: React.FC<CartProduct> = ({
  id,
  product,
  price,
  size,
  quantity,
}) => {
  // const setCartItem = useSetRecoilState<CartProduct[]>(cartItemStateAtom);
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [updateList, setUpdateList] = useRecoilState(updateCartStateAtom);

  const modifyItem = async (newQuantity: number) => {
    // setCartItem((prevCart) => {
    //   if (newQuantity <= 0) {
    //     newQuantity = 1;
    //   }
    //   return prevCart.map((item: CartProduct) => {
    //     if (item.size === size && item.id === id) {
    //       return {
    //         ...item,
    //         quantity: newQuantity,
    //       };
    //     }
    //     return item;
    //   });
    // });
    // console.log(newQuantity);
    try {
      await axios.put(
        "http://localhost:8080/api/cart/editQuantity",
        {
          id: id,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUpdateList(!updateList);
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
      // setToken(null);
      // navigate("/login");
    }
  };

  const clickRemove = async () => {
    try {
      // const getUser = await axios.get("http://localhost:8080/users/me", {
      //   headers: {
      //     Authorization: `Bearer ${token === undefined ? null : token}`,
      //   },
      // });
      // const user = getUser.data;

      await axios.delete<void>(`http://localhost:8080/api/cart/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token === undefined ? null : token}`,
        },
      });
      setUpdateList(!updateList);
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
      setToken(null);
      navigate("/login");
    }
  };

  return (
    <Card isBlurred shadow="sm" className="cart-item__container mx-0 my-2">
      <div className="cart-item">
        <button
          className="cart-item__remove-btn cart-item__remove-btn--big"
          onClick={clickRemove}
        >
          &times;
        </button>
        <div className="cart-item__image-container">
          <img
            alt={product.name}
            className="cart-item__image"
            src={getImageURL(`../assets/products/${product.images[0]}`)}
          />
        </div>
        <div className="cart-item__info">
          <h2 className="font-semibold text-foreground/90">{product.name}</h2>
          <p className="text-small text-foreground/80">
            {product.releaseYear} | {product.color}
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

export default CartItem;
