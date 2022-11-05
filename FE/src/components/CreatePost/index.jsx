import React from "react";
import ContentEditor from "../ContentEditor";
import { TitleInput, AskInputText, QuestionContainer } from "./style";

function CreatePost() {
  const [title, setTitle] = useState("");

  const handleTitleChange = useCallback(
    (e) => {
      setTitle(e.target.value);
    },
    [title],
  );

  return (
    <>
      <QuestionContainer>
        <AskInputText>Title</AskInputText>
        <AskInputText className='text'>
          Be specific and imagine you’re asking a question to another person
        </AskInputText>
        <TitleInput
          label='Title'
          id='title'
          value={title.value}
          onChange={(e) => handleTitleChange(e)}
          placeholder='e.g. Is there an R function for finding the index of an element in a vector?'
        />
        <AskInputText>Body</AskInputText>
        <AskInputText className='text'>
          Include all the information someone would need to answer your question
        </AskInputText>
        <ContentEditor />
      </QuestionContainer>
    </>
  );
}

export default CreatePost;
