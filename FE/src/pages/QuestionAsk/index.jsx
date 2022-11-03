import { React, useState, useCallback } from "react";
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
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Modal from "../../components/Modal";

const QuestionAsk = () => {
  const [tagInput, setTagInput] = useState("");
  const [tagArr, setTagArr] = useState(["javascript", "react"]);

  const handleTagInputOnKeyUp = useCallback(
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

  const handleTagDelete = (name) => {
    const deletedTags = tagArr.filter((tag) => tag !== name);
    setTagArr(deletedTags);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <AskContainer>
      <Header />
      <AskTitleHeader>
        <AskTitleH1>Ask a public question</AskTitleH1>
      </AskTitleHeader>
      <button onClick={openModal}>모달팝업</button>
      <Modal open={modalOpen} close={closeModal} header='Modal heading'>
        모두 화이팅
      </Modal>
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
                tagArr={tagArr}
                placeholder='e.g. (angular sql-server string)'
                onChange={handleTagInputChange}
                onKeyUp={handleTagInputOnKeyUp}
                onClick={handleTagDelete}
              />
            </TagsContainer>
          </AskWrapper>
          <BtnBox>
            <Button label='Review your question'></Button>
          </BtnBox>
        </AskForm>
        <Accordian />
      </AskBox>
      <Footer />
    </AskContainer>
  );
};

export default QuestionAsk;
