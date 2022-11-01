import React from "react";
import { Button } from "../../components/Button";
import Layout from "../../components/Layout";
import ContentEditor from "../../components/ContentEditor";
import ContentViewer from "../../components/ContentViewer";
import EditSidebar from "../../components/EditSidebar";
import {
  EditBox,
  EditContainer,
  EditTitleText,
  EditInput,
  BtnBox,
} from "./style";

const QuestionEdit = () => {
  return (
    <Layout>
      <EditContainer>
        <EditBox>
          <EditTitleText>Title</EditTitleText>
          <EditInput placeholder='e.g. Is there an R function for finding the index of an element in a vector?'></EditInput>
          <EditTitleText>Body</EditTitleText>
          <ContentEditor></ContentEditor>
          <ContentViewer></ContentViewer>
          <EditTitleText>Edit Summary</EditTitleText>
          <EditInput placeholder='briefly explain your changes (corrected spelling, fixed grammar, improved formatting)'></EditInput>
          <BtnBox>
            <Button label='Save edits'></Button>
            <Button label='Cancel'></Button>
          </BtnBox>
        </EditBox>
        <EditSidebar></EditSidebar>
      </EditContainer>
    </Layout>
  );
};

export default QuestionEdit;
