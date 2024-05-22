import { atom } from "recoil";

const updateCartStateAtom = atom<boolean>({
  key: "updateCartState",
  default: false,
});

export default updateCartStateAtom;
