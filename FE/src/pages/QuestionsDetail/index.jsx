import React from "react";
import Leftsidebar from "../../components/Leftsidebar";
import { PageContainer, PostContainer } from "./style";
import DetailPost from "../../components/DetailPost";
import DetailHeader from "../../components/DetailHeader";

const QuestionsDetail = () => {
  return (
    <>
      <PageContainer>
        <Leftsidebar />
        <PostContainer>
          <DetailHeader />
          <DetailPost />
        </PostContainer>
      </PageContainer>
    </>
  );
};

export default QuestionsDetail;
