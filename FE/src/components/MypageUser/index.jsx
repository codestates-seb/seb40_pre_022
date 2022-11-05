import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getMembersPage } from "../../API/membersPage/membersPage";

import { UserContainer, Username } from "./style";

let str = String(document.location.href);
str = str.split("/");

const MypageUser = () => {
  const { isLoading, data } = useQuery(["MemNumber"], () => {
    return getMembersPage(str[5]);
  });

  if (isLoading) return;

  return (
    <>
      <UserContainer>
        <img src={data.member.image} className='img' />
        <Username>{data.member.name}</Username>
      </UserContainer>
    </>
  );
};

export default MypageUser;
