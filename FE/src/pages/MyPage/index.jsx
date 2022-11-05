import React from "react";
import { MyPageContainer } from "./style";
import Layout from "../../components/Layout";
import MypageSetting from "../../components/MypageSetting";
import AQRightsidebar from "../../components/AQsidebar";
import MypageUser from "../../components/MypageUser";

const MyPage = () => {
  return (
    <Layout>
      <MyPageContainer>
        <MypageUser />
        <MypageSetting />
      </MyPageContainer>
      <AQRightsidebar />
    </Layout>
  );
};

export default MyPage;
