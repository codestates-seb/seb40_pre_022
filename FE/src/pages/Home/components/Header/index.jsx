import React from "react";
import { Link } from 'react-router-dom';

import { Button } from "@components/Button";

import { MainbarContainer, Hearder } from "./style";

const Header = () => {
  return (
    <MainbarContainer>
      <Hearder>
        <h1>Top Questions</h1>
        <Link to="/questions/ask">
           <Button label="Ask Question" />
        </Link>
      </Hearder>
    </MainbarContainer>
  );
};

export default Header;
