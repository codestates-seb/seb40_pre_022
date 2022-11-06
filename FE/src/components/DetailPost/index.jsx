import { React, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  PostLayout,
  LayoutLeft,
  LayoutRight,
  PostBody,
  InfoContainer,
  PostMenuContainer,
  PostMenu,
  UserInfo,
  TagContainer,
} from "./style";
import VoteBtn from "../VoteBtn";
import ContentViewer from "../ContentViewer";
import DetailUserProfile from "../DetailUserProfile";
import { Button } from "../Button";
import { TagWrapper } from "../CreateAnswer/style";
import { Link, useNavigate } from "react-router-dom";
import { deleteQuestion } from "../../api/details";

const DetailPost = ({ question }) => {
  const navigate = useNavigate();
  const deleteQ = useMutation(deleteQuestion(question.questionId), {
    retry: 0,
    onError: (error) => {
      console.log(error.message);
    },
  });
  const handleDelete = () => {
    deleteQ.mutate();
    navigate(`/questions`);
  };
  return (
    <PostLayout>
      <LayoutLeft>
        <VoteBtn question={question} />
      </LayoutLeft>
      <LayoutRight>
        <PostBody>
          <ContentViewer markdown={question.body} />
        </PostBody>
        <TagContainer>
          {question.questionTags.map((el) => (
            <TagWrapper key={el.questionTagName}>
              <Button label={el.questionTagName} Tagged="Tagged" />
            </TagWrapper>
          ))}
        </TagContainer>
        <InfoContainer>
          <PostMenuContainer>
            <PostMenu>Share</PostMenu>
            <Link to="/questions/edit">
              <PostMenu>Edit</PostMenu>
            </Link>
            <PostMenu>Follow</PostMenu>
            <PostMenu onClick={handleDelete}>Delete</PostMenu>
          </PostMenuContainer>
          <UserInfo className="edit"></UserInfo>
          <DetailUserProfile
            questions={question}
            QcreatedAt={question.createdAt}
          />
        </InfoContainer>
      </LayoutRight>
    </PostLayout>
  );
};

export default DetailPost;
