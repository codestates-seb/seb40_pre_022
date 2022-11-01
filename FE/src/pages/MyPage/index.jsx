import React from "react";
import { MyPageContainer, UserContainer, Username } from "./style";
import Layout from "../../components/Layout";
import GlobalStyle from "../../styles/globalStyle";
import MypageSetting from "../../components/MypageSetting";

const MyPage = () => {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <MyPageContainer>
          <UserContainer>
            <img src='/initialProfile.png' className='img' />
            <Username>Heeyoon</Username>
          </UserContainer>
          <MypageSetting />
        </MyPageContainer>
      </Layout>
    </>
  );
};

export default MyPage;
