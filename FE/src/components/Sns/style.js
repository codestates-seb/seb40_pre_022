import styled from "styled-components";
import { flexCenter } from "../../styles/index";

export const Wrapper = styled.div`
  width: 100%;
  margin: 15px 0;
`;

export const Button = styled.button`
  width: 100%;
  height: 38px;
  border-radius: 3px;
  border: 0 none;
  margin: 8px 0;
  cursor: pointer;
  ${flexCenter}
  .icon {
    font-size: 1.05rem;
    margin-right: 3px;
  }
  :nth-child(1) {
    border: 1px solid var(--lightgray);
    background: #fff;
  }
  :nth-child(2) {
    background: rgb(47, 51, 55);
    color: #fff;
  }
  :nth-child(3) {
    background: rgb(56, 84, 153);
    color: #fff;
  }
`;
