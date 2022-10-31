import { React, useState } from "react";
import { Btn, VoteContainer, VoteCount } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

const VoteBtn = () => {
  const [isVotedUp, setIsVotedUp] = useState(false);
  const [isVotedDown, setIsVotedDown] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = (status) => {
    if (status === "up") {
      setIsVotedUp(true);
      setIsVotedDown(false);
      setCount(count + 1);
    } else if (status === "down") {
      setIsVotedDown(true);
      setIsVotedUp(false);
      setCount(count - 1);
    }
  };
  return (
    <VoteContainer>
      <Btn
        onClick={() => handleClick("up")}
        className={isVotedUp && count !== 0 ? "voted" : null}
      />
      <VoteCount>{count}</VoteCount>
      <Btn
        onClick={() => handleClick("down")}
        className={isVotedDown && count !== 0 ? "down voted" : "down"}
      />
      <FontAwesomeIcon
        icon={faBookmark}
        color='hsl(210deg 8% 80%)'
        className='icon'
      />
      <FontAwesomeIcon
        icon={faClockRotateLeft}
        color='hsl(210deg 8% 80%)'
        className='icon'
      />
    </VoteContainer>
  );
};

export default VoteBtn;
