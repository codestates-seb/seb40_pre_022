import React from "react";
import { Link } from "react-router-dom";
import { calculateTime } from "../../utils/calculateTime";
import {
  AnswerCount,
  AnswerHeader,
  SortContainer,
  SortOption,
  SortSelect,
  SortText,
} from "./style";
import {
  PostLayout,
  LayoutLeft,
  LayoutRight,
  PostBody,
  InfoContainer,
  PostMenuContainer,
  PostMenu,
  UserInfo,
  UserInfoText,
} from "../DetailPost/style";
import ContentViewer from "../ContentViewer";

import { sortDate } from "../../utils/sortDate";
import AnswerVoteBtn from "../AnswerVoteBtn";
import AnswerDetailProfile from "../AnswerDetailProfile";

const DetailAnswer = ({ answer, questionId }) => {
  // const date = answer.map((el) => el.createdAt);
  // const sortData = () => {
  //   console.log(sortDate(date));
  // };

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
        ? answer.map((el) => {
            return (
              <PostLayout className="answer" key={el.answerId}>
                <LayoutLeft>
                  <AnswerVoteBtn answer={el} questionId={questionId} />
                </LayoutLeft>
                <LayoutRight>
                  <PostBody>
                    <ContentViewer markdown={el.body} />
                  </PostBody>
                  <InfoContainer>
                    <PostMenuContainer>
                      <PostMenu>Share</PostMenu>
                      <Link to="/questions/edit">
                        <PostMenu>Edit</PostMenu>
                      </Link>
                      <PostMenu>Follow</PostMenu>
                      <PostMenu>Delete</PostMenu>
                    </PostMenuContainer>
                    <UserInfo className="edit">
                      <UserInfoText>{calculateTime(el.updatedAt)}</UserInfoText>
                    </UserInfo>
                    <AnswerDetailProfile
                      answers={el}
                      AcreatedAt={el.createdAt}
                    />
                  </InfoContainer>
                </LayoutRight>
              </PostLayout>
            );
          })
        : null}
    </>
  );
};

export default DetailAnswer;
