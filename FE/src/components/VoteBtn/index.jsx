import { React, useState } from "react";
import { Btn, VoteContainer, VoteCount } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const VoteBtn = ({ answer, bestAnswer }) => {
  let initialCount = 0;
  const [isVotedUp, setIsVotedUp] = useState(false);
  const [isVotedDown, setIsVotedDown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const handleVoteClick = (status) => {
    if (
      status === "up" &&
      (count === initialCount || count === initialCount - 1)
    ) {
      setIsVotedUp(true);
      setIsVotedDown(false);
      setCount((prev) => prev + 1);
    } else if (
      status === "down" &&
      (count === initialCount || count === initialCount + 1)
    ) {
      setIsVotedDown(true);
      setIsVotedUp(false);
      setCount((prev) => prev - 1);
    }
  };

  const handleCheckClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <VoteContainer>
      <Btn
        onClick={() => handleVoteClick("up")}
        className={isVotedUp && count !== initialCount ? "voted" : null}
      />
      <VoteCount>{count}</VoteCount>
      <Btn
        onClick={() => handleVoteClick("down")}
        className={
          isVotedDown && count !== initialCount ? "down voted" : "down"
        }
      />
      <FontAwesomeIcon
        icon={faBookmark}
        color='hsl(210deg 8% 80%)'
        className='icon'
      />
      {answer ? (
        <FontAwesomeIcon // 질문 작성자에게만 보이도록 해야 함
          icon={faCheck}
          className={
            isChecked || bestAnswer ? "icon check checked" : "icon check"
          }
          color='hsl(210deg 8% 80%)'
          onClick={handleCheckClick}
        />
      ) : null}
      <FontAwesomeIcon
        icon={faClockRotateLeft}
        color='hsl(210deg 8% 80%)'
        className='icon'
      />
    </VoteContainer>
  );
};

export default VoteBtn;
