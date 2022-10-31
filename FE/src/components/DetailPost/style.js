import styled from "styled-components";

const PostLayout = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
`;

const LayoutLeft = styled.div`
  width: auto;
  padding-right: 16px;
`;

const LayoutRight = styled.div`
  padding-right: 16px;
  grid-column: 2;
  width: auto;
  min-width: 0;
`;

const PostBody = styled.div`
  font-size: 15px;

  .markdown {
    margin-bottom: 1.1em;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const PostMenuContainer = styled.div`
  display: flex;
  flex: 1;
`;

const PostMenu = styled.div`
  color: hsl(210deg 8% 45%);
  margin: 4px;
  font-size: 0.9em;
  cursor: pointer;
`;

const UserInfo = styled.div`
  background-color: rgb(210, 228, 245);
  padding: 5px 6px 7px 7px;
  color: hsl(210deg 8% 45%);
  flex: 1;
  border-radius: 3px;

  &.edit {
    color: rgb(10, 93, 193);
    background-color: white;
  }
`;

const UserInfoText = styled.div`
  margin-top: 1px;
  margin-bottom: 4px;
  font-size: 12px;
`;

export {
  PostLayout,
  LayoutLeft,
  LayoutRight,
  PostBody,
  InfoContainer,
  PostMenuContainer,
  PostMenu,
  UserInfo,
  UserInfoText,
};
