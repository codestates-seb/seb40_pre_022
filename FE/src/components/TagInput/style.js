import styled, { css } from "styled-components";

export const HashTagContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 6px;
  border: 1px solid rgb(186, 191, 196);
  border-radius: 3px;

  input {
    width: 100%;
    height: 35px;
    padding: 8px 10px;
    border: none;

    &::placeholder {
      color: rgb(133, 133, 133);
    }

    &:focus {
      outline: none;
    }
  }
`;

export const HashTags = styled.div`
  display: flex;
  padding-left: 2px;
`;
