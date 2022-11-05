import styled from "styled-components";
import { flexCenter, flexRowBetween } from "../../styles/index";

export const MainbarContainer = styled.div`
  display: inline-block;
  flex: 3;
  padding-top: 24px;
`;

export const SearchBox = styled.div`
  position: relative;
  width: 180px;
  ${flexCenter}
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
  }
`;

export const BtnList = styled.div`
  display: flex;
  button.Linkbutton {
    border-radius: 0;
    margin-left: -1px;
    :first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    :last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
`;

export const Hearder = styled.div`
  ${flexRowBetween}
`;
