import React, { useState, useEffect, useCallback } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import CreatePost from "../../components/CreatePost/index";
import { Button } from "../../components/Button";
import Accordian from "../../components/Accordian";
import TagInput from "../../components/TagInput";
import { ENG_REGEX } from "../../constants/regex";

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
import { postState, QuestionPostData } from "../../store/QuestionPostData";
import Layout from "../../components/Layout/index";

const QuestionAsk = () => {
  const bodyText = useRecoilValue(AnswerEditData);
  const [tagInput, setTagInput] = useState("");
  const [tagArr, setTagArr] = useState(["react"]);

  const [isPost, setIsPost] = useRecoilState(postState);

  const navigate = useNavigate();

  const { mutate, data } = useMutation(questionPost, {
    retry: 0,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  useEffect(() => {
    if (isPost) {
      navigate("/question/detail/:id");
    }
  }, [isPost]);

  const handleAddTags = useCallback(
    (e) => {
      const target = e.target;
      if (
        e.key === "Enter" &&
        target.value.trim() !== "" &&
        !tagArr.includes(target.value)
      ) {
        setTagArr((prev) => [...prev, target.value]);
        setTagInput("");
      }
    },
    [tagArr],
  );

  const handleTagInputChange = (e) => {
    const { value } = e.target;
    if (ENG_REGEX.test(value)) {
      setTagInput(value);
    }
  };

  const handleDeleteTag = (name) => {
    const deletedTags = tagArr.filter((tag) => tag !== name);
    setTagArr(deletedTags);
  };

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
      title: title,
      body: bodyText,
      questionTags: [{ questionTagName: tagArr }],
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
              <CreatePost></CreatePost>
              <TagsContainer>
                <TagTitle>Tags</TagTitle>
                <TagsText>
                  Add up to 5 tags to describe what your question is about
                </TagsText>
                <TagInput
                  value={tagInput}
                  tagArr={tagArr.value}
                  placeholder='e.g. (angular sql-server string)'
                  onChange={(e) => handleTagInputChange(e)}
                  onKeyUp={(e) => handleAddTags(e)}
                  onClick={(e) => handleDeleteTag(e)}
                />
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
