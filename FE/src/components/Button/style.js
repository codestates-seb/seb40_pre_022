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

  &.secondary {
    background-color: hsl(206deg 100% 52%);
    color: hsl(0deg 0% 100%);
    box-shadow: inset 0 1px 0 0 hsl(0deg 0% 100% / 40%);
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

  &.Linkbutton {
    display: flex;
    justify-content: center;
    align-items: center;
    border-color: hsl(210, 8%, 65%);
    text-decoration: none;
    background-color: white;
    border-style: solid;
    border-width: 0.5px;
    color: hsl(210, 8%, 45%);
    font-size: 12px;
    position: relative;
    border-radius: 3px;
    padding: 0.8em;
    font-family: inherit;
    text-align: center;
    font-weight: normal;
    outline: none;
    user-select: none;
    line-height: calc(15 / 13);
    margin: 2 2 2 0;
    white-space: nowrap;
  }

  &.Middle {
    border-radius: 0px;
  }

  &.Left {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &.Right {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &.Choosed {
    background-color: hsl(210, 8%, 90%);
    color: hsl(210, 8%, 25%);
    border-color: hsl(210, 8%, 55%);
  }

  &.Tagged {
    color: hsl(205, 47%, 42%);
    background-color: hsl(205, 46%, 92%);
    border-color: transparent;
    padding: 0.4em 0.5em;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    margin: 2 2 2 0;
    &:hover {
      background-color: hsl(205deg 53% 88%);
      color: hsl(206deg 100% 52%);
    }
  }
`;

export default Btn;
