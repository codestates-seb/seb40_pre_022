import styled from "styled-components";

const MyPageContainer = styled.div`
  padding: 24px;
  width: 100vw;
  display: inline-block;
  flex-direction: column;
  align-items: center;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;

  .img {
    width: 128px;
    height: 128px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 8px;
    box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
      0 2px 8px hsla(0, 0%, 0%, 0.05);
  }
`;

const Username = styled.div`
  margin: 8px;
  line-height: 1;
  font-size: 2.5em;
  margin-bottom: 12px;
`;

export { MyPageContainer, UserContainer, Username };
