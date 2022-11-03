import React from "react";
import { LeftPostContainer, PageContainer, PostContainer } from "./style";
import DetailPost from "../../components/DetailPost";
import DetailHeader from "../../components/DetailHeader";
import Layout from "../../components/Layout";
import CreateAnswer from "../../components/CreateAnswer";
import DetailAnswer from "../../components/DetailAnswer";
import AQRightsidebar from "../../components/AQsidebar";

const QuestionsDetail = () => {
  return (
    <>
      <Layout>
        <PostContainer>
          <LeftPostContainer>
            <DetailHeader />
            <DetailPost />
            <DetailAnswer />
            <CreateAnswer />
          </LeftPostContainer>
          <AQRightsidebar />
        </PostContainer>
      </Layout>
    </>
  );
};

export default QuestionsDetail;
