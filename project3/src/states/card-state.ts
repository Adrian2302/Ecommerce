import { atom } from "recoil";

const cardStateAtom = atom({
  key: "cardState",
  default: "invalid",
});

export default cardStateAtom;
