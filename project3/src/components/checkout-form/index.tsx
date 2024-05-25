import "./styles.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
// import cartItemStateAtom from "../../states/cart-item-state";
import cardStateAtom from "../../states/card-state";
// import { CartProduct } from "../../models/components-props";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import mastercard from "../../assets/icons/mastercard.jpeg";
import visa from "../../assets/icons/visa.png";
import amex from "../../assets/icons/amex.png";
import PriceSummary from "../price-summary";
import thankYouStateAtom from "../../states/thank-you-state";
import {
  validateCreditCard,
  getCreditCardType,
  validDate,
} from "../../utils/functions";
import tokenStateAtom from "../../states/token-state";
import shoppingCartStateAtom from "../../states/shoppingcart-state";
import updateCartStateAtom from "../../states/update-cart-state";
import axios from "axios";
import { calculateTotalPrice } from "../../utils/functions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const provinces = [
  "Heredia",
  "San José",
  "Cartago",
  "Puntarenas",
  "Guanacaste",
  "Limón",
  "Alajuela",
];

const schema = z.object({
  shipping: z.object({
    address1: z.string().regex(/^.*\S.*$/),
    address2: z.string().optional(),
    city: z.string().regex(/^.*\S.*$/),
    province: z.enum(
      [
        "Heredia",
        "San José",
        "Cartago",
        "Puntarenas",
        "Guanacaste",
        "Limón",
        "Alajuela",
      ],
      { message: "Please select a province" }
    ),
    zipCode: z
      .string()
      .length(5, { message: "Zip Code must be 5 characters long" }),
  }),
  creditCard: z.object({
    cardNumber: z.string().refine((value) => validateCreditCard(value), {
      message: "Invalid credit card",
    }),
    cardHolderName: z.string().regex(/^.*\S.*$/),
    expirationDate: z.string().refine((value) => validDate(value), {
      message: "Invalid date",
    }),
    cvv: z.string().length(3, { message: "Invalid" }),
  }),
});

type FormFields = z.infer<typeof schema>;

