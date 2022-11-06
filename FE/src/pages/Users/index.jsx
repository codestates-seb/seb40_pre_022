import React from "react";
import Layout from "../../components/Layout";
import USmainbar from "../../components/USmainbar";

import { PostContainer, PageContainer } from "./style";

const Users = () => {
  return (
    <>
      <Layout>
        <PageContainer>
            <PostContainer>
              <USmainbar />
            </PostContainer>
          </PageContainer>
      </Layout>
    </>
  );
};

export default Users;
