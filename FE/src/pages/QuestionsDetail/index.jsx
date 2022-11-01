import React from "react";
import { PostContainer } from "./style";
import DetailPost from "../../components/DetailPost";
import DetailHeader from "../../components/DetailHeader";
import Layout from "../../components/Layout";
import CreateAnswer from "../../components/CreateAnswer";
import DetailAnswer from "../../components/DetailAnswer";

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
      </Layout>
    </>
  );
};

export default QuestionsDetail;
