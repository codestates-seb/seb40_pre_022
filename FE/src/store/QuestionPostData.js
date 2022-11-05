import { atom } from "recoil";

export const postState = atom({
  key: "postState",
  default: false,
});

export const QuestionPostData = atom({
  key: "QuestionPostData",
  default: {
    data: {
      title: "",
      body: "",
      questionTags: [{ questionTagName: "" }],
    },
  },
});
