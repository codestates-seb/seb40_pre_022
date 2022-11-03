import React from "react";
import { useRecoilValue } from "recoil";
import { calculateTime } from "../../utils/calculateTime";
import DetailPost from "../DetailPost";
import {
  AnswerCount,
  AnswerHeader,
  SortContainer,
  SortOption,
  SortSelect,
  SortText,
} from "./style";
import { DetailQData } from "../../store/DetailQData";
import { sortDate } from "../../utils/sortDate";

const DetailAnswer = () => {
  const answer = useRecoilValue(DetailQData).answers.data;
  const date = answer.map((el) => el.createdAt);
  const sortData = () => {
    console.log(sortDate(date));
  };
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
              <SortOption selected={sortData}>
                Date created (oldest first)
              </SortOption>
            </SortSelect>
          </SortContainer>
        </AnswerHeader>
      ) : null}
      {answer.length
        ? answer.map((answer) => (
            <DetailPost
              answer={answer.body}
              vote={answer.vote}
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
