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
import { AnswerEditData } from "../../store/AnswerEditData";
import { data } from "../../db/data.json";
import { useRecoilValue } from "recoil";

const CreateAnswer = () => {
  const answer = useRecoilValue(AnswerEditData);
  let time = new Date().toJSON();
  const clickHandle = () => {
    if (answer.length <= 0) return;
    data[0].answers.data.push({
      body: answer,
      author: { displayName: "answerer" },
      createdAt: time,
      updatedAt: time,
    });
  };

  return (
    <AnswerContainer>
      <AnswerMainTitle>Your Answer</AnswerMainTitle>
      <AnswerForm>
        <ContentEditor />
        <BtnContainer>
          <Button
            label='Post Your Answer'
            size='header-size'
            onClick={clickHandle}
          />
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
