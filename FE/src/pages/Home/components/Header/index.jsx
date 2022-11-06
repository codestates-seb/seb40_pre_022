import React from "react";
import { Button } from "@components/Button";

import { MainbarContainer, BtnList, Hearder } from "./style";

const Header = () => {
  return (
    <MainbarContainer>
      <Hearder>
        <h1>Top Questions</h1>
        <Button label="Ask Question" />
      </Hearder>
      <BtnList>
        <Button label="Interesting" primary="Linkbutton" />
        <Button label="Bountied" primary="Linkbutton" />
        <Button label="Hot" primary="Linkbutton" />
        <Button label="Week" primary="Linkbutton" />
        <Button label="Month" primary="Linkbutton" />
      </BtnList>
    </MainbarContainer>
  );
};

export default Header;
