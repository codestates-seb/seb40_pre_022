import { React, useState } from "react";
import { Btn, VoteContainer, VoteCount } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { QvoteDown, QvoteUp } from "../../api/details";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { voteDownState, voteUpState } from "../../store/voteCheck";

const VoteBtn = ({ question }) => {
  const QVoteCount = question.voteCount;
  // const [isVotedUp, setIsVotedUp] = useState(false);
  // const [isVotedDown, setIsVotedDown] = useState(false);
  const [isVotedUp, setIsVotedUp] = useRecoilState(voteUpState);
  const [isVotedDown, setIsVotedDown] = useRecoilState(voteDownState);
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
    if (status === "up") {
      setIsVotedUp(true);
      setIsVotedDown(false);
      voteUp.mutate({
        questionId: question.questionId,
      });
    } else if (status === "down") {
      setIsVotedDown(true);
      setIsVotedUp(false);
      voteDown.mutate({
        questionId: question.questionId,
      });
    }
  };

  return (
    <VoteContainer>
      <Btn
        onClick={() => handleVoteClick("up")}
        className={isVotedUp && QVoteCount !== count ? "voted" : null}
      />
      <VoteCount>{question.voteCount}</VoteCount>
      <Btn
        onClick={() => handleVoteClick("down")}
        className={isVotedDown && QVoteCount !== count ? "down voted" : "down"}
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
