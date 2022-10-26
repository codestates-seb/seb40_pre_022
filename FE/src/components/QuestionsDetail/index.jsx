import React from "react";
import Leftsidebar from "../Leftsidebar";
import {
  AskQuestionBtn,
  QuestionTitle,
  QuestionHeader,
  PageContainer,
  QuestionInfo,
  InfoContainer,
  HeaderContainer,
  PostContainer,
} from "./style";

const QuestionsDetail = () => {
  return (
    <>
      <PageContainer>
        <Leftsidebar />
        <PostContainer>
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
        </PostContainer>
      </PageContainer>
    </>
  );
};

export default QuestionsDetail;
