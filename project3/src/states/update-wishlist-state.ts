import { atom } from "recoil";

const updateWishlistStateAtom = atom<boolean>({
  key: "updateWishlistState",
  default: false,
});

export default updateWishlistStateAtom;
