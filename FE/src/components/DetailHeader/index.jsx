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

import { calculateTime } from "../../utils/calculateTime";
import { useRecoilValue } from "recoil";
import { DetailQData } from "../../store/DetailQData";

const DetailHeader = () => {
  const data = useRecoilValue(DetailQData);
  const questionInfo = [
    calculateTime(data.createdAt),
    calculateTime(data.updatedAt),
    data.view,
  ];
  return (
    <>
      <HeaderContainer>
        <QuestionHeader>
          <QuestionTitle>{data.title}</QuestionTitle>
          <Link to='/question/ask'>
            <Button label='Ask Question' size='header-size' />
          </Link>
        </QuestionHeader>
      </HeaderContainer>
      <InfoWrapper>
        {DETAIL_HEADER_INFO.map((info, i) => {
          return (
            <InfoContainer key={info.title}>
              <QuestionInfo>{info.title}</QuestionInfo>
              <QuestionInfo color='black'>{questionInfo[i]}</QuestionInfo>
            </InfoContainer>
          );
        })}
      </InfoWrapper>
    </>
  );
};

export default DetailHeader;
