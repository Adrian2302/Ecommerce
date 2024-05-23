import "./styles.scss";
import React, { useEffect, useState } from "react";
import { Divider } from "@nextui-org/react";
import CartList from "../../components/cart-list";
import CartInfo from "../../components/cart-info";
// import cartItemStateAtom from "../../states/cart-item-state";
import { useRecoilValue, useRecoilState } from "recoil";
import { WishlistProduct } from "../../models/components-props";
import thankYouStateAtom from "../../states/thank-you-state";
import EmptyCart from "../../components/empty-cart";
import tokenStateAtom from "../../states/token-state";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import updateWishlistStateAtom from "../../states/update-wishlist-state";
import LoadingCircle from "../../components/loading-circle";
import WishlistItem from "../../components/wishlist-item";

interface WishlistApiResponse {
  items: WishlistProduct[];
}

const WishlistPage: React.FC = () => {
  const updateList = useRecoilValue(updateWishlistStateAtom);
  const [wishlist, setWishlist] = useState<WishlistProduct[]>([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [thankYouValue, setThankYou] =
    useRecoilState<boolean>(thankYouStateAtom);
  if (thankYouValue) {
    setThankYou(false);
  }
  // const cartItem = useRecoilValue<CartProduct[]>(cartItemStateAtom);

  const fetchWishlistItems = async () => {
    try {
      //   const fetchUser = await axios.get("http://localhost:8080/users/me", {
      //     headers: {
      //       Authorization: `Bearer ${token === undefined ? null : token}`,
      //     },
      //   });
      //   const user = fetchUser.data;

      const userWishlist = await axios.get<WishlistApiResponse>(
        `http://localhost:8080/api/wishlist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWishlist(userWishlist.data.items);
      setLoading(false);
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
      setToken(null);
      navigate("/login");
    }
  };
  useEffect(() => {
    fetchWishlistItems();
  }, [updateList]);

  return (
    <main className="wishlist-page">
      <h1 className="wishlist-page__title wishlist-page__title--big wishlist-page__title--bold">
        Wishlist
      </h1>
      <Divider className="wishlist-page__divider" />
      <div className="wishlist-page__content">
        {isLoading ? (
          <LoadingCircle />
        ) : (
          <>
            {wishlist.length === 0 ? (
              <EmptyCart />
            ) : (
              <>
                <CartList
                  children={wishlist.map((item) => (
                    <WishlistItem
                      key={item.id}
                      id={item.id}
                      product={item.product}
                      price={item.price}
                      size={item.size}
                      quantity={item.quantity}
                    />
                  ))}
                />
                <CartInfo cartItems={wishlist} />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default WishlistPage;
