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

const Question = () => {
  const data = [
    {
      questionId: 54,
      questionStatus: "QUESTION_EXIST",
      title: "whwjwjwjwnwnwnwnwnnwnwh",
      body: " hwhwhwhwnwhwnhwnwnwnwnwnwnwnwnnwwnwijpfjapdjfn",
      vote: 0,
      view: 24,
      user: {
        displayName: "151214",
        email: "test@gamil.com",
        image:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800",
        userStatus: "USER_EXIST",
      },
      questionTags: [
        {
          tagName: "java",
        },
      ],
      createdAt: "2022-10-25T17:11:48",
      updatedAt: "2022-10-25T17:11:48",
    },
    {
      questionId: 51,
      questionStatus: "QUESTION_EXIST",
      title: "ㄴㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㄹ",
      body: " ㄴㅇㄹㄴㅇㄹㄴㅇㄹㅁㄴㅇㄹㅁㅁㄴㅇㄹㅁㄴㅇㄹㅁㅇㄹㅁㄴㅇㄹㅁㄹㄴㄹㄴㄹㄴ",
      vote: 0,
      view: 85,
      user: {
        displayName: "151214",
        email: "test@gamil.com",
        image:
          "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800",
        userStatus: "USER_EXIST",
      },
      questionTags: [
        {
          tagName: "java",
        },
        {
          tagName: "did",
        },
        {
          tagName: "sisis",
        },
        {
          tagName: "sks",
        },
      ],
      createdAt: "2022-10-25T13:15:48",
      updatedAt: "2022-10-25T17:11:20",
    },
  ];

  return (
    <>
      <QuestionContainer>
        <Questionsummary>
          <div>0 votes</div>
          <div>0 answers</div>
          <div>4 views</div>
        </Questionsummary>
        <Questioncontent>
          <Questiontitle>
            <h3>
              <a href='/question/detail'>{data[0].title}</a>
            </h3>
          </Questiontitle>
          <Questionbody>{data[0].body}</Questionbody>
          <Questionfooter>
            <Questiontags>
              <Button primary='Linkbutton' label='tags' Tagged='Tagged' />
              <Button primary='Linkbutton' label='tags' Tagged='Tagged' />
              <Button primary='Linkbutton' label='tags' Tagged='Tagged' />
            </Questiontags>
            <Questionuser>{data[0].user.displayName} asked </Questionuser>
          </Questionfooter>
        </Questioncontent>
      </QuestionContainer>
    </>
  );
};

export default Question;
