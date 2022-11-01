import styled, { css } from "styled-components";
import { container } from "../../styles";
import { flexCenter } from "../../styles/index";

const triangle = css`
  display: block;
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 0px;
  height: 0px;
  border-top: 10px solid none;
  border-bottom: 10px solid #ddd;
  border-right: 10px solid transparent;
  border-left: 10px solid transparent;
`;

const tooltipBox = css`
  position: absolute;
  top: 42px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 480px;
  min-width: 480px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 3px hsla(0, 0%, 0%, 0.06), 0 2px 6px hsla(0, 0%, 0%, 0.06),
    0 3px 8px hsla(0, 0%, 0%, 0.09);
  background: #fff;
  border-radius: 5px;
  padding: 10px 5px;
`;

export const Wrapper = styled.header`
  height: 50px;
  border-top: 3px solid var(--orange);
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  ${flexCenter}
`;

export const Container = styled.div`
  ${container};
  padding: 0 10px;
  .menu {
    ${flexCenter}
    padding: 0 6px;
    margin-right: 15px;
    display: none;
    @media ${(props) => props.theme.mobile} {
      display: flex;
    }
  }
  .logo {
    ${flexCenter}
  }
  .logo span {
    display: block;
    width: 150px;
    height: 30px;
    background-image: url(../../../public/sprites.svg);
    background-size: cover;
    background-position-y: -7px;
    font-size: 0;
    text-indent: -9999px;
    @media ${(props) => props.theme.mobile} {
      width: 28px;
      background-size: auto;
      background-position-y: bottom;
    }
  }
  .profile {
    ${flexCenter}
    span {
      margin: 3px 0 0 5px;
      font-size: 0.8rem;
      font-weight: 900;
      @media ${(props) => props.theme.mobile} {
        display: none;
      }
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
`;

export const ProductsBox = styled.div`
  position: relative;
  margin-left: 10px;
  z-index: 1;
  ${flexCenter}
  button.Linkbutton {
    min-width: 80px;
    background: transparent;
    border: 0px solid transparent;
    height: 33px;
    font-size: 0.85rem;
    line-height: normal;
    border-radius: 50px;
    @media ${(props) => props.theme.mobile} {
      min-width: 60px;
      height: 28px;
      font-size: 0.75rem;
    }
    :hover {
      background: #eee;
      color: #000;
    }
    &.active {
      background-color: var(--orange);
      color: #fff;
    }
  }
`;
export const ProductsDropBox = styled.ul`
  ${tooltipBox}
  max-width: 312px;
  min-width: 180px;
  ::after {
    ${triangle}
    top: -8px;
    border-bottom: 10px solid #fff;
  }
  ::before {
    ${triangle}
    top: -9px;
  }
  li {
    padding: 5px;
    margin: 10px 0;
    cursor: pointer;
    :first-child {
      margin-top: 0;
    }
    :hover {
      background: #ddd;
      border-radius: 5px;
    }
    span {
      display: block;
      font-size: 0.85rem;
      &:last-child {
        font-size: 0.75rem;
        color: var(--gray);
      }
    }
    &:last-child {
      padding: 10px 10px 0 10px;
      margin: 0 -5px;
      border-top: 1px solid #dddd;
      :hover {
        background-color: transparent;
      }
      a {
        display: inline-block;
        font-size: 0.85rem;
        :hover {
          color: #000;
        }
      }
      span {
        margin: 0;
      }
    }
  }
`;

export const SearchBox = styled.div`
  position: relative;
  margin-left: 5px;
  flex-grow: 1;
  ${flexCenter}
  @media ${(props) => props.theme.mobile} {
    width: 100%;
    margin-left: 0;
    position: absolute;
    top: 50px;
    left: 0;
    padding: 10px;
    background-color: #ddd;
  }
`;
export const SearchInnerBox = styled.div`
  position: relative;
  width: 100%;
  .icon {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: var(--gray);
  }
  input {
    width: 100%;
    height: 33px;
    border: 1px solid var(--lightgray);
    border-radius: 5px;
    padding-left: 33px;
    :focus {
      outline: none;
      border-color: hsl(206, 90%, 69.5%);
    }
    :focus + ul {
      display: grid;
      @media ${(props) => props.theme.mobile} {
        display: flex;
      }
    }
  }
`;
export const SearchDropBox = styled.ul`
  ${tooltipBox}
  display: none;
  grid-template-columns: repeat(auto-fill, minmax(50%, auto));
  @media ${(props) => props.theme.mobile} {
    top: 45px;
    flex-direction: column;
  }
  ::after {
    ${triangle}
    top: -8px;
    border-bottom: 10px solid #fff;
  }
  ::before {
    ${triangle}
    top: -9px;
  }
  li {
    padding: 7px 5px;
    font-size: 0.85rem;
    span:last-child {
      margin-left: 5px;
      color: var(--gray);
    }
    :last-child {
      margin: 0 -5px;
      padding: 10px 10px 0;
      border-top: 1px solid #ddd;
      grid-column: auto / span 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      button {
        height: 28px;
        border: 1px solid var(--darkblue);
        background: var(--lightblue);
        color: var(--darkblue);
        font-size: 0.7rem;
        :hover {
          background-color: hsl(205, 71%, 81%);
          color: hsl(205, 46%, 32%);
        }
      }
      a {
        font-size: 0.7rem;
        font-weight: 700;
        color: var(--darkblue);
      }
    }
  }
`;

export const IconUl = styled.ul`
  ${flexCenter}
  color:hsl(210,8%,35%);
  @media ${(props) => props.theme.mobile} {
    flex-grow: 1;
    justify-content: flex-end;
  }
  li {
    font-size: 1.1rem;
    padding: 14px 10px;
    &:nth-child(2),
    &:nth-child(4) {
      font-size: 1rem;
    }
    :first-child {
      display: none;
      @media ${(props) => props.theme.mobile} {
        display: block;
      }
    }
    :hover {
      background-color: hsl(210, 8%, 90%);
      cursor: pointer;
    }
  }
`;
