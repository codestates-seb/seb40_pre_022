import { React } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import {
  AnswerContainer,
  AnswerForm,
  AnswerMainTitle,
  BtnContainer,
  AnswerText,
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
        Browse other questions tagged tag1 tag2 tag3 or
        <Link to='/question/ask' className='link'>
          {" " + "ask your own question."}
        </Link>
      </AnswerText>
    </AnswerContainer>
  );
};

export default CreateAnswer;
