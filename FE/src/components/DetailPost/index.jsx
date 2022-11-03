import { React, useEffect } from "react";
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
import { data } from "../../db/data.json";
import { useRecoilState, useRecoilValue } from "recoil";
import { DetailQData } from "../../store/DetailQData";
import AQRightsidebar from "../AQsidebar";

const DetailPost = ({
  answer,
  answerer,
  createdAt,
  updatedAt,
  profile,
  bestAnswer,
  vote,
}) => {
  const [queData, setQueData] = useRecoilState(DetailQData);
  const params = Number(useParams().id);
  setQueData(data.filter((el) => el.questionId === params)[0]);
  const question = useRecoilValue(DetailQData);

  return (
    <PostLayout className={answer ? "answer" : null}>
      <LayoutLeft>
        <VoteBtn answer={answer} bestAnswer={bestAnswer} vote={vote} />
      </LayoutLeft>
      <LayoutRight>
        <PostBody>
          <ContentViewer markdown={answer || question.body} />
        </PostBody>
        <TagContainer>
          {answer
            ? null
            : question.questionTags.map((el) => (
                <TagWrapper key={el.tagName}>
                  <Button label={el.tagName} Tagged='Tagged' />
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
            {/* 작성자일 때만 보여야 함 */}
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
