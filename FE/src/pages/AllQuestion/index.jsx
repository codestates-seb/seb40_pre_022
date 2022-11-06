import React from "react";
import { PostContainer, PageContainer } from "./style";
import AQRightsidebar from "../../components/AQsidebar";
import AQMainbar from "../../components/AQmainbar";
import Layout from "../../components/Layout";

const AllQuestion = () => {
  return (
    <>
      <Layout>
        <PageContainer>
          <PostContainer>
            <AQMainbar />
            <AQRightsidebar />
          </PostContainer>
        </PageContainer>
      </Layout>
    </>
  );
};

export default AllQuestion;
