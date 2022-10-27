import React from "react";
import Leftsidebar from "../../components/Leftsidebar";
import { PageContainer, PostContainer } from "./style";
import QuestionHeader from "../../components/DetailHeader";

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
