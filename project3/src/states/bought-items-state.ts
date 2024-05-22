import { atom } from "recoil";
import { CartProduct } from "../models/components-props";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const boughtItemStateAtom = atom<CartProduct[]>({
  key: "boughtItemState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default boughtItemStateAtom;
