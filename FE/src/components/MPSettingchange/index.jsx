import React from "react";
import { useRecoilValue } from "recoil";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { MPSContainer, MPSImg, MPSName, Postbutton } from "./style";
import { getMembersPage, PatchMembersPage } from "../../api/membersPage";

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

  const id = JSON.parse(localStorage.getItem("memberId"));

  return (
    <MPSContainer>
      <MPSImg>
        <img src={data.member.image} className="img" />
        <Postbutton
          onClick={() => {
            let chooseFile = document.getElementById("chooseFile").value;
            PatchMember.mutate({
              memberId: id,
              image: chooseFile,
            });
            location.reload();
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
            let name = document.getElementById("changeName").value;
            PatchMember.mutate({
              memberId: id,
              name: name,
            });
            location.reload();
          }}
        >
          <FontAwesomeIcon icon={faPen} fontSize="13px" />
        </Postbutton>
        <input id="changeName" placeholder="변경할 Name"></input>
      </MPSName>
    </MPSContainer>
  );
};

export default MPSChange;
