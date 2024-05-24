import { Divider } from "@nextui-org/react";
import CheckoutTable from "../../components/checkout-table";
import "./styles.scss";
import React, { useEffect, useState } from "react";
import { calculateQuantity } from "../../utils/functions";
// import cartItemStateAtom from "../../states/cart-item-state";
import { useRecoilValue } from "recoil";
import ThankYou from "../../components/thank-you";
import thankYouStateAtom from "../../states/thank-you-state";
import ErrorPage from "../error-page";
import shoppingCartStateAtom from "../../states/shoppingcart-state";
import LoadingCircle from "../../components/loading-circle";

const CheckoutPage: React.FC = () => {
  const thankyou = useRecoilValue<boolean>(thankYouStateAtom);
  const [isLoading, setLoading] = useState(true);
  // const cartItem = useRecoilValue(cartItemStateAtom);
  const shoppingCartList = useRecoilValue(shoppingCartStateAtom);
  const [quantity, setQuantity] = useState<number>();

  useEffect(() => {
    setQuantity(calculateQuantity(shoppingCartList));
    setLoading(false);
  }, [quantity, shoppingCartList]);

  return (
    <main className="checkout-page">
      {isLoading ? (
        <LoadingCircle />
      ) : thankyou === false && quantity! > 0 ? (
        <>
          <h1 className="checkout-page__title checkout-page__title--bold checkout-page__title--big">
            Checkout
          </h1>
          <Divider className="checkout-page__divider" />
          <CheckoutTable />
        </>
      ) : thankyou === true && quantity === 0 ? (
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

export default CheckoutPage;
