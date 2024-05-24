import "./styles.scss";
import React, { useEffect, useState } from "react";
import { Divider } from "@nextui-org/react";
import CartList from "../../components/cart-list";
import CartInfo from "../../components/cart-info";
// import cartItemStateAtom from "../../states/cart-item-state";
import { useRecoilValue, useRecoilState } from "recoil";
import { CartProduct } from "../../models/components-props";
import thankYouStateAtom from "../../states/thank-you-state";
import EmptyCart from "../../components/empty-cart";
import tokenStateAtom from "../../states/token-state";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import updateCartStateAtom from "../../states/update-cart-state";
import LoadingCircle from "../../components/loading-circle";
import CartItem from "../../components/cart-item";
import { ShoppingCartListApiResponse } from "../../models/components-props";
// Si tienes WishlistItem, importarlo también
// import WishlistItem from "../../components/wishlist-item";

// interface ShoppingCartListApiResponse {
//   items: CartProduct[];
// }

const ShoppingCartPage: React.FC = () => {
  const updateList = useRecoilValue(updateCartStateAtom);
  const [shoppingCartList, setShoppingCartList] = useState<CartProduct[]>([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [thankYouValue, setThankYou] =
    useRecoilState<boolean>(thankYouStateAtom);
  if (thankYouValue) {
    setThankYou(false);
  }

  const fetchShoppingCartItems = async () => {
    try {
      const shoppingCartList = await axios.get<ShoppingCartListApiResponse>(
        `http://localhost:8080/api/cart`,
        {
          headers: {
            Authorization: `Bearer ${token === undefined ? null : token}`,
          },
        }
      );
      setShoppingCartList(shoppingCartList.data.items);
      setLoading(false);
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
      setToken(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchShoppingCartItems();
  }, [updateList]);

  return (
    <main className="shopping-cart-page">
      <h1 className="shopping-cart-page__title shopping-cart-page__title--big shopping-cart-page__title--bold">
        Shopping Cart
      </h1>
      <Divider className="shopping-cart-page__divider" />
      <div className="shopping-cart-page__content">
        {isLoading ? (
          <LoadingCircle />
        ) : (
          <>
            {shoppingCartList.length === 0 ? (
              <EmptyCart />
            ) : (
              <>
                <CartList
                  children={shoppingCartList.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      product={item.product}
                      price={item.price}
                      size={item.size}
                      quantity={item.quantity}
                    />
                  ))}
                />
                <CartInfo cartItems={shoppingCartList} />
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default ShoppingCartPage;
