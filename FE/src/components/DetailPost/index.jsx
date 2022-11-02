import { React } from "react";
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
import { Link } from "react-router-dom";
import { data } from "../../db/data.json";

const DetailPost = ({
  answer,
  answerer,
  createdAt,
  updatedAt,
  profile,
  bestAnswer,
}) => {
  let question = data[0];
  console.log(question.answers.questionTags);
  return (
    <PostLayout className={answer ? "answer" : null}>
      <LayoutLeft>
        <VoteBtn answer={answer} bestAnswer={bestAnswer} />
      </LayoutLeft>
      <LayoutRight>
        <PostBody>
          <ContentViewer markdown={answer || question.body} />
        </PostBody>
        <TagContainer>
          {answer
            ? null
            : question.answers.questionTags.map((el) => (
                <TagWrapper>
                  <Button primary={false} label={el.tagName} Tagged='Tagged' />
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
          </PostMenuContainer>
          <UserInfo className='edit'>
            <UserInfoText>{updatedAt}</UserInfoText>
          </UserInfo>
          <DetailUserProfile
            answerer={answerer}
            createdAt={createdAt}
            profile={profile}
          />
        </InfoContainer>
      </LayoutRight>
    </PostLayout>
  );
};

export default DetailPost;
