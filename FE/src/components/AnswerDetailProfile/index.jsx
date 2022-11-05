import { React } from "react";
import { Link } from "react-router-dom";
import { UserInfo, UserInfoText, InfoContainer } from "../DetailPost/style";
import { UserInfoItem } from "../DetailUserProfile/style";
import { calculateTime } from "../../utils/calculateTime";

const AnswerDetailProfile = ({ answers, AcreatedAt }) => {
  const answer = answers.member;

  return (
    <UserInfo>
      <UserInfoText>{calculateTime(AcreatedAt)}</UserInfoText>
      <InfoContainer>
        <Link to='/mypage'>
          <UserInfoItem>
            <img src={answer.image} className='img' />
          </UserInfoItem>
        </Link>
        <Link to='/mypage'>
          <UserInfoItem className='user-name'>{answer.name}</UserInfoItem>
        </Link>
      </InfoContainer>
    </UserInfo>
  );
};

export default AnswerDetailProfile;
