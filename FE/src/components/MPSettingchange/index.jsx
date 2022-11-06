import React from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { MPSContainer, MPSImg, MPSName, Postbutton } from "./style";
import { MypageSet } from "../../store/MypageData";
import { getMembersPage } from "../../API/members";

const MPSChange = () => {
  const pageSet = useRecoilValue(MypageSet);
  let link = `${import.meta.env.VITE_API_BASE_URL}/questions/`;
  let str = String(document.location.href);
  str = str.split("/");

  const { isLoading, data } = useQuery(["MemNumber"], () => {
    return getMembersPage(str[5]);
  });

  if (isLoading) return;

  function loadFile(input) {
    var file = input.files[0]; //선택된 파일 가져오기

    //미리 만들어 놓은 div에 text(파일 이름) 추가
    var name = document.getElementById("fileName");
    name.textContent = file.name;

    //새로운 이미지 div 추가
    var newImage = document.createElement("img");
    newImage.setAttribute("class", "img");

    //이미지 source 가져오기
    newImage.src = URL.createObjectURL(file);

    newImage.style.width = "70%";
    newImage.style.height = "70%";
    newImage.style.visibility = "hidden"; //버튼을 누르기 전까지는 이미지를 숨긴다
    newImage.style.objectFit = "contain";

    //이미지를 image-show div에 추가
    var container = document.getElementById("image-show");
    container.appendChild(newImage);
  }

  return (
    <MPSContainer>
      <MPSImg>
        <img src={data.member.image} className="img" />

        <form method="post" enctype="multipart/form-data">
          <Postbutton onClick={() => {}}>
            <FontAwesomeIcon icon={faPen} />
          </Postbutton>
          <input
            type="file"
            id="chooseFile"
            name="chooseFile"
            accept="image/*"
            onchange="loadFile(this)"
          />
        </form>
      </MPSImg>
      <MPSName>
        {data.member.name}
        <Postbutton>
          <FontAwesomeIcon icon={faPen} fontSize="13px" />
        </Postbutton>
        <input></input>
      </MPSName>
    </MPSContainer>
  );
};

export default MPSChange;
