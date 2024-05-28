import "./styles.scss";
import React from "react";
import { WishlistProduct } from "../../models/components-props";
import { Button, Card } from "@nextui-org/react";
import { calculateQuantity } from "../../utils/functions";
import CartSummary from "../cart-summary";
import axios from "axios";
import { useRecoilState } from "recoil";
import tokenStateAtom from "../../states/token-state";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import updateWishlistStateAtom from "../../states/update-wishlist-state";
import updateCartStateAtom from "../../states/update-cart-state";

interface WishlistInfoProps {
  cartItems: WishlistProduct[];
}

const WishlistInfo: React.FC<WishlistInfoProps> = ({ cartItems }) => {
  const [updateWishlist, setUpdateWishlist] = useRecoilState(
    updateWishlistStateAtom
  );
  const totalItems = calculateQuantity(cartItems);
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [updateCart, setUpdateCart] = useRecoilState(updateCartStateAtom);
  const navigate = useNavigate();

  const toShoppingCart = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/cart/convertToShoppingCart`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product added to cart!");
      setUpdateWishlist(!updateWishlist);
      setUpdateCart(!updateCart);
      console.log(`update en wishlist info: ${updateCart}`);
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
      if (error.response && error.response.status === 440) {
        setToken(null);
        navigate("/login");
      }
    }
  };

  return (
    <>
      {totalItems > 0 ? (
        <Card className="wishlist-info sticky top-20">
          <CartSummary cartItems={cartItems} />
          <div className="wishlist-info__btn-container">
            <Button
              className="wishlist-info__btn bg-[$stockx-color] text-[$white]"
              onClick={toShoppingCart}
              tabIndex={0}
            >
              Move to shopping cart
            </Button>
          </div>
        </Card>
      ) : null}
      <Toaster />
    </>
  );
};

export default WishlistInfo;
