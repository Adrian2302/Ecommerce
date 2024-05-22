import { atom } from "recoil";
import { CartProduct } from "../models/components-props";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const cartItemStateAtom = atom<CartProduct[]>({
  key: "cartItemState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default cartItemStateAtom;
