import "./styles.scss";
import React, { useEffect, useState } from "react";
import { Button, Divider } from "@nextui-org/react";
import CartList from "../../components/cart-list";
import CartInfo from "../../components/cart-info";
// import cartItemStateAtom from "../../states/cart-item-state";
import { useRecoilValue, useRecoilState } from "recoil";
// import { CartProduct } from "../../models/components-props";
import thankYouStateAtom from "../../states/thank-you-state";
import EmptyCart from "../../components/empty-cart";
import tokenStateAtom from "../../states/token-state";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import updateCartStateAtom from "../../states/update-cart-state";
import LoadingCircle from "../../components/loading-circle";
import CartItem from "../../components/cart-item";
import { ShoppingCartListApiResponse } from "../../models/components-props";
import shoppingCartStateAtom from "../../states/shoppingcart-state";
import SearchInput from "../search-input";
import AddProductBtn from "../add-product-btn";

const ProductsTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const updateCart = useRecoilValue(updateCartStateAtom);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const [thankYouValue, setThankYou] =
    useRecoilState<boolean>(thankYouStateAtom);
  const [shoppingCartList, setShoppingCartList] = useRecoilState(
    shoppingCartStateAtom
  );

  if (thankYouValue) {
    setThankYou(false);
  }

  const fetchShoppingCartItems = async () => {
    try {
      const fetchedShoppingCartList =
        await axios.get<ShoppingCartListApiResponse>(
          `http://localhost:8080/api/cart`,
          {
            headers: {
              Authorization: `Bearer ${token === undefined ? null : token}`,
            },
          }
        );
      setShoppingCartList(fetchedShoppingCartList.data.items);
      setLoading(false);
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
      setToken(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchShoppingCartItems();
    console.log(`update en shoppingcart: ${updateCart}`);
  }, [updateCart]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <main className="products-table">
      <h2 className="products-table__title products-table__title--big products-table__title--bold">
        Manage products
      </h2>
      <AddProductBtn />
      <Divider className="products-table__divider" />
      <div className="products-table__content">
        {isLoading ? (
          <LoadingCircle />
        ) : (
          <>
            {shoppingCartList.length === 0 ? (
              <EmptyCart />
            ) : (
              <>
                <SearchInput onChangeCallback={handleSearchChange} />
                {/* <CartList
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
                <CartInfo cartItems={shoppingCartList} /> */}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default ProductsTable;
