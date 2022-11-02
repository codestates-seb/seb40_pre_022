import styled from "styled-components";
import { flexColumnCenter } from "../../styles";

const ErrorContainer = styled.div`
  ${flexColumnCenter};
  width: 100vw;
  height: 100vh;
  background-color: #f1f2f3;
  padding: 24px;
`;

const ErrorItemContainer = styled.div`
  display: flex;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  .icon {
    color: hsl(200deg 3% 79%);
    width: 100%;
    height: 115px;
    position: absolute;
    top: -20px;
    @media ${(props) => props.theme.mobile} {
      top: -120px;
      height: 78px;
    }
  }
  flex: 1;
`;

const MessageContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;

  a {
    color: hsl(206deg 100% 40%);
    &:hover {
      color: hsl(206deg 100% 52%);
    }
  }
`;

const ErrorMessage = styled.div`
  margin-bottom: 15px;

  &.title {
    font-size: 2.07692308rem;
    margin-bottom: 4px;
    @media ${(props) => props.theme.mobile} {
      font-size: 2rem;
    }
  }
  &.subtitle {
    font-size: 1.4rem;
    margin-bottom: 19px;
    @media ${(props) => props.theme.mobile} {
      font-size: 1.2rem;
    }
  }
`;

export {
  ErrorContainer,
  MessageContainer,
  ImgContainer,
  ErrorItemContainer,
  ErrorMessage,
};
