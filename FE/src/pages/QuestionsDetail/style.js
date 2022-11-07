import styled from "styled-components";

const PageContainer = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PostContainer = styled.div`
  padding: 24px;
  width: 100%;
  display: flex;
`;

const LeftPostContainer = styled.div`
  flex: 3;
`;

export { PageContainer, PostContainer, LeftPostContainer };
