import { React } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import {
  AnswerContainer,
  AnswerForm,
  AnswerMainTitle,
  BtnContainer,
  AnswerText,
  TagWrapper,
} from "./style";
import ContentEditor from "../ContentEditor";

const CreateAnswer = () => {
  return (
    <AnswerContainer>
      <AnswerMainTitle>Your Answer</AnswerMainTitle>
      <AnswerForm>
        <ContentEditor />
        <BtnContainer>
          <Button label='Post Your Answer' size='header-size' />
        </BtnContainer>
      </AnswerForm>
      <AnswerText>
        Browse other questions tagged
        <TagWrapper>
          <Button label='javascript' Tagged='Tagged' />
        </TagWrapper>
        <TagWrapper>
          <Button label='reactjs' Tagged='Tagged' />
        </TagWrapper>
        <TagWrapper>
          <Button label='css' Tagged='Tagged' />
        </TagWrapper>
        <Link to='/question/ask' className='link'>
          ask your own question.
        </Link>
      </AnswerText>
    </AnswerContainer>
  );
};

export default CreateAnswer;
