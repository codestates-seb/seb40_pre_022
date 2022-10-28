import React from "react";
import { QuestionContainer } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "../../../components/Button";

const Leftsidebar = () => {
  const itemList = ["Newest", "Votes", "Views", "Unanwsered"];
  const Questions = "0 quesions";

  return (
    <>
      <QuestionContainer>
        <Upside>
          <Button label='Ask Question' size='header-size' />
        </Upside>
        <Downside></Downside>
      </QuestionContainer>
    </>
  );
};

export default QuestionHeader;
