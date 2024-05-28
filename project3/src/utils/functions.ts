import { CartProduct } from "../models/components-props";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export function calculateTotalPrice(cartItems: CartProduct[]): number {
  return cartItems.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.price * currentItem.quantity,
    0
  );
}
export function calculateQuantity(cartItems: CartProduct[]): number {
  return cartItems.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity;
  }, 0);
}

export function validDate(expirationDate: string): boolean {
  const [monthStr, yearStr] = expirationDate.split("/");
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  return (
    (year > currentYear && 1 <= month && month <= 12) ||
    (year === currentYear && month > currentMonth && month <= 12)
  );
}

export function validateCreditCard(cardNumber: string) {
  const cleanedNumber = cardNumber.replace(/\D/g, "");

  const isVisa = cleanedNumber.match(/^4\d{12}(?:\d{3})?$/);
  const isMastercard = cleanedNumber.match(/^5[1-5]\d{14}$/);
  const isAmex = cleanedNumber.match(/^3[47]\d{13}$/);

  const isValidLuhn = (num: string) => {
    let sum = 0;
    for (let i = 0; i < num.length; i++) {
      let digit = parseInt(num[num.length - 1 - i]);
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  };

  return (isVisa || isMastercard || isAmex) && isValidLuhn(cleanedNumber);
}

export function getCreditCardType(cardNumber: string) {
  const cleanedNumber = cardNumber.replace(/\D/g, "");

  const isVisa = cleanedNumber.match(/^4\d{12}(?:\d{3})?$/);
  const isMastercard = cleanedNumber.match(/^5[1-5]\d{14}$/);
  const isAmex = cleanedNumber.match(/^3[47]\d{13}$/);

  if (isVisa) {
    return "visa";
  } else if (isMastercard) {
    return "mastercard";
  } else if (isAmex) {
    return "amex";
  } else {
    return "invalid";
  }
}

export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);
  return null;
}

export function getImageURL(url: string) {
  return new URL(`../assets/products/${url}`, import.meta.url).href;
}
