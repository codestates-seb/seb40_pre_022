import React from "react";
import {
  MainbarContainer,
  AQheader,
  AQsorting,
  AQsortingButton,
} from "./style";
import { Button } from "../Button";
import Question from "../Question";

const AQMainbar = () => {
  const Questions = ["23,156,830"];

  return (
    <>
      <MainbarContainer>
        <AQheader>
          <h1>All Questions</h1>
          <Button label='Ask Question' size='large' />
        </AQheader>
        <AQsorting>
          {Questions}questions
          <AQsortingButton>
            <Button
              primary='Linkbutton'
              label='Newest'
              Position='Left'
              Choosed='Choosed'
            />
            <Button primary='Linkbutton' label='Unanswered' Position='Middle' />
            <Button primary='Linkbutton' label='Views' Position='Right' />
          </AQsortingButton>
        </AQsorting>
        <Question />
      </MainbarContainer>
    </>
  );
};

export default AQMainbar;
