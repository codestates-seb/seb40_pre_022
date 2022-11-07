import React, { useState, useEffect } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
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
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useRecoilState(AnswerEditData);
  const [tagText, setTagText] = useRecoilState(QuestionTags);

  const tagArr = tagText.map((tag) => {
    return {
      questionTagName: tag,
    };
  })

  const navigate = useNavigate();

  const { mutate } = useMutation(questionsPost, {
    retry: 0,
    onSuccess: (data) => {
      const postid = data.data.data.questionId;
      navigate(`/questions/${postid}`);
    },
  });

  // useEffect(()=>{
  //   if(auth){
  //     location.reload();
  //   }
  // },[])

  const handleAskSubmit = (e) => {
    e.preventDefault();
    mutate({
      title: title,
      body: bodyText,
      questionTags: tagArr,
    });
  };

  return (
    <Layout background isLeftSidebar={false}>
      <AskContainer>
        <AskTitleHeader>
          <AskTitleH1>Ask a public question</AskTitleH1>
        </AskTitleHeader>
        <AskBox>
          <AskForm>
            <AskWrapper>
              <CreatePost title={title} setTitle={setTitle}/>
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
