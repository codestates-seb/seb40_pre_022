import styled, { css } from "styled-components";

export const Container = styled.div`
  /* margin-bottom: 30px; */
`;

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
      color: var(--black-300);
    }

    &:focus {
      outline: none;
    }
  }
`;

export const SLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
`;

export const HashTags = styled.div`
  display: flex;
  padding-left: 2px;
`;
