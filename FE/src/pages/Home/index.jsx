import React from "react";

import Layout from "@components/Layout";
import AQMainbar from "../../components/AQmainbar";
import AQRightsidebar from "../../components/AQsidebar";

import { PageContainer, PostContainer } from "./style";

const Home = () => {
  return (
    <Layout>
      <PageContainer>
        <PostContainer>
          <AQMainbar />
          <AQRightsidebar />
        </PostContainer>
      </PageContainer>
    </Layout>
  );
};

export default Home;
