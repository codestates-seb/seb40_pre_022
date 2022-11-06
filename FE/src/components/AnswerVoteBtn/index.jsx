import { React, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Btn, VoteContainer, VoteCount } from "../VoteBtn/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { acceptAnswer, AvoteDown, AvoteUp } from "../../api/details";

const AnswerVoteBtn = ({ answer, questionId }) => {
  const AVoteCount = answer.voteCount;
  const [bestAnswer, setBestAnswer] = useState(answer.isAccepted);
  const [isVotedUp, setIsVotedUp] = useState(false);
  const [isVotedDown, setIsVotedDown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(AVoteCount);
  const queryClient = useQueryClient();
  const voteUp = useMutation(AvoteUp, {
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const voteDown = useMutation(AvoteDown, {
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const checkAnswer = useMutation(acceptAnswer, {
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      if (error.message === "Request failed with status code 409")
        alert("이미 채택된 답변이 있습니다.");
      else if (error.message === "Request failed with status code 403") {
        alert("채택할 권한이 없는 글입니다.");
      }
      setIsChecked(false);
    },
  });

  const handleVoteClick = (status) => {
    if (status === "up" && (count === AVoteCount || count === AVoteCount - 1)) {
      setIsVotedUp(true);
      setIsVotedDown(false);
      setCount(count + 1);
      voteUp.mutate({
        id: questionId,
        answerId: answer.answerId,
      });
    } else if (
      status === "down" &&
      (count === AVoteCount || count === AVoteCount + 1)
    ) {
      setIsVotedDown(true);
      setIsVotedUp(false);
      setCount(count - 1);
      voteDown.mutate({
        id: questionId,
        answerId: answer.answerId,
      });
    }
  };

  const handleCheckClick = () => {
    setIsChecked(!isChecked);
    checkAnswer.mutate({
      id: questionId,
      answerId: answer.answerId,
    });
  };

  return (
    <VoteContainer>
      <Btn
        onClick={() => handleVoteClick("up")}
        className={isVotedUp && count !== AVoteCount ? "voted" : null}
      />
      <VoteCount>{count}</VoteCount>
      <Btn
        onClick={() => handleVoteClick("down")}
        className={isVotedDown && count !== AVoteCount ? "down voted" : "down"}
      />
      <FontAwesomeIcon
        icon={faBookmark}
        color="hsl(210deg 8% 80%)"
        className="icon"
      />
      <FontAwesomeIcon // 질문 작성자에게만 보이도록 해야 함
        icon={faCheck}
        className={
          isChecked || bestAnswer ? "icon check checked" : "icon check"
        }
        color="hsl(210deg 8% 80%)"
        onClick={handleCheckClick}
      />
      <FontAwesomeIcon
        icon={faClockRotateLeft}
        color="hsl(210deg 8% 80%)"
        className="icon"
      />
    </VoteContainer>
  );
};

export default AnswerVoteBtn;
