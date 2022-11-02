import React from "react";
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
import { data } from "@src/db/data.json";

const Question = () => {
  return (
    <>
      {data.map((data) => {
        let id = `/question/detail/${data.questionId}`;

        return (
          <QuestionContainer>
            <Questionsummary>
              <div>{data.vote} votes</div>
              <div>{data.vote} answers</div>
              <div>{data.view} views</div>
            </Questionsummary>
            <Questioncontent>
              <Questiontitle>
                <a href={id}>{data.title}</a>
              </Questiontitle>
              <Questionbody>{data.body}</Questionbody>
              <Questionfooter>
                <Questiontags>
                  {data.questionTags.map((list) => {
                    return (
                      <Button
                        primary='Linkbutton'
                        label={list.tagName}
                        Tagged='Tagged'
                      />
                    );
                  })}
                </Questiontags>
                <Questionuser>
                  <img src={data.user.image} className='img' />
                  {data.user.displayName} asked{" "}
                </Questionuser>
              </Questionfooter>
            </Questioncontent>
          </QuestionContainer>
        );
      })}
    </>
  );
};

export default Question;
