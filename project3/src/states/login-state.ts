import { atom } from "recoil";

const loginStateAtom = atom({
  key: "LoginState",
  default: false,
});

export default loginStateAtom;
