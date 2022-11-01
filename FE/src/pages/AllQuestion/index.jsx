import React from "react";
import { PostContainer, PageContainer } from "./style";
import AQRightsidebar from "../../components/AQsidebar";
import AQMainbar from "../../components/AQmainbar";
import GlobalStyle from "../../styles/globalStyle";
import Layout from "../../components/Layout";

const AllQuestion = () => {
  return (
    <>
      <GlobalStyle />
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
