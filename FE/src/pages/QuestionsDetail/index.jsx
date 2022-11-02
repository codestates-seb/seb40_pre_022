import React from "react";
import { PostContainer } from "./style";
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
          <DetailHeader />
          <DetailPost />
          <DetailAnswer />
          <CreateAnswer />
        </PostContainer>
        <AQRightsidebar />
      </Layout>
    </>
  );
};

export default QuestionsDetail;
