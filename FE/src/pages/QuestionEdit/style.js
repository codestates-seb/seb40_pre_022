import styled from "styled-components";
import { Button } from "@components/Button";

const EditContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  gap: 30px;
  padding: 24px;
  border-left: 1px solid rgb(227, 230, 232);
  color: rgb(12, 13, 14);
  font-size: 15px;
`;

const EditBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 728px;
  margin: 0;
  padding: 0;
  column-gap: 20px;
  background-color: White;
  float: left;
`;

const EditTitleText = styled.div`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
`;

const EditInput = styled.input`
  padding: 8px 10px;
  width: 100%;
  height: 35px;
  border: 1px solid rgb(186, 191, 196);
  border-radius: 3px;
  color: #0c0d0e;
  margin-bottom: 30px;
`;

const TagsContainer = styled.div`
  margin-bottom: 30px;
`;

const TagTitle = styled.div`
  display: block;
  margin-top: 30px;
  font-weight: 600;
`;

const BtnBox = styled.div`
  display: flex;
  gap: 5px;
  button:last-child {
    color: hsl(206deg 100% 52%);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      background-color: hsl(206deg 93% 84%);
    }
  }
`;

export {
  EditContainer,
  EditBox,
  EditTitleText,
  EditInput,
  TagsContainer,
  TagTitle,
  BtnBox,
};
