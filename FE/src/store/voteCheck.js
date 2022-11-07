import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist-atom",
  storage: sessionStorage,
});

export const voteUpState = atom({
  key: "voteUpState",
  default: false,
  effects: [persistAtom],
});

export const voteDownState = atom({
  key: "voteDownState",
  default: false,
  effects: [persistAtom],
});
