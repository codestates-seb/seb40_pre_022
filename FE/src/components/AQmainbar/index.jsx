import React from "react";
import {
  MainbarContainer,
  AQheader,
  AQsorting,
  AQsortingButton,
} from "./style";
import { Button } from "../Button";
import Question from "../Question";
import Paging from "../Pagenation";
import { Link } from "react-router-dom";

const AQMainbar = () => {
  const Questions = ["list of "];

  return (
    <>
      <MainbarContainer>
        <AQheader>
          <h1>All Questions</h1>
          <Link to={"/questions/ask"}>
            <Button label="Ask Question" size="large" />
          </Link>
        </AQheader>
        <AQsorting>
          {Questions}questions
          <AQsortingButton>
            {/* <Button
              primary='Linkbutton'
              label='Newest'
              Position='Left'
              Choosed='Choosed'
            />
            <Button primary='Linkbutton' label='Unanswered' Position='Middle' />
            <Button primary='Linkbutton' label='Views' Position='Right' /> */}
            <Button primary="Linkbutton" label="Newest" Choosed="Choosed" />
          </AQsortingButton>
        </AQsorting>
        <Question />
        <Paging />
      </MainbarContainer>
    </>
  );
};

export default AQMainbar;
