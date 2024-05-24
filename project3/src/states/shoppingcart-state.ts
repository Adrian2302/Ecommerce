import { atom } from "recoil";
import { CartProduct } from "../models/components-props";

const shoppingCartStateAtom = atom<CartProduct[]>({
  key: "shoppingCartState",
  default: [],
});

export default shoppingCartStateAtom;
