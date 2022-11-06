import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
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
import { deleteAnswer } from "../../api/details";
import { useState } from "react";
import { useEffect } from "react";

const DetailAnswer = ({ answer, questionId }) => {
  // const date = answer.map((el) => el.createdAt);
  // const sortData = () => {
  //   console.log(sortDate(date));
  // };
  const [answerId, setAnswerId] = useState("");

  const deleteA = useMutation(deleteAnswer, {
    retry: 0,
    onError: (error) => {
      if (error.message === "Request failed with status code 403") {
        alert("삭제할 권한이 없는 답변입니다.");
      }
    },
  });

  useEffect(() => {
    if (answerId) {
      deleteA.mutate({
        id: questionId,
        answerId: answerId,
      });
    }
  }, [answerId]);

  const handleDelete = (id) => {
    setAnswerId(id);
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
                      <PostMenu
                        onClick={() => {
                          handleDelete(el.answerId);
                        }}
                      >
                        Delete
                      </PostMenu>
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
