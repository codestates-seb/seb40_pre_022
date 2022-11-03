import React from "react";
import { Link } from "react-router-dom";
import { UserInfo, UserInfoText, InfoContainer } from "../DetailPost/style";
import { UserInfoItem } from "./style";
import { calculateTime } from "../../utils/calculateTime";
import { useRecoilValue } from "recoil";
import { DetailQData } from "../../store/DetailQData";

const DetailUserProfile = ({ answerer, createdAt, profile }) => {
  const questionData = useRecoilValue(DetailQData);
  const question = {
    username: questionData.user.displayName,
    createdAt: questionData.createdAt,
    profile: questionData.user.image,
  };
  return (
    <UserInfo className={answerer ? "answerer" : null}>
      <UserInfoText>
        {createdAt || calculateTime(question.createdAt)}
      </UserInfoText>
      <InfoContainer>
        <Link to='/mypage'>
          <UserInfoItem>
            <img src={answerer ? profile : question.profile} className='img' />
          </UserInfoItem>
        </Link>
        <Link to='/mypage'>
          {
            <UserInfoItem className='user-name'>
              {answerer || question.username}
            </UserInfoItem>
          }
        </Link>
      </InfoContainer>
    </UserInfo>
  );
};

export default DetailUserProfile;
