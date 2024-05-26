import { atom } from "recoil";
import { UserData } from "../models/components-props";

const currentUserStateAtom = atom<UserData>({
  key: "updateCartState",
  default: undefined,
});

export default currentUserStateAtom;
