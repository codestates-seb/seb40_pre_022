import React from "react";
import { Title, UserContainer, Useritem } from "./style";

const MypageProfile = () => {
  return (
    <>
      <Title>Stats</Title>
      <UserContainer>
        <Useritem>1 voted</Useritem>
        <Useritem>13 question</Useritem>
        <Useritem>10 answers</Useritem>
      </UserContainer>
    </>
  );
};

export default MypageProfile;
