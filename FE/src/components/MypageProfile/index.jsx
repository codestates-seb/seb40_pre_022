import React from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { Title, UserContainer, Useritem, Qlist } from "./style";
import { MypageSet } from "../../store/MypageData";
import { getMembersPage } from "../../api/members";

const MypageProfile = () => {
  const pageSet = useRecoilValue(MypageSet);
  let str = String(document.location.href);
  str = str.split("/");

  const { isLoading, data } = useQuery(["MemNumber"], () => {
    return getMembersPage(str[5]);
  });

  if (isLoading) return;

  return pageSet === "profile" ? (
    <>
      <Title>Stats</Title>
      <UserContainer>
        <Useritem>{data.questions.questionsCount} question</Useritem>
        <Useritem>
          {data.questions.questionList.map((data, i) => (
            <Link to={`/questions/${data.questionId}`} key={i}>
              <Qlist>{data.title}</Qlist>
            </Link>
          ))}
        </Useritem>
        <Useritem>{data.answers.answersCount} answers</Useritem>
      </UserContainer>
    </>
  ) : (
    <></>
  );
};

export default MypageProfile;
