import { React, useState, useCallback } from "react";
import { Button } from "../../components/Button";
import Layout from "../../components/Layout";
import ContentEditor from "../../components/ContentEditor";
import ContentViewer from "../../components/ContentViewer";
import EditSidebar from "../../components/EditSidebar";
import TagInput from "../../components/TagInput";
import { ENG_REGEX } from "../../constants/regex";
import {
  EditBox,
  EditContainer,
  EditTitleText,
  EditInput,
  TagsContainer,
  BtnBox,
  TagTitle,
} from "./style";

const QuestionEdit = () => {
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

  return (
    <Layout>
      <EditContainer>
        <EditBox>
          <EditTitleText>Title</EditTitleText>
          <EditInput placeholder='e.g. Is there an R function for finding the index of an element in a vector?'></EditInput>
          <EditTitleText>Body</EditTitleText>
          <ContentEditor></ContentEditor>
          <ContentViewer></ContentViewer>
          <TagsContainer>
            <TagTitle>Tags</TagTitle>
            <TagInput
              value={tagInput}
              tagArr={tagArr}
              placeholder='e.g. (angular sql-server string)'
              onChange={handleTagInputChange}
              onKeyUp={handleTagInputOnKeyUp}
              onClick={handleTagDelete}
            />
          </TagsContainer>
          <EditTitleText>Edit Summary</EditTitleText>
          <EditInput placeholder='briefly explain your changes (corrected spelling, fixed grammar, improved formatting)'></EditInput>
          <BtnBox>
            <Button label='Save edits'></Button>
            <Button primary='Linkbutton' label='Cancel'></Button>
          </BtnBox>
        </EditBox>
        <EditSidebar></EditSidebar>
      </EditContainer>
    </Layout>
  );
};

export default QuestionEdit;
