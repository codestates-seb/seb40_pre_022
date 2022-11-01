import styled from "styled-components";
import { flexCenter } from "../../styles/index";

export const Wrapper = styled.div`
  ${flexCenter}
  flex-direction: column;
  min-width: 260px;
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
  border-radius: 5px;
  background: #fff;
  border: 1px solid var(--lightgray);
`;
