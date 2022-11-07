import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import Paging from "../Pagenation";
import User from "../User";

import {
  MainbarContainer,
  SearchBox,
  SearchInnerBox,
  Hearder,
  BtnList,
} from "./style";

import { Button } from "../Button";

const USMainbar = () => {
  return (
    <>
      <MainbarContainer>
        <h1>Users</h1>
        <Hearder>
          <SearchBox>
            <SearchInnerBox>
              <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
              <input
                type="text"
                placeholder="Filter by user"
                disabled="disabled"
              />
            </SearchInnerBox>
          </SearchBox>
          <BtnList>
            <Button label="Reputation" primary="Linkbutton" />
            <Button label="New users" primary="Linkbutton" />
            <Button label="Voters" primary="Linkbutton" />
            <Button label="Editors" primary="Linkbutton" />
            <Button label="Moderators" primary="Linkbutton" />
          </BtnList>
        </Hearder>
        <User />
      </MainbarContainer>
    </>
  );
};

export default USMainbar;
