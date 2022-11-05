import { React, useState } from "react";
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
import { Link } from "react-router-dom";

const DetailPost = ({ question }) => {
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
            <PostMenu>Delete</PostMenu>
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
