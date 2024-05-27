import { atom } from "recoil";

const updateManageProductsStateAtom = atom<boolean>({
  key: "updateManageProductsState",
  default: false,
});

export default updateManageProductsStateAtom;
