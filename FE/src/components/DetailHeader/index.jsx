import React from "react";
import {
  HeaderContainer,
  QuestionHeader,
  QuestionInfo,
  QuestionTitle,
  InfoContainer,
} from "./style";
import { Button } from "../Button";

const DetailHeader = () => {
  return (
    <>
      <HeaderContainer>
        <QuestionHeader>
          <QuestionTitle>제목입니다.</QuestionTitle>
          <Button label='Ask Question' size='header-size' />
        </QuestionHeader>
      </HeaderContainer>
      <InfoContainer>
        <QuestionInfo>Asked</QuestionInfo>
        <QuestionInfo color='black'>today</QuestionInfo>
      </InfoContainer>
      <InfoContainer>
        <QuestionInfo>Modified</QuestionInfo>
        <QuestionInfo color='black'>today</QuestionInfo>
      </InfoContainer>
      <InfoContainer>
        <QuestionInfo>Viewed</QuestionInfo>
        <QuestionInfo color='black'>12 times</QuestionInfo>
      </InfoContainer>
    </>
  );
};

export default DetailHeader;
