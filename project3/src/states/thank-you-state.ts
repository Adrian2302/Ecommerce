import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const thankYouStateAtom = atom<boolean>({
  key: "thankYouState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default thankYouStateAtom;
