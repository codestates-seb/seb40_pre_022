import React from "react";
import {
  Title,
  SettingContainer,
  Settingitem,
  ModeContainer,
  ModeImg,
} from "./style";
import { useRecoilValue } from "recoil";
import { MypageSet } from "../../store/MypageData";
import MPSChange from "../MPSettingchange";

const MypageDarkmode = () => {
  const pageSet = useRecoilValue(MypageSet);
  return pageSet === "Setting" ? (
    <>
      <Title>Setting</Title>
      <SettingContainer>
        <MPSChange />
      </SettingContainer>
      <Title>Dark mode (not implemented..)</Title>
      <SettingContainer>
        <ModeContainer>
          <Settingitem
            type="radio"
            name="darkmode"
            disabled="disabled"
            readOnly
          />
          <ModeImg>
            <img src="/theme-light.svg" className="img" />
            <div>Light</div>
          </ModeImg>
        </ModeContainer>
        <ModeContainer>
          <Settingitem type="radio" name="darkmode" disabled="disabled" />
          <ModeImg>
            <img src="/theme-dark.svg" className="img" />
            <div>Dark</div>
          </ModeImg>
        </ModeContainer>
      </SettingContainer>
    </>
  ) : (
    <></>
  );
};

export default MypageDarkmode;
