import React, { useState, useEffect, useCallback } from "react";
import { useRecoilValue } from "recoil";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import CreatePost from "../../components/CreatePost/index";
import { Button } from "../../components/Button";
import Accordian from "../../components/Accordian";
import TagInput from "../../components/TagInput";
import { AnswerEditData } from "../../store/AnswerEditData";

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
// import Modal from "../../components/Modal";
import { questionPost } from "../../api/question/questionPostApi";
import { QuestionTitle } from "../../store/QuestionPostTitle";
import Layout from "../../components/Layout/index";

const QuestionAsk = () => {
  const titleText = useRecoilValue(QuestionTitle);
  const bodyText = useRecoilValue(AnswerEditData);
  // const [isPost, setIsPost] = useRecoilState(postState);

  const navigate = useNavigate();

  const { mutate, data } = useMutation(questionPost, {
    retry: 0,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  // useEffect(() => {
  //   if (isPost) {
  //     navigate("/question/detail/:id");
  //   }
  // }, [isPost]);

  // const [modalOpen, setModalOpen] = useState(false);

  // const openModal = () => {
  //   setModalOpen(true);
  // };
  // const closeModal = () => {
  //   setModalOpen(false);
  // };

  const handleAskSubmit = (e) => {
    e.preventDefault();
    mutate({
      title: titleText,
      body: bodyText,
      questionTags: tags,
    });
  };

  return (
    <Layout isLeftSidebar={false}>
      <AskContainer>
        <AskTitleHeader>
          <AskTitleH1>Ask a public question</AskTitleH1>
        </AskTitleHeader>
        {/* <button onClick={openModal}>모달팝업</button>
        <Modal open={modalOpen} close={closeModal} header='Modal heading'>
          모두 화이팅
        </Modal> */}
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
                label='Review your question'
                onClick={handleAskSubmit}></Button>
            </BtnBox>
          </AskForm>
          <Accordian />
        </AskBox>
      </AskContainer>
    </Layout>
  );
};

export default QuestionAsk;
