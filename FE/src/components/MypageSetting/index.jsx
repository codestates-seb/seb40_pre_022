import React from "react";
import { useRecoilState } from "recoil";

import { Button } from "../Button";
import { MembersContainer, ButtonContainer } from "./style";
import MypageProfile from "../MypageProfile";
import MypageDarkmode from "../MypageDarkmode";
import { MypageSet } from "../../store/MypageData";

const MypageSetting = () => {
  const [pageSet, setPageSet] = useRecoilState(MypageSet);

  return (
    <>
      <MembersContainer>
        <ButtonContainer>
          <Button
            primary="Mypagebutton"
            label="profile"
            Selected={pageSet === "profile" ? "Selected" : null}
            onClick={(e) => {
              setPageSet(e.target.value);
            }}
          />
          {JSON.parse(localStorage.getItem("memberId")) ===
          window.location.href.split("myPage/")[1] ? (
            <Button
              primary="Mypagebutton"
              label="Setting"
              Selected={pageSet === "Setting" ? "Selected" : null}
              onClick={(e) => {
                setPageSet(e.target.value);
              }}
            />
          ) : (
            <></>
          )}
          <Button primary="Mypagebutton" label="nothing" />
          <Button primary="Mypagebutton" label="nothing" />
        </ButtonContainer>
        <MypageProfile />
        <MypageDarkmode />
      </MembersContainer>
    </>
  );
};

export default MypageSetting;
