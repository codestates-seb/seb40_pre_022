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
import { useRecoilValue } from "recoil";
import { createAnswer } from "../../api/details";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const CreateAnswer = ({ questionId }) => {
  const answer = useRecoilValue(AnswerEditData);
  const [isSubmit, setIsSubmit] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(createAnswer, {
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 403") {
        alert("권한이 없습니다. 로그인 후 다시 시도해 주세요.");
      }
    },
  });

  const clickHandle = () => {
    if (answer.length <= 0) return;
    setIsSubmit(true);
    mutate({
      id: questionId,
      body: answer,
    });
  };

  return (
    <AnswerContainer>
      <AnswerMainTitle>Your Answer</AnswerMainTitle>
      <AnswerForm>
        <ContentEditor isSubmit={isSubmit} setIsSubmit={setIsSubmit} />
        <BtnContainer>
          <Button
            label="Post Your Answer"
            size="header-size"
            onClick={clickHandle}
          />
        </BtnContainer>
      </AnswerForm>
      <AnswerText>
        Browse other questions tagged
        <TagWrapper>
          <Button label="javascript" Tagged="Tagged" />
        </TagWrapper>
        <TagWrapper>
          <Button label="reactjs" Tagged="Tagged" />
        </TagWrapper>
        <TagWrapper>
          <Button label="css" Tagged="Tagged" />
        </TagWrapper>
        <Link to="/questions/ask" className="link">
          ask your own question.
        </Link>
      </AnswerText>
    </AnswerContainer>
  );
};

export default CreateAnswer;
