import React, { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import CreatePost from "../../components/CreatePost/index";
import { Button } from "../../components/Button";
import Accordian from "../../components/Accordian";
import TagInput from "../../components/TagInput";
import Layout from "../../components/Layout/index";

import { QuestionTitle, QuestionTags } from "../../store/QuestionPost";
import { AnswerEditData } from "../../store/AnswerEditData";
import { questionsPost } from "../../api/questions";

import {
  AskForm,
  AskTitleHeader,
  AskTitleH1,
  AskBox,
  AskContainer,
  TagsContainer,
  AskWrapper,
  TagTitle,
  TagsText,
  BtnBox,
} from "./style";

const QuestionAsk = () => {
  const titleText = useRecoilValue(QuestionTitle);
  const bodyText = useRecoilValue(AnswerEditData);
  const tagText = useRecoilValue(QuestionTags);

  const navigate = useNavigate();

  const tagArr = tagText.map((tag) => {
    return {
      questionTagName: tag,
    };
  });

  const { mutate, data } = useMutation(questionsPost, {
    retry: 0,
    onSuccess: (data) => {
      const postid = data.data.data.questionId;
      navigate(`/questions/${postid}`);
    },
  });

  const handleAskSubmit = (e) => {
    e.preventDefault();
    mutate({
      title: titleText,
      body: bodyText,
      questionTags: tagArr,
    });
  };

  return (
    <Layout isLeftSidebar={false}>
      <AskContainer>
        <AskTitleHeader>
          <AskTitleH1>Ask a public question</AskTitleH1>
        </AskTitleHeader>
        <AskBox>
          <AskForm>
            <AskWrapper>
              <CreatePost />
              <TagsContainer>
                <TagTitle>Tags</TagTitle>
                <TagsText>
                  Add up to 5 tags to describe what your question is about
                </TagsText>
                <TagInput />
              </TagsContainer>
            </AskWrapper>
            <BtnBox>
              <Button
                label="Review your question"
                onClick={handleAskSubmit}
              ></Button>
            </BtnBox>
          </AskForm>
          <Accordian />
        </AskBox>
      </AskContainer>
    </Layout>
  );
};

export default QuestionAsk;
