import React from "react";
import Leftsidebar from "../../components/Leftsidebar";
import { PageContainer, PostContainer } from "./style";
import DetailPost from "../../components/DetailPost";
import DetailHeader from "../../components/DetailHeader";
import Layout from "../../components/Layout";

const QuestionsDetail = () => {
  return (
    <>
      <Layout>
        <PostContainer>
          <DetailHeader />
          <DetailPost />
        </PostContainer>
      </Layout>
    </>
  );
};

export default QuestionsDetail;
