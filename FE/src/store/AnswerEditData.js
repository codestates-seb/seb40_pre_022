import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist-atom",
  storage: sessionStorage,
});

export const AnswerEditData = atom({
  key: "AnswerEditData",
  default: undefined,
  effects: [persistAtom],
});
