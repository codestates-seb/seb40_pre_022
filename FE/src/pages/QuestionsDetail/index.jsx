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
  const { isLoading, data } = useQuery(["detailQ"], () => {
    return getDetailQPost(params);
  });

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
                  member={data.member.memberId}
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
