import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist-atom",
  storage: sessionStorage,
});

export const AQPage = atom({
  key: "AQPage",
  default: 1,
  effects: [persistAtom],
});
