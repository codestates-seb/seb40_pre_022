import { React, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDetailQPost } from "../../api/details";
import { LeftPostContainer, PostContainer } from "./style";
import DetailPost from "../../components/DetailPost";
import DetailHeader from "../../components/DetailHeader";
import Layout from "../../components/Layout";
import CreateAnswer from "../../components/CreateAnswer";
import DetailAnswer from "../../components/DetailAnswer";
import AQRightsidebar from "../../components/AQsidebar";

const QuestionsDetail = () => {
  const params = Number(useParams().id);
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery(["detailQ"], () => {
    return getDetailQPost(params);
  });

  console.log("render");
  return (
    <>
      <Layout>
        <PostContainer>
          <LeftPostContainer>
            {isLoading ? (
              <div>now loading..</div>
            ) : (
              <>
                <DetailHeader question={data} />
                <DetailPost question={data} />
                <DetailAnswer
                  answer={data.answers}
                  questionId={data.questionId}
                />
                <CreateAnswer questionId={data.questionId} />
              </>
            )}
          </LeftPostContainer>
          <AQRightsidebar />
        </PostContainer>
      </Layout>
    </>
  );
};
export default QuestionsDetail;
