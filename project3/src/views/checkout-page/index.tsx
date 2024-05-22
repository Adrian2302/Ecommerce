import { Divider } from "@nextui-org/react";
import CheckoutTable from "../../components/checkout-table";
import "./styles.scss";
import React from "react";
import { calculateQuantity } from "../../utils/functions";
import cartItemStateAtom from "../../states/cart-item-state";
import { useRecoilValue } from "recoil";
import ThankYou from "../../components/thank-you";
import thankYouStateAtom from "../../states/thank-you-state";
import ErrorPage from "../error-page";

const CheckoutPage: React.FC = () => {
  const thankyou = useRecoilValue<boolean>(thankYouStateAtom);
  const cartItem = useRecoilValue(cartItemStateAtom);
  const quantity = calculateQuantity(cartItem);
  return (
    <main className="checkout-page">
      {thankyou === false && quantity > 0 ? (
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
