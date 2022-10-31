import React from "react";
import DetailPost from "../DetailPost";
import { AnswerCount, AnswerHeader } from "./style";

const DetailAnswer = () => {
  const content = "답변입니다.";
  const user = "answerer";
  return (
    <>
      <AnswerHeader>
        <AnswerCount>1 Answer</AnswerCount>
      </AnswerHeader>
      <DetailPost />
    </>
  );
};

export default DetailAnswer;
