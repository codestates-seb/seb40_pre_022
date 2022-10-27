import styled, { css } from "styled-components";

const Btn = styled.button`
  height: 37.8px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8em;
  border-radius: 3px;
  border: none;
  cursor: pointer;

  &.primary {
    color: white;
    background-color: #1ea7fd;
  }
  &.secondary {
    background-color: hsl(206deg 100% 52%);
    color: hsl(0deg 0% 100%);
    &:hover {
      background-color: hsl(209deg 100% 38%);
    }
  }
  &.small {
    font-size: 12px;
  }
  &.medium {
    font-size: 14px;
  }
  &.large {
    font-size: 16px;
  }

  &.header-size {
    font-size: 0.82em;
  }
`;

export default Btn;
