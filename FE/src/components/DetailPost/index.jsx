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

const DetailPost = ({ answer, answerer }) => {
  let question = `
  # 헤딩
  **굵게**
\`\`\`
  코드블럭
\`\`\`

  *기울이기*

  `;
  return (
    <PostLayout className={answer ? "answer" : null}>
      <LayoutLeft>
        <VoteBtn />
      </LayoutLeft>
      <LayoutRight>
        <PostBody>
          <ContentViewer markdown={answer || question} />
        </PostBody>
        {answer ? null : (
          <TagContainer>
            <TagWrapper>
              <Button primary={false} label='javascript' Tagged='Tagged' />
            </TagWrapper>
            <TagWrapper>
              <Button primary={false} label='reactjs' Tagged='Tagged' />
            </TagWrapper>
            <TagWrapper>
              <Button primary={false} label='css' Tagged='Tagged' />
            </TagWrapper>
          </TagContainer>
        )}
        <InfoContainer>
          <PostMenuContainer>
            <PostMenu>Share</PostMenu>
            <PostMenu>Edit</PostMenu>
            <PostMenu>Follow</PostMenu>
          </PostMenuContainer>
          <UserInfo className='edit'>
            <UserInfoText>edited 3 hours ago</UserInfoText>
          </UserInfo>
          <DetailUserProfile answerer={answerer} />
        </InfoContainer>
      </LayoutRight>
    </PostLayout>
  );
};

export default DetailPost;
