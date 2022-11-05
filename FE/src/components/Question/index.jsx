import React from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";

import {
  QuestionContainer,
  Questioncontent,
  Questiontitle,
  Questionbody,
  Questionuser,
  Questionfooter,
  Questionsummary,
  Questiontags,
} from "./style";
import { Button } from "../Button";
import { getAQuestion } from "../../API/AQuestion/AQuestion";
import { AQPage } from "../../store/AQData";

const Question = () => {
  const page = useRecoilValue(AQPage);

  const { isLoading, data } = useQuery(["AllQuestion", { page }], () => {
    return getAQuestion(page);
  });

  if (isLoading) return;

  return (
    <>
      {data.data.map((data) => {
        const Mid = `/members/myPage/${data.member.memberId}`;
        let Qid = `/questions/${data.questionId}`;
        return (
          <QuestionContainer>
            <Questionsummary>
              <div>{data.voteCount} votes</div>
              <div>{data.answerCount} answers</div>
              <div>{data.viewCount} views</div>
            </Questionsummary>
            <Questioncontent>
              <Questiontitle>
                <a href={Qid}>{data.title}</a>
              </Questiontitle>
              <Questionbody>{data.body}</Questionbody>
              <Questionfooter>
                <Questiontags>
                  {data.questionTags.map((list) => {
                    return (
                      <Button
                        primary='Linkbutton'
                        label={list.questionTagName}
                        Tagged='Tagged'
                      />
                    );
                  })}
                </Questiontags>
                <a href={Mid}>
                  <Questionuser>
                    <img src={data.member.image} className='img' />
                    {data.member.name} asked{" "}
                  </Questionuser>
                </a>
              </Questionfooter>
            </Questioncontent>
          </QuestionContainer>
        );
      })}
    </>
  );
};

export default Question;
