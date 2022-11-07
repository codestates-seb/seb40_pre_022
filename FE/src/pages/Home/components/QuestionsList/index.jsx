import React, { useEffect } from "react";
import { Button } from "@components/Button";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import {
  Container,
  QuestionContainer,
  Questioncontent,
  Questiontitle,
  Questionbody,
  Questionuser,
  Questionfooter,
  Questionsummary,
  Questiontags,
} from "./style";

import { getAQuestion } from "../../../../API/questions";

const QuestionsList = () => {
  const { ref, inView } = useInView();

  const { status, data, error, isFetching, fetchNextPage } = useInfiniteQuery(
    ["questions"],
    async ({ pageParam = 1 }) => {
      const res = await getAQuestion(pageParam);
      console.log("res", res);
      const nextPage = res.pageInfo.page + 1;
      const totalPages = res.pageInfo.totalPages;
      return {
        result: res.data,
        nextPage,
        totalPages,
      };
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage + 1,
    }
  );

  console.log("!!!", data);

  useEffect(() => {
    const totalPage = data?.pages[0].totalPages;
    const nextPage = data?.pages[0].nextPage;
    if (inView && nextPage < totalPage) {
      fetchNextPage();
    }
  }, [inView]);

  // const { isLoading, data } = useQuery(["AllQuestion", { page }], () => {
  //   return getAQuestion(page);
  // });

  // if (isLoading) return;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <button onClick={() => fetchPreviousPage()}>이전패치버튼</button>
      {/* {data.pages[0].map((data, i) => {
        const Mid = `/members/myPage/${data.member?.memberId}`;
        let Qid = `/questions/${data.questionId}`;
        return (
          <QuestionContainer key={i}>
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
                  {data.questionTags?.map((list, i) => {
                    return (
                      <Button
                        primary="Linkbutton"
                        label={list.questionTagName}
                        Tagged="Tagged"
                        key={i}
                      />
                    );
                  })}
                </Questiontags>
                <Questionuser href={Mid}>
                  <img src={data.member?.image} className="img" />
                  {data.member?.name} asked{" "}
                </Questionuser>
              </Questionfooter>
            </Questioncontent>
          </QuestionContainer>
        );
      })} */}
      <button ref={ref} onClick={() => fetchNextPage()}>
        버튼
      </button>
    </Container>
  );
};

export default QuestionsList;
