import { React, useState, useCallback } from "react";
import { useRecoilState } from 'recoil';

import { Button } from "../../components/Button";
import Layout from "../../components/Layout";
import ContentEditor from "../../components/ContentEditor";
import EditSidebar from "../../components/EditSidebar";
import TagInput from "../../components/TagInput";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { questionsData, questionsEdit } from "../../api/questions";
import { AnswerEditData } from '../../store/AnswerEditData';


import {
  EditBox,
  EditContainer,
  EditTitleText,
  EditInput,
  TagsContainer,
  BtnBox,
  TagTitle,
} from "./style";
import { QuestionTags } from "../../store/QuestionPost";

const QuestionEdit = () => {
  const [title, setTitle] = useState('');
  const [bodyText, setBodyText] = useRecoilState(AnswerEditData);
  const [tagText, setTagText] = useRecoilState(QuestionTags);

  const { isLoading, data } = useQuery(["detailQ"], () => {
    return questionsData(data.questionId);
  });


console.log('title', title)

  const navigate = useNavigate();


  if (isLoading) return <div>now loading..</div>;

  const { mutate } = useMutation(questionsEdit, {
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

  const handleTitleChange = useCallback((e) => {
    console.log('1!', e.target.value)
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

  console.log(data.questionTags , tagText)

  if(data){
    return (
      <Layout>
        <EditContainer>
          <EditBox>
            <EditTitleText>Title</EditTitleText>
            <EditInput
              label="Title"
              // defaultValue={data.title}
              value={title ||data.title}
              onChange={(e) => handleTitleChange(e)}
              placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            ></EditInput>
            <EditTitleText>Body</EditTitleText>
            <ContentEditor bodyData={data.body || body} />
            <TagsContainer>
              <TagTitle>Tags</TagTitle>
              <TagInput gotTag={data.questionTags || tagText} />
            </TagsContainer>
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
    )
 }
};

export default QuestionEdit;
