import React from "react";
import ContentEditor from "../ContentEditor";
import ContentsViewer from "../ContentViewer";
import {
  TitleInput,
  TitleInputText,
  AskQuestionBox,
  QuestionContainer,
} from "./style";

function CreatePost() {
  return (
    <>
      <AskQuestionBox>
        <QuestionContainer>
          <TitleInputText>Title</TitleInputText>
          <TitleInputText className='text'>
            Be specific and imagine you’re asking a question to another person
          </TitleInputText>
          <TitleInput placeholder='e.g. Is there an R function for finding the index of an element in a vector?' />
          <TitleInputText>Body</TitleInputText>
          <TitleInputText className='text'>
            Include all the information someone would need to answer your
            question
          </TitleInputText>
          <ContentEditor></ContentEditor>
          <ContentsViewer></ContentsViewer>
          <TitleInputText>Tags</TitleInputText>
          <TitleInputText>
            Add up to 5 tags to describe what your question is about
          </TitleInputText>
        </QuestionContainer>
      </AskQuestionBox>
    </>
  );
}

export default CreatePost;
