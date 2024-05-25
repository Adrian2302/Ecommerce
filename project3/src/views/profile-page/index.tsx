import { Divider } from "@nextui-org/react";
import CheckoutTable from "../../components/checkout-table";
import "./styles.scss";
import React, { useEffect, useState } from "react";
// import { calculateQuantity } from "../../utils/functions";
// import cartItemStateAtom from "../../states/cart-item-state";
import { useRecoilState, useRecoilValue } from "recoil";
import ThankYou from "../../components/thank-you";
import thankYouStateAtom from "../../states/thank-you-state";
import ErrorPage from "../error-page";
import shoppingCartStateAtom from "../../states/shoppingcart-state";
import LoadingCircle from "../../components/loading-circle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import tokenStateAtom from "../../states/token-state";

const ProfilePage: React.FC = () => {
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const navigate = useNavigate();
  const thankyou = useRecoilValue<boolean>(thankYouStateAtom);
  const [isLoading, setLoading] = useState(true);
  const shoppingCartList = useRecoilValue(shoppingCartStateAtom);

  const fetchUser = async () => {
    try {
      const fetchedShoppingCartList = await axios.get(
        `http://localhost:8080/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShoppingCartList(fetchedShoppingCartList.data.items);
      setQuantity(calculateQuantity(fetchedShoppingCartList.data.items));
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
      if (error.response && error.response.status === 440) {
        setToken(null);
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
    setLoading(false);
  }, [shoppingCartList]);

  return (
    <main className="checkout-page">
      {isLoading ? (
        <LoadingCircle />
      ) : thankyou === false && shoppingCartList.length > 0 ? (
        <>
          <h1 className="checkout-page__title checkout-page__title--bold checkout-page__title--big">
            Profile
          </h1>
          <Divider className="checkout-page__divider" />
          <CheckoutTable />
        </>
      ) : thankyou === true ? (
        <>
          <h1 className="checkout-page__title checkout-page__title--bold checkout-page__title--big">
            Thank you!
          </h1>
          <Divider className="checkout-page__divider" />
          <ThankYou />
        </>
      ) : (
        <>
          <ErrorPage />
        </>
      )}
    </main>
  );
};

export default ProfilePage;
