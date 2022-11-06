import React from "react";
import { useRecoilValue } from "recoil";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import CreatePost from "../../components/CreatePost/index";
import { Button } from "../../components/Button";
import Accordian from "../../components/Accordian";
import TagInput from "../../components/TagInput";
import Layout from "../../components/Layout/index";

import { AnswerEditData } from "../../store/AnswerEditData";
import { questionsPost } from "../../api/questions";
import { QuestionTitle, QuestionTags } from "../../store/QuestionPost";

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

const QuestionAsk = () => {
  const titleText = useRecoilValue(QuestionTitle);
  const bodyText = useRecoilValue(AnswerEditData);
  const tagText = useRecoilValue(QuestionTags);

  // const [isPost, setIsPost] = useRecoilState(postState);

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

  // const { mutate } = useMutation(userJoin, {
  //   retry: 0,
  //   onSuccess: () => {
  //     alert('회원가입이 완료되었습니다.');
  //     navigate('/members/login');
  //   },
  // });

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
      questionTags: tagArr,
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