const CheckoutForm: React.FC = () => {
  const [cardState, setCardState] = useRecoilState<string>(cardStateAtom);
  // const setCartItem = useSetRecoilState<CartProduct[]>(cartItemStateAtom);
  const setThankYou = useSetRecoilState<boolean>(thankYouStateAtom);
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const shoppingCartList = useRecoilValue(shoppingCartStateAtom);
  const [updateCart, setUpdateCart] = useRecoilState(updateCartStateAtom);
  const [total, setTotal] = useState<number>();
  const navigate = useNavigate();

  useEffect(() => {
    setTotal(calculateTotalPrice(shoppingCartList));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      console.log(data);
      // setCartItem([]);

      await axios.post<void>(
        `http://localhost:8080/api/order`,
        {
          address1: data.shipping.address1,
          address2: data.shipping.address2,
          city: data.shipping.city,
          province: data.shipping.province,
          zipCode: data.shipping.zipCode,
          cardNumber: data.creditCard.cardNumber,
          cardHolderName: data.creditCard.cardHolderName,
          expirationDate: data.creditCard.expirationDate,
          cvv: data.creditCard.cvv,
          price: (total! * 1.13 + 10).toFixed(2),
          status: "PENDING",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setThankYou(true);
      setUpdateCart(!updateCart);
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.status === 440) {
        setToken(null);
        navigate("/login");
      }
    }
  };

  function cardType(card: string) {
    setCardState(getCreditCardType(card));
  }

  return (
    <form className="checkout-form__form" onSubmit={handleSubmit(onSubmit)}>
      {/* Shipping Information */}
      <h2 className="checkout-form__title checkout-form__title--bold checkout-form__title--lg">
        Shipping Info
      </h2>
      <Input
        {...register("shipping.address1")}
        type="text"
        label="Address 1"
        isRequired
        placeholder="Enter your Address"
      />
      {errors.shipping?.address1 && (
        <div className="checkout-form__error-msg--red">
          {errors.shipping.address1.message}
        </div>
      )}
      <Input
        {...register("shipping.address2")}
        type="text"
        label="Address 2"
        placeholder="Enter your address 2 (Optional)"
      />
      <Input
        {...register("shipping.city")}
        type="text"
        label="City"
        isRequired
        placeholder="Select a city"
      />
      {errors.shipping?.city && (
        <div className="checkout-form__error-msg--red">
          {errors.shipping.city.message}
        </div>
      )}
      <div className="checkout-form__province-zipcode">
        <div className="checkout-form__select-province">
          <label htmlFor="shipping.province">Select Province: </label>
          <select
            {...register("shipping.province")}
            className="checkout-form__select-province-option"
            defaultValue=""
            name="shipping.province"
            id="shipping.province"
          >
            <option value="" disabled></option>
            {provinces.map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>
        {errors.shipping?.province && (
          <div className="checkout-form__error-msg--red">
            {errors.shipping.province.message}
          </div>
        )}
        <Input
          {...register("shipping.zipCode")}
          type="number"
          label="Zip Code"
          isRequired
          placeholder="Enter your Zip Code"
        />
        {errors.shipping?.zipCode && (
          <div className="checkout-form__error-msg--red">
            {errors.shipping.zipCode.message}
          </div>
        )}
      </div>

      {/* Credit Card Information */}
      <h2 className="checkout-form__title checkout-form__title--bold checkout-form__title--lg">
        Payment Method
      </h2>
      <Input
        {...register("creditCard.cardNumber")}
        type="number"
        label="Card Number"
        isRequired
        placeholder="Enter your Card Number"
        onChange={(event) => cardType(event.target.value)}
        startContent={
          <div>
            {cardState === "invalid" ? null : cardState === "visa" ? (
              <img className="h-6" src={visa} alt="Visa Logo" />
            ) : cardState === "mastercard" ? (
              <img className="h-6" src={mastercard} alt="Mastercard Logo" />
            ) : (
              <img className="h-6" src={amex} alt="American Express Logo" />
            )}
          </div>
        }
      />
      {errors.creditCard?.cardNumber && (
        <div className="checkout-form__error-msg--red">
          {errors.creditCard.cardNumber.message}
        </div>
      )}
      <Input
        {...register("creditCard.cardHolderName")}
        type="text"
        label="Card Holder Name"
        isRequired
        placeholder="Enter Card Holder Name"
      />
      {errors.creditCard?.cardHolderName && (
        <div className="text-red-500">
          {errors.creditCard.cardHolderName.message}
        </div>
      )}
      <div className="checkout-form__date-cvv">
        <div className="checkout-form__error-msg-position">
          <Input
            {...register("creditCard.expirationDate")}
            type="text"
            label="Expiration Date"
            isRequired
            placeholder="MM/YY"
          />
          {errors.creditCard?.expirationDate && (
            <div className="checkout-form__error-msg--red">
              {errors.creditCard.expirationDate.message}
            </div>
          )}
        </div>
        <div className="checkout-form__error-msg-position">
          <Input
            {...register("creditCard.cvv")}
            type="number"
            label="CVV"
            isRequired
            placeholder="Enter the CVV"
            pattern={cardState === "amex" ? "\\d{4}" : "\\d{3}"}
          />
          {errors.creditCard?.cvv && (
            <div className="checkout-form__error-msg--red">
              {errors.creditCard.cvv.message}
            </div>
          )}
        </div>
      </div>
      <Divider className="checkout-page__divider" />
      <PriceSummary total={total} />
      <div className="checkout-form__buy-btn-container">
        <Button
          disabled={isSubmitting}
          type="submit"
          className="checkout-form__buy-btn bg-[$stockx-color] text-[$white]"
        >
          {isSubmitting ? "Loading..." : "Pay Now"}
        </Button>
        {errors.root && (
          <div className="checkout-form__error-msg--red">
            {errors.root.message}
          </div>
        )}
      </div>
    </form>
  );
};

export default CheckoutForm;
