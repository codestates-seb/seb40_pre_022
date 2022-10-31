import React from "react";
import {
  PostLayout,
  LayoutLeft,
  LayoutRight,
  VoteBtn,
  VoteContainer,
  VoteCount,
  PostBody,
} from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const DetailPost = () => {
  return (
    <PostLayout>
      <LayoutLeft>
        <VoteContainer>
          <VoteBtn />
          <VoteCount>0</VoteCount>
          <FontAwesomeIcon icon={faBookmark} color='hsl(210deg 8% 80%)' />
        </VoteContainer>
      </LayoutLeft>
      <LayoutRight>
        <PostBody>내용입니다.</PostBody>
      </LayoutRight>
    </PostLayout>
  );
};

export default DetailPost;
