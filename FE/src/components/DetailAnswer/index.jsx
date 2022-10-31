import React from "react";
import DetailPost from "../DetailPost";
import { AnswerCount, AnswerHeader } from "./style";

const DetailAnswer = () => {
  const answer = [
    { content: "답변입니다~", answerer: "MINDA01" },
    {
      content: "두 번째 답변입니다~",
      answerer: "Heeyoon",
    },
    {
      content: "`세 번째 답변입니다~`",
      answerer: "Helperbot5",
    },
  ];
  return (
    <>
      {answer.length ? (
        <AnswerHeader>
          <AnswerCount>{answer.length} Answer</AnswerCount>
        </AnswerHeader>
      ) : null}
      {answer.length
        ? answer.map((answer) => (
            <DetailPost
              answer={answer.content}
              key={answer.answerer}
              answerer={answer.answerer}
            />
          ))
        : null}
    </>
  );
};

export default DetailAnswer;
