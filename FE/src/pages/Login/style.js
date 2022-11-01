import styled from "styled-components";
import { flexCenter } from "../../styles/index";

export const Wrapper = styled.div`
  ${flexCenter}
  flex-direction: column;
  min-width: 280px;
  margin: 0 auto;
  .logo span {
    display: block;
    width: 28px;
    height: 30px;
    background-image: url(/sprites.svg);
    background-size: auto;
    background-position-y: bottom;
    font-size: 0;
    text-indent: -9999px;
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
  button {
    width: 100%;
  }
`;

export const Info = styled.ul`
  margin-top: 50px;
  font-size: 0.8rem;
  text-align: center;
  li {
    margin-bottom: 15px;
    a {
      font-weight: 700;
      color: var(--darkblue);
    }
  }
`;
