import { atom } from "recoil";

export const QuestionTitle = atom({
  key: "QuestionTitle",
  default: "",
});

export const QuestionTags = atom({
  key: "QuestionTags",
  default: [],
});
