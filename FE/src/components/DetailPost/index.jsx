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
} from "./style";
import VoteBtn from "../VoteBtn";
import ContentViewer from "../ContentViewer";
import DetailUserProfile from "../DetailUserProfile";

const DetailPost = () => {
  let markdown = `
  # 헤딩
  **굵게**
\`\`\`
  코드블럭
\`\`\`

  *기울이기*

  `;
  return (
    <PostLayout>
      <LayoutLeft>
        <VoteBtn />
      </LayoutLeft>
      <LayoutRight>
        <PostBody>
          <ContentViewer markdown={markdown} />
        </PostBody>
        <InfoContainer>
          <PostMenuContainer>
            <PostMenu>Share</PostMenu>
            <PostMenu>Edit</PostMenu>
            <PostMenu>Follow</PostMenu>
          </PostMenuContainer>
          <UserInfo className='edit'>
            <UserInfoText>edited 3 hours ago</UserInfoText>
          </UserInfo>
          <DetailUserProfile />
        </InfoContainer>
      </LayoutRight>
    </PostLayout>
  );
};

export default DetailPost;
