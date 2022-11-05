import { React, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Btn, VoteContainer, VoteCount } from "../VoteBtn/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { AvoteDown, AvoteUp } from "../../api/details";

const AnswerVoteBtn = ({ answer, questionId }) => {
  const AVoteCount = answer.voteCount;
  const [bestAnswer, setBestAnswer] = useState(answer.isAccepted);
  const [isVotedUp, setIsVotedUp] = useState(false);
  const [isVotedDown, setIsVotedDown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(AVoteCount);
  const voteUp = useMutation(
    () => {
      AvoteUp(questionId, answer.answerId);
    },
    {
      retry: 0,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error.message);
      },
    },
  );

  const voteDown = useMutation(
    () => {
      AvoteDown(questionId, answer.answerId);
    },
    {
      retry: 0,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error.message);
      },
    },
  );

  const handleVoteClick = (status) => {
    if (status === "up" && (count === AVoteCount || count === AVoteCount - 1)) {
      setIsVotedUp(true);
      setIsVotedDown(false);
      setCount(count + 1);
      voteUp.mutate({
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
        answerId: answer.answerId,
      });
    }
    console.log(count);
  };

  const handleCheckClick = () => {
    if (!isChecked) {
    }
    setIsChecked(!isChecked);
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
        color='hsl(210deg 8% 80%)'
        className='icon'
      />
      <FontAwesomeIcon // 질문 작성자에게만 보이도록 해야 함
        icon={faCheck}
        className={
          isChecked || bestAnswer ? "icon check checked" : "icon check"
        }
        color='hsl(210deg 8% 80%)'
        onClick={handleCheckClick}
      />
      <FontAwesomeIcon
        icon={faClockRotateLeft}
        color='hsl(210deg 8% 80%)'
        className='icon'
      />
    </VoteContainer>
  );
};

export default AnswerVoteBtn;
