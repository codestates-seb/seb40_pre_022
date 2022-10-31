import React from "react";
import {
  HeaderContainer,
  QuestionHeader,
  QuestionInfo,
  QuestionTitle,
  InfoContainer,
  InfoWrapper,
} from "./style";
import { Button } from "../Button";
import { DETAIL_HEADER_INFO } from "../../constants";
import { Link } from "react-router-dom";

const DetailHeader = () => {
  return (
    <>
      <HeaderContainer>
        <QuestionHeader>
          <QuestionTitle>Title</QuestionTitle>
          <Link to='/question/ask'>
            <Button label='Ask Question' size='header-size' />
          </Link>
        </QuestionHeader>
      </HeaderContainer>
      <InfoWrapper>
        {DETAIL_HEADER_INFO.map((info) => {
          return (
            <InfoContainer key={info.title}>
              <QuestionInfo>{info.title}</QuestionInfo>
              <QuestionInfo color='black'>{info.content}</QuestionInfo>
            </InfoContainer>
          );
        })}
      </InfoWrapper>
    </>
  );
};

export default DetailHeader;
