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
import { getAQuestion } from "../../api/questions";
import { useQuery } from "@tanstack/react-query";
import { AQPage } from "../../store/AQData";
import { useRecoilValue } from "recoil";

const AQMainbar = () => {
  const page = useRecoilValue(AQPage);
  const { isLoading, data } = useQuery(["AllQuestion", { page }], () => {
    return getAQuestion(page);
  });

  if (isLoading) return;

  const Questions = data.pageInfo.totalElements;

  return (
    <>
      <MainbarContainer>
        <AQheader>
          {window.location.href.includes("questions") ? (
            <h1>All Questions</h1>
          ) : (
            <h1>Top Questions</h1>
          )}
          <Link to={"/questions/ask"}>
            <Button label="Ask Question" size="large" />
          </Link>
        </AQheader>
        {window.location.href.includes("questions") ? (
          <AQsorting>
            {Questions} questions
            <AQsortingButton>
              <Button primary="Linkbutton" label="Newest" Choosed="Choosed" />
            </AQsortingButton>
          </AQsorting>
        ) : (
          <></>
        )}
        <Question />
        {window.location.href.includes("questions") ? <Paging /> : <></>}
      </MainbarContainer>
    </>
  );
};

export default AQMainbar;
