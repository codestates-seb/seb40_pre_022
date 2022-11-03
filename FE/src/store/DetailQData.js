import { atom } from "recoil";

export const DetailQData = atom({
  key: "DetailQData",
  default: {
    data: {
      questionId: undefined,
      title: "",
      body: "",
      vote: undefined,
      view: undefined,
      author: {
        displayName: "",
        email: "",
        image: "",
      },
      answers: {
        data: [
          {
            answerId: undefined,
            body: "",
            vote: undefined,
            author: {
              displayName: "",
              email: "",
              image: "",
            },
            isAccepted: undefined,
            createdAt: "",
            updatedAt: "",
          },
        ],
        pageInfo: {
          page: undefined,
          size: undefined,
          totalElements: undefined,
          totalPages: undefined,
        },
      },
      questionTags: [
        {
          tagName: "",
        },
        {
          tagName: "",
        },
      ],
      createdAt: "",
      updatedAt: "",
    },
  },
});
