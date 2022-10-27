import styled from "styled-components"


const TitleInput = styled.input`
    padding: 8px 10px;
    margin-bottom: 10px;
    width: 100%;
    height: 35px;
    border: 1px solid rgb(186, 191, 196);
    border-radius: 3px;
`;

const TagInput = styled.input`
    width: 100%;
    height: 35px;
    padding: 8px 10px;
`;

const AskQuestionBtn = styled.button`
  background-color: hsl(206deg 100% 52%);
  color: hsl(0deg 0% 100%);
`;



export { TitleInput, TagInput };