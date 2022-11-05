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
  UserInfoText,
  TagContainer,
} from "./style";
import VoteBtn from "../VoteBtn";
import ContentViewer from "../ContentViewer";
import DetailUserProfile from "../DetailUserProfile";
import { Button } from "../Button";
import { TagWrapper } from "../CreateAnswer/style";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import DetailAnswer from "../DetailAnswer";

const DetailPost = ({ questions, answers }) => {
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);
  useEffect(() => {
    if (questions) setQuestion(questions);
    if (answers) setAnswer(answers);
  });

  return (
    <PostLayout className={answer ? "answer" : null}>
      <LayoutLeft>
        <VoteBtn
          answer={answer.body}
          bestAnswer={answer.isAccepted}
          vote={answer.voteCount}
        />
      </LayoutLeft>
      <LayoutRight>
        <PostBody>
          <ContentViewer markdown={answer.body || question.body} />
        </PostBody>
        <TagContainer>
          {answer
            ? null
            : question.questionTags.map((el) => (
                <TagWrapper key={el.questionTagName}>
                  <Button label={el.questionTagName} Tagged='Tagged' />
                </TagWrapper>
              ))}
        </TagContainer>
        <InfoContainer>
          <PostMenuContainer>
            <PostMenu>Share</PostMenu>
            <Link to='/question/edit'>
              <PostMenu>Edit</PostMenu>
            </Link>
            <PostMenu>Follow</PostMenu>
            <PostMenu>Delete</PostMenu>
          </PostMenuContainer>
          <UserInfo className='edit'>
            <UserInfoText>{answer.updatedAt}</UserInfoText>
          </UserInfo>
          <DetailUserProfile answers={answer} questions={question} />
        </InfoContainer>
      </LayoutRight>
    </PostLayout>
  );
};

export default DetailPost;
