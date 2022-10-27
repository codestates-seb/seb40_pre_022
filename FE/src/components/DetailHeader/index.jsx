import React from "react";
import {
  HeaderContainer,
  QuestionHeader,
  QuestionInfo,
  QuestionTitle,
  InfoContainer,
  AskQuestionBtn,
} from "./style";

const DetailHeader = () => {
  return (
    <>
      <HeaderContainer>
        <QuestionHeader>
          <QuestionTitle>제목입니다.</QuestionTitle>
          <AskQuestionBtn>Ask Question</AskQuestionBtn>
        </QuestionHeader>
      </HeaderContainer>
      <InfoContainer>
        <QuestionInfo>Asked</QuestionInfo>
        <QuestionInfo color="black">today</QuestionInfo>
      </InfoContainer>
      <InfoContainer>
        <QuestionInfo>Modified</QuestionInfo>
        <QuestionInfo color="black">today</QuestionInfo>
      </InfoContainer>
      <InfoContainer>
        <QuestionInfo>Viewed</QuestionInfo>
        <QuestionInfo color="black">12 times</QuestionInfo>
      </InfoContainer>
    </>
  );
};

export default DetailHeader;
