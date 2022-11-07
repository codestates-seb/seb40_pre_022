import React, { useEffect } from "react";
import { Button } from "@components/Button";
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer'

import { getAQuestion } from "../../../../api/questions";

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

const QuestionsList = () => {
  const { ref, inView } = useInView()

  const res = useInfiniteQuery(
      ['questions'],
      async ({ pageParam = 1 }) => {
        return await getAQuestion(pageParam);
      },
      {
         getNextPageParam: (lastPage) => lastPage.pageInfo.page + 1 
      }
    )

    useEffect(() => {
      if (inView) {
        res.fetchNextPage()
      }
    }, [inView])

  if( res.status === 'loading') {
    return ( <p>Loading...</p>)
  }

  if(res.data){
    return (
      <Container>
        {res.data.pages.map((page, pageIndex) => {
          const Mid = `/members/myPage/${res.data.member?.memberId}`;
          let Qid = `/questions/${res.data.questionId}`;
          const datas = page.data;
          return (
            datas.map((data, i)=> {
            return (
              <QuestionContainer 
                key={`${i}/${pageIndex}`} 
                ref={(datas.length * pageIndex + i === res.data.pages.length * datas.length - 1) ? ref : null}>
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
              )
           })
          );
        })}
        
      </Container>
    );
  }
 
};

export default QuestionsList;
