import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist-atom",
  storage: sessionStorage,
});

export const MypageSet = atom({
  key: "MypageSet",
  default: "profile",
});

export const MemNum = atom({
  key: "MemNumber",
  default: undefined,
});
