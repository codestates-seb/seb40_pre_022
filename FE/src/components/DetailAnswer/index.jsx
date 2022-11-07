import React from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { deleteAnswer, updateAnswer } from "../../api/details";
import { useState } from "react";
import { useEffect } from "react";
import ContentEditor from "../ContentEditor";
import { useRecoilValue } from "recoil";
import { AnswerEditData } from "../../store/AnswerEditData";

const DetailAnswer = ({ answer, questionId, member }) => {
  // const date = answer.map((el) => el.createdAt);
  // const sortData = () => {
  //   console.log(sortDate(date));
  // };
  const [answerId, setAnswerId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const loginMember = localStorage.getItem("memberId");

  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

  const queryClient = useQueryClient();
  const answerValue = useRecoilValue(AnswerEditData);

  const deleteA = useMutation(deleteAnswer, {
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 403") {
        alert("삭제할 권한이 없는 답변입니다.");
      }
    },
  });

  const updateA = useMutation(updateAnswer, {
    retry: 0,
    onSuccess: () => {
      setEditMode(false);
      location.reload();
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.log(error);
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

  const handleEdit = (id) => {
    setEditId(id);
    setEditMode(true);
  };

  const editAnswer = (el) => {
    updateA.mutate({
      id: questionId,
      answerId: el.answerId,
      body: answerValue,
    });
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
                  <AnswerVoteBtn
                    answer={el}
                    questionId={questionId}
                    member={member}
                  />
                </LayoutLeft>
                <LayoutRight>
                  <PostBody>
                    {el.answerId === editId && editMode ? (
                      <ContentEditor answerBody={el.body} />
                    ) : (
                      <ContentViewer markdown={el.body} />
                    )}
                  </PostBody>
                  <InfoContainer>
                    <PostMenuContainer>
                      {el.answerId === editId && editMode ? (
                        <PostMenu onClick={() => editAnswer(el)}>Save</PostMenu>
                      ) : (
                        <>
                          <PostMenu>Share</PostMenu>
                          {Number(JSON.parse(loginMember)) ===
                          el.member.memberId ? (
                            <PostMenu
                              onClick={() => {
                                handleEdit(el.answerId);
                              }}
                            >
                              Edit
                            </PostMenu>
                          ) : null}
                          <PostMenu>Follow</PostMenu>
                          {Number(JSON.parse(loginMember)) ===
                          el.member.memberId ? (
                            <PostMenu
                              onClick={() => {
                                handleDelete(el.answerId);
                              }}
                            >
                              Delete
                            </PostMenu>
                          ) : null}
                        </>
                      )}
                    </PostMenuContainer>
                    <UserInfo className="edit">
                      <UserInfoText>
                        {calculateTime(
                          new Date(Date.parse(el.updatedAt) + KR_TIME_DIFF)
                        )}
                      </UserInfoText>
                    </UserInfo>
                    <AnswerDetailProfile
                      answers={el}
                      AcreatedAt={
                        new Date(Date.parse(el.createdAt) + KR_TIME_DIFF)
                      }
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
