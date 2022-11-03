import React from "react";
import { calculateTime } from "../../utils/calculateTime";
import DetailPost from "../DetailPost";
import { data } from "../../db/data.json";
import {
  AnswerCount,
  AnswerHeader,
  SortContainer,
  SortOption,
  SortSelect,
  SortText,
} from "./style";

const DetailAnswer = () => {
  const answer = data[0].answers.data;

  return (
    <>
      {answer.length ? (
        <AnswerHeader>
          <AnswerCount>{answer.length} Answer</AnswerCount>
          <SortContainer>
            <SortText>Sorted by:</SortText>
            <SortSelect>
              <SortOption>Highest score (default)</SortOption>
              <SortOption>Date modified (newest first)</SortOption>
              <SortOption>Date created (oldest first)</SortOption>
            </SortSelect>
          </SortContainer>
        </AnswerHeader>
      ) : null}
      {answer.length
        ? answer.map((answer) => (
            <DetailPost
              answer={answer.body}
              key={answer.author.displayName}
              answerer={answer.author.displayName}
              createdAt={calculateTime(answer.createdAt)}
              updatedAt={calculateTime(answer.updatedAt)}
              profile={answer.author.image}
              bestAnswer={answer.isChecked}
            />
          ))
        : null}
    </>
  );
};

export default DetailAnswer;
