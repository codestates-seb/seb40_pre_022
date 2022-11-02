import styled from "styled-components";
import { flexRowCenter } from "../../styles/index";

export const Wrapper = styled.div`
  ${flexRowCenter}
  margin: 50px auto;
`;

export const InnerBox = styled.div`
  :first-child {
    width: 380px;
    @media ${(props) => props.theme.mobile} {
      display: none;
    }
  }
  :last-child {
    margin: 50px;
    max-width: 280px;
  }
`;

export const Title = styled.h3`
  font-size: 1.4rem;
  display: none;
  @media ${(props) => props.theme.mobile} {
    display: block;
    position: relative;
    width: 350px;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);
  }
`;

export const FormWrap = styled.div`
  width: 100%;
  padding: 24px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
  div:last-of-type {
    margin-bottom: 5px;
  }
  button {
    width: 100%;
  }
  p {
    position: inherit;
    margin-bottom: 10px;
    font-size: 0.8rem;
  }
`;

export const Info = styled.ul`
  margin-top: 50px;
  text-align: center;
  li {
    margin-bottom: 15px;
    font-size: 0.8rem;
    a {
      font-weight: 700;
      color: var(--darkblue);
    }
  }
`;
