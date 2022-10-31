import React from "react";
import CreatePost from "../../components/CreatePost/index";
import { Button } from "../../components/Button";
import Layout from "../../components/Layout";
import { AskTitleHeader, AskTitleH1, AskBox, AskContainer } from "./style";
import Accordian from "../../components/Accordian";

const QuestionAsk = () => {
  return (
    <Layout>
      <AskContainer>
        <AskTitleHeader>
          <AskTitleH1>Ask a public question</AskTitleH1>
        </AskTitleHeader>
        <AskBox>
          <CreatePost></CreatePost>
          <Accordian></Accordian>
        </AskBox>
        <Button label='Review your question'></Button>
      </AskContainer>
    </Layout>
  );
};

export default QuestionAsk;
