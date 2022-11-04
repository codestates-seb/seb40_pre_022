import React from "react";
import { MyPageContainer, UserContainer, Username } from "./style";
import Layout from "../../components/Layout";
import MypageSetting from "../../components/MypageSetting";

const MyPage = () => {
  return (
    <Layout>
      <MyPageContainer>
        <UserContainer>
          <img src='/initialProfile.png' className='img' />
          <Username>Heeyoon</Username>
        </UserContainer>
        <MypageSetting />
      </MyPageContainer>
    </Layout>
  );
};

export default MyPage;
