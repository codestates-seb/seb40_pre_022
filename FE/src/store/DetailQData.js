import { atom } from "recoil";

export const DetailQData = atom({
  key: "DetailQData",
  default: {
    data: {
      questionId: 0,
      title: "",
      body: "",
      voteCount: 0,
      viewCount: 0,
      member: {
        name: "",
        email: "",
        image: "",
      },
      answers: [
        {
          name: "",
          email: "",
          image: "",
        },
      ],
      questionTags: [
        {
          questionTagName: "",
        },
      ],
      createdAt: "",
      updatedAt: "",
    },
  },
});
