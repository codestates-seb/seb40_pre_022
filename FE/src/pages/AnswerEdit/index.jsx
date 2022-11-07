import { React, useState, useCallback } from "react";
import { Button } from "../../components/Button";
import Layout from "../../components/Layout";
import ContentEditor from "../../components/ContentEditor";
import EditSidebar from "../../components/EditSidebar";
import TagInput from "../../components/TagInput";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useRecoilValue, useRecoilState } from "recoil";
import { questionsData, questionsEdit } from "../../api/questions";
import { QuestionTitle, QuestionTags } from "../../store/QuestionPost";
import { AnswerEditData } from "../../store/AnswerEditData";

import {
  EditBox,
  EditContainer,
  EditTitleText,
  EditInput,
  TagsContainer,
  BtnBox,
  TagTitle,
} from "../QuestionEdit/style";

const AnswerEdit = () => {
  const bodyText = useRecoilValue(AnswerEditData); // 에디터 컴포넌트에서 받아오기
  const tagText = useRecoilValue(QuestionTags); // 태그 컴포넌트에서 받아오기

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading, data } = useQuery(["detailQ"], () => {
    return questionsData(data.questionId);
  });

  if (isLoading) return <div>now loading..</div>;

  const { mutate, data1 } = useMutation(questionsEdit, {
    retry: 0,
    onSuccess: (data1) => {
      const postid = data1.data.data.questionId;
      navigate(`/questions/${postid}`);
    },
  });

  const tagArr = tagText.map((tag) => {
    return {
      questionTagName: tag,
    };
  });

  const [title, setTitle] = useRecoilState(QuestionTitle);
  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    mutate({
      questionId: data.questionId,
      title: title,
      body: bodyText,
      questionTags: tagArr,
    });
  };
  return (
    <Layout>
      <EditContainer>
        <EditBox>
          <EditTitleText>Body</EditTitleText>
          <ContentEditor bodyData={data.body} />
          <BtnBox>
            <Button label="Save edits" onClick={handleEditSubmit}></Button>
            <Link to={`/questions/${data.questionId}`}>
              <Button primary="Linkbutton" label="Cancel"></Button>
            </Link>
          </BtnBox>
        </EditBox>
        <EditSidebar></EditSidebar>
      </EditContainer>
    </Layout>
  );
};

export default AnswerEdit;
