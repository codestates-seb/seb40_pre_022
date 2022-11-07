import { React, useState } from "react";
import { Btn, VoteContainer, VoteCount } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { QvoteDown, QvoteUp } from "../../api/details";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const VoteBtn = ({ question }) => {
  const QVoteCount = question.voteCount;
  const [isVotedUp, setIsVotedUp] = useState(false);
  const [isVotedDown, setIsVotedDown] = useState(false);
  const [count, setCount] = useState(QVoteCount);
  const queryClient = useQueryClient();

  const voteUp = useMutation(QvoteUp, {
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const voteDown = useMutation(QvoteDown, {
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleVoteClick = (status) => {
    if (status === "up" && (count === QVoteCount || count === QVoteCount - 1)) {
      setIsVotedUp(true);
      setIsVotedDown(false);
      setCount(count + 1);
      voteUp.mutate({
        questionId: question.questionId,
      });
    } else if (
      status === "down" &&
      (count === QVoteCount || count === QVoteCount + 1)
    ) {
      setIsVotedDown(true);
      setIsVotedUp(false);
      setCount(count - 1);
      voteDown.mutate({
        questionId: question.questionId,
      });
    }
  };

  return (
    <VoteContainer>
      <Btn
        onClick={() => handleVoteClick("up")}
        className={isVotedUp && count !== QVoteCount ? "voted" : null}
      />
      <VoteCount>{count}</VoteCount>
      <Btn
        onClick={() => handleVoteClick("down")}
        className={isVotedDown && count !== QVoteCount ? "down voted" : "down"}
      />
      <FontAwesomeIcon
        icon={faBookmark}
        color="hsl(210deg 8% 80%)"
        className="icon"
      />
      <FontAwesomeIcon
        icon={faClockRotateLeft}
        color="hsl(210deg 8% 80%)"
        className="icon"
      />
    </VoteContainer>
  );
};

export default VoteBtn;
