import React from "react";
import { Button } from "../Button";
import { Container, ButtonContainer } from "./style";
import MypageProfile from "../MypageProfile";
import MypageDarkmode from "../MypageDarkmode";

const MypageSetting = () => {
  return (
    <>
      <Container>
        <ButtonContainer>
          <Button primary='Mypagebutton' label='profile' Selected='Selected' />
          <Button primary='Mypagebutton' label='setting' />
          <Button primary='Mypagebutton' label='Unanswered' />
          <Button primary='Mypagebutton' label='Unanswered' />
        </ButtonContainer>
        <MypageProfile />
        <MypageDarkmode />
      </Container>
    </>
  );
};

export default MypageSetting;
