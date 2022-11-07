import { React } from "react";
import { Link } from "react-router-dom";
import { UserInfo, UserInfoText, InfoContainer } from "../DetailPost/style";
import { UserInfoItem } from "../DetailUserProfile/style";
import { calculateTime } from "../../utils/calculateTime";

const AnswerDetailProfile = ({ answers, AcreatedAt }) => {
  const answer = answers.member;

  const answerer = `/members/myPage/${answer.memberId}`;

  return (
    <UserInfo>
      <UserInfoText>{calculateTime(AcreatedAt)}</UserInfoText>
      <InfoContainer>
        <Link to={answerer} onClick={() => reload()}>
          <UserInfoItem>
            <img src={answer.image} className="img" />
          </UserInfoItem>
        </Link>
        <Link to={answerer} onClick={() => reload()}>
          <UserInfoItem className="user-name">{answer.name}</UserInfoItem>
        </Link>
      </InfoContainer>
    </UserInfo>
  );
};

export default AnswerDetailProfile;
