import React from "react";
import ContentEditor from "../ContentEditor";
import { TitleInput, AskInputText, QuestionContainer } from "./style";

function CreatePost() {
  return (
    <>
      <QuestionContainer>
        <AskInputText>Title</AskInputText>
        <AskInputText className='text'>
          Be specific and imagine you’re asking a question to another person
        </AskInputText>
        <TitleInput placeholder='e.g. Is there an R function for finding the index of an element in a vector?' />
        <AskInputText>Body</AskInputText>
        <AskInputText className='text'>
          Include all the information someone would need to answer your question
        </AskInputText>
        <ContentEditor></ContentEditor>
      </QuestionContainer>
    </>
  );
}

export default CreatePost;
