import { React, useState } from "react";
import { Btn, VoteContainer, VoteCount } from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { DetailQData } from "../../store/DetailQData";

const VoteBtn = ({ answer, bestAnswer, vote }) => {
  const QVoteCount = useRecoilValue(DetailQData).vote;
  const [isVotedUp, setIsVotedUp] = useState(false);
  const [isVotedDown, setIsVotedDown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [count, setCount] = useState(vote || QVoteCount);

  const handleVoteClick = (status) => {
    if (
      status === "up" &&
      (count === (vote || QVoteCount) || count === (vote || QVoteCount) - 1)
    ) {
      setIsVotedUp(true);
      setIsVotedDown(false);
      setCount(count + 1);
    } else if (
      status === "down" &&
      (count === (vote || QVoteCount) || count === (vote || QVoteCount) + 1)
    ) {
      setIsVotedDown(true);
      setIsVotedUp(false);
      setCount(count - 1);
    }
    console.log(count);
  };

  const handleCheckClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <VoteContainer>
      <Btn
        onClick={() => handleVoteClick("up")}
        className={isVotedUp && count !== (vote || QVoteCount) ? "voted" : null}
      />
      <VoteCount>{vote ? vote : QVoteCount}</VoteCount>
      <Btn
        onClick={() => handleVoteClick("down")}
        className={
          isVotedDown && count !== (vote || QVoteCount) ? "down voted" : "down"
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
