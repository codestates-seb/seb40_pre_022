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

  &.Normalbutton {
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
    border-left: none;
  }

  &.Left {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &.Right {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: none;
  }

  &.Choosed {
    background-color: hsl(210, 8%, 90%);
    color: hsl(210, 8%, 25%);
    border-color: hsl(210, 8%, 55%);
  }

  &.Tagged {
    height: 24px;
    color: hsl(205, 47%, 42%);
    background-color: hsl(205, 46%, 92%);
    border-color: transparent;
    padding: 0.4em 0.5em;
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    margin: 0px 3px 0px 0px;
    &:hover {
      background-color: hsl(205deg 53% 88%);
      color: hsl(206deg 100% 52%);
    }
  }

  &.Mypagebutton {
    height: 31px;
    font-size: 13px;
    align-items: center;
    padding: 6px 12px;
    position: relative;
    cursor: pointer;
    border-radius: 1000px;
    margin: 2px;
    white-space: nowrap;
    color: hsl(210, 8%, 35%);
    background-color: white;
    &:hover {
      background-color: hsl(210, 10%, 85%);
    }

    &.Selected {
      color: white;
      background-color: hsl(27, 90%, 55%);
      &:hover {
        background-color: hsl(18, 65%, 55%);
      }
    }
  }

  &.Pagingbutton {
    margin-right: 4px;
    height: 25px;
    padding: 0px 8px;
    border: 1px solid hsl(210, 8%, 85%);
    border-radius: 3px;
    font-size: 13px;
    line-height: 25/13;
    cursor: pointer;
    background-color: transparent;
    color: hsl(210, 8%, 25%);

    &.Selected {
      border-color: transparent;
      background-color: hsl(27, 90%, 55%);
      color: white;
    }
  }
`;

export default Btn;
