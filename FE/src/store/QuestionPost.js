import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist-atom",
  storage: sessionStorage,
});

export const QuestionTitle = atom({
  key: "QuestionTitle",
  default: "",
  effects: [persistAtom],
});

export const QuestionTags = atom({
  key: "QuestionTags",
  default: [],
  effects: [persistAtom],
});
