import styled from "styled-components";
import { flexCenter, flexColumnCenter } from "../../styles";

const PostLayout = styled.div`
  display: flex;
`;

const LayoutLeft = styled.div`
  padding-right: 16px;
`;

const LayoutRight = styled.div``;

const VoteBtn = styled.div`
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-bottom: 16px solid rgb(186, 191, 196);
  transform: rotate(${({ rotate }) => rotate});
  cursor: pointer;
  margin: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VoteContainer = styled.div`
  ${flexColumnCenter}
`;

const VoteCount = styled.div`
  color: hsl(210deg 8% 45%);
  font-size: 1.61538462rem;
`;

const PostBody = styled.p`
  font-size: 15px;
`;

export {
  PostLayout,
  LayoutLeft,
  LayoutRight,
  VoteBtn,
  VoteContainer,
  VoteCount,
  PostBody,
};
