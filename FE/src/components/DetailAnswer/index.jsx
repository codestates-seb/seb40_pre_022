import React from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
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
import { getDetailQPost } from "../../api/question/detailQApi";
import { sortDate } from "../../utils/sortDate";
import { useState } from "react";
import { useEffect } from "react";

const DetailAnswer = ({ answers }) => {
  // const date = answer.map((el) => el.createdAt);
  // const sortData = () => {
  //   console.log(sortDate(date));
  // };
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    if (answers.answers) setAnswer(answers.answers);
  });

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
            <DetailPost key={answer.answerId} answers={answer} />
          ))
        : null}
    </>
  );
};

export default DetailAnswer;
