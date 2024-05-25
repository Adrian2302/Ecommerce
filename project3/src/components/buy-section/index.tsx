import "./styles.scss";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Products } from "../../models/components-props";
import { Button } from "@nextui-org/react";
import { useRecoilState } from "recoil";
// import cartItemStateAtom from "../../states/cart-item-state";
import MySelect from "../../components/my-select";
import toast, { Toaster } from "react-hot-toast";
import tokenStateAtom from "../../states/token-state";
import axios from "axios";
import updateCartStateAtom from "../../states/update-cart-state";

interface BuySectionProps {
  product: Products;
}

const BuySection: React.FC<BuySectionProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>();
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [updateCart, setUpdateCart] = useRecoilState(updateCartStateAtom);
  // const [cartItem, setCartItem] =
  //   useRecoilState<CartProduct[]>(cartItemStateAtom);

  const navigate = useNavigate();

  // const isProductInCart = (productId: number, size?: string) => {
  //   return cartItem.some((item) => item.id === productId && item.size === size);
  // };

  // const AddProduct = () => {
  //   if (token === null) {
  //     navigate("/login");
  //   } else if (product !== undefined) {
  //     if (isProductInCart(product.id, selectedSize)) {
  //       toast.error("Product is already in the cart.");
  //       return;
  //     }
  //     if (product.sizes !== undefined) {
  //       if (!selectedSize) {
  //         toast.error("Please select a size.");
  //         return;
  //       }
  //       const cartProduct: CartProduct = {
  //         id: product.id,
  //         name: product.name,
  //         image: product.images[0],
  //         price: product.price,
  //         color: product.color,
  //         releaseDate: product.releaseYear,
  //         size: selectedSize,
  //         quantity: 1,
  //       };
  //       setCartItem((prevCart) => [...prevCart, cartProduct]);
  //       toast.success("Product added to cart!");
  //     } else {
  //       const cartProduct: CartProduct = {
  //         id: product.id,
  //         name: product.name,
  //         image: product.images[0],
  //         price: product.price,
  //         color: product.color,
  //         releaseDate: product.releaseYear,
  //         quantity: 1,
  //       };
  //       setCartItem((prevCart) => [...prevCart, cartProduct]);
  //       toast.success("Product added to cart!");
  //     }
  //   }
  // };

  const AddProduct = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (
        product.sizes!.length > 0 &&
        (selectedSize === null || selectedSize === undefined)
      ) {
        toast.error("Please select a size.");
      } else {
        await axios.post(
          `http://localhost:8080/api/cart`,
          {
            product: { id: product.id },
            size: selectedSize,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success("Product added to cart!");
        setUpdateCart(!updateCart);
      }
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
      if (
        (error.response && error.response.status === 440) ||
        // error.response.status === 403 ||
        error.response.status === 500
      ) {
        setToken(null);
        navigate("/login");
      } else {
        toast.error("Product is already in the cart.");
      }
    }
  };
  return (
    <div className="buy-container">
      {product?.sizes!.length > 0 ? (
        <MySelect
          dictionary={product.sizes!}
          onChange={setSelectedSize}
          label="Select a size"
        />
      ) : null}
      <Button
        className="buy-container__add-btn bg-[$stockx-color] text-[$white]"
        onClick={AddProduct}
      >
        <p className="buy-container__add-btn--bold">
          Add to Cart for ${product.price}
        </p>
      </Button>
      <Toaster />
    </div>
  );
};

export default BuySection;
