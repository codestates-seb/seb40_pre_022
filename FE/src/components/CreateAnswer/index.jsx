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
import AnswerEditData from "../../store/AnswerEditData";
import { useRecoilValue } from "recoil";
import { createAnswer } from "../../api/details";
import { useMutation } from "@tanstack/react-query";

const CreateAnswer = ({ questionId }) => {
  const answer = useRecoilValue(AnswerEditData);
  console.log(answer);
  const { mutate, isLoading, isError, data, error } = useMutation(
    () => {
      createAnswer(questionId);
    },
    {
      retry: 0,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error.message);
      },
    },
  );

  const clickHandle = () => {
    if (answer.length <= 0) return;
    mutate({
      body: answer,
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
        <Link to='/questions/ask' className='link'>
          ask your own question.
        </Link>
      </AnswerText>
    </AnswerContainer>
  );
};

export default CreateAnswer;
