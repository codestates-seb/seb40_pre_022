import styled from "styled-components";
import { flexCenter } from "../../styles/index";

export const Wrapper = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 280px;
  margin: 200px auto;
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
  p {
    margin-bottom: 20px;
    line-height: normal;
    font-size: 0.85rem;
  }
  button {
    width: 100%;
  }
`;
