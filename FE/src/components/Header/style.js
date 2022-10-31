import styled, { css } from "styled-components";
import { container } from "../../styles";

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
    0 2px 8px hsla(0, 0%, 0%, 0.05); ;
`;

export const Container = styled.div`
  ${container};
  .logo span {
    display: block;
    width: 150px;
    height: 30px;
    background-image: url(../../../public/sprites.svg);
    background-size: cover;
    background-position-y: -7px;
    font-size: 0;
    text-indent: -9999px;
  }
`;

export const ProductsBox = styled.div`
  position: relative;
`;
export const ProductsDropBox = styled.ul`
  ${tooltipBox}
  max-width: 312px;
  min-width: 180px;
  ::after {
    ${triangle}
    top: -9px;
    border-bottom: 10px solid #fff;
  }
  ::before {
    ${triangle}
    top: -11px;
  }
  li {
    padding: 5px;
    :hover {
      background: #ddd;
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
`;
export const SearchInnerBox = styled.div``;
export const SearchDropBox = styled.ul`
  ${tooltipBox}
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50%, auto));
  ::after {
    ${triangle}
    top: -9px;
    border-bottom: 10px solid #fff;
  }
  ::before {
    ${triangle}
    top: -11px;
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
      padding: 7px 10px 0;
      border-top: 1px solid #ddd;
      grid-column: auto / span 2;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;
