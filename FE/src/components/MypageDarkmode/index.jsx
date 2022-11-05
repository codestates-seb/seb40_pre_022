import React from "react";
import {
  Title,
  SettingContainer,
  Settingitem,
  ModeContainer,
  ModeImg,
} from "./style";

const MypageDarkmode = () => {
  return (
    <>
      <Title>Setting</Title>
      <SettingContainer>
        <ModeContainer>
          <Settingitem type='radio' name='darkmode' checked='checked' readOnly />
          <ModeImg>
            <img src='/theme-light.svg' className='img' />
            <div>Light</div>
          </ModeImg>
        </ModeContainer>
        <ModeContainer>
          <Settingitem type='radio' name='darkmode' readOnly />
          <ModeImg>
            <img src='/theme-dark.svg' className='img' />
            <div>Dark</div>
          </ModeImg>
        </ModeContainer>
      </SettingContainer>
    </>
  );
};

export default MypageDarkmode;
