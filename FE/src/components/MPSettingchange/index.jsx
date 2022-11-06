import React from "react";
import { useRecoilValue } from "recoil";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { MPSContainer, MPSImg, MPSName, Postbutton } from "./style";
import { getMembersPage, PatchMembersPage } from "../../API/membersPage";

const MPSChange = () => {
  let str = String(document.location.href);
  str = str.split("/");

  const { isLoading, data } = useQuery(["MemNumber"], () => {
    return getMembersPage(str[5]);
  });

  if (isLoading) return;

  const PatchMember = useMutation(PatchMembersPage, {
    retry: 0,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const id = localStorage.getItem("memberId");

  return (
    <MPSContainer>
      <MPSImg>
        <img src={data.member.image} className="img" />
        <Postbutton
          onClick={() => {
            PatchMember.mutate({
              image: chooseFile,
            });
          }}
        >
          <FontAwesomeIcon icon={faPen} />
        </Postbutton>
        <input type="file" id="chooseFile" accept="image/*" />
      </MPSImg>
      <MPSName>
        {data.member.name}
        <Postbutton
          onClick={() => {
            console.log(id);
            PatchMember.mutate({
              memberId: id,
              name: "change?",
              password: "n123456789!",
              image: "~~d",
            });
          }}
        >
          <FontAwesomeIcon icon={faPen} fontSize="13px" />
        </Postbutton>
        <input id="changeName"></input>
      </MPSName>
    </MPSContainer>
  );
};

export default MPSChange;
