import { React, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  PostLayout,
  LayoutLeft,
  LayoutRight,
  PostBody,
  InfoContainer,
  PostMenuContainer,
  PostMenu,
  UserInfo,
  TagContainer,
} from "./style";
import VoteBtn from "../VoteBtn";
import ContentViewer from "../ContentViewer";
import DetailUserProfile from "../DetailUserProfile";
import { Button } from "../Button";
import { TagWrapper } from "../CreateAnswer/style";
import { Link, useNavigate } from "react-router-dom";
import { deleteQuestion } from "../../api/details";
import { useEffect } from "react";

const DetailPost = ({ question }) => {
  const navigate = useNavigate();
  const [isWriter, setIsWriter] = useState(false);
  const loginMember = localStorage.getItem("memberId");

  useEffect(() => {
    if (Number(JSON.parse(loginMember)) === question.member.memberId) {
      setIsWriter(true);
    }
  }, []);

  const deleteQ = useMutation(deleteQuestion, {
    retry: 0,
    onSuccess: () => {
      navigate(`/questions`);
    },
    onError: (error) => {
      alert("삭제할 권한이 없는 글입니다.");
    },
  });
  const handleDelete = () => {
    deleteQ.mutate(question.questionId);
  };

  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  let time = new Date(Date.parse(question.createdAt) + KR_TIME_DIFF);

  return (
    <PostLayout>
      <LayoutLeft>
        <VoteBtn question={question} />
      </LayoutLeft>
      <LayoutRight>
        <PostBody>
          <ContentViewer markdown={question.body} />
        </PostBody>
        <TagContainer>
          {question.questionTags.map((el) => (
            <TagWrapper key={el.questionTagName}>
              <Button label={el.questionTagName} Tagged="Tagged" />
            </TagWrapper>
          ))}
        </TagContainer>
        <InfoContainer>
          <PostMenuContainer>
            <PostMenu>Share</PostMenu>

            {isWriter ? (
              <Link to={`/questions/edit/${question.questionId}`}>
                <PostMenu>Edit</PostMenu>
              </Link>
            ) : null}

            <PostMenu>Follow</PostMenu>
            {isWriter ? <PostMenu onClick={handleDelete}>Edit</PostMenu> : null}
          </PostMenuContainer>
          <UserInfo className="edit"></UserInfo>
          <DetailUserProfile questions={question} QcreatedAt={time} />
        </InfoContainer>
      </LayoutRight>
    </PostLayout>
  );
};

export default DetailPost;
