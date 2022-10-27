import React from "react";
import Leftsidebar from "../Leftsidebar";
import { PageContainer, PostContainer } from "./style";
import QuestionHeader from "./DetailHeader";

const QuestionsDetail = () => {
  return (
    <>
      <PageContainer>
        <Leftsidebar />
        <PostContainer>
          <QuestionHeader />
        </PostContainer>
      </PageContainer>
    </>
  );
};

export default QuestionsDetail;
