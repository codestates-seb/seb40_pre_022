import React from "react";

import Layout from "@components/Layout";
import Header from "./components/Header";
import QuestionsList from "./components/QuestionsList";
import AQRightsidebar from "../../components/AQsidebar";

import { Container } from "./style";

const Home = () => {
  return (
    <Layout>
      <Container>
        <Header />
        <QuestionsList />
      </Container>
      <AQRightsidebar />
    </Layout>
  )
};

export default Home;
