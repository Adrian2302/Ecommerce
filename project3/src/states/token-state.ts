import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const tokenStateAtom = atom<string | null>({
  key: "tokenState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export default tokenStateAtom;
