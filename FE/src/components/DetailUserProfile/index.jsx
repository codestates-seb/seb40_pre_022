import React from "react";
import { Link } from "react-router-dom";
import { UserInfo, UserInfoText, InfoContainer } from "../DetailPost/style";
import { UserInfoItem } from "./style";
import { calculateTime } from "../../utils/calculateTime";
import { data } from "../../db/data.json";

const DetailUserProfile = ({ answerer, createdAt, profile }) => {
  const questionData = data[0];
  const question = {
    username: questionData.user.displayName,
    createdAt: questionData.createdAt,
  };
  return (
    <UserInfo className={answerer ? "answerer" : null}>
      <UserInfoText>
        {createdAt || calculateTime(question.createdAt)}
      </UserInfoText>
      <InfoContainer>
        <Link to='/mypage'>
          <UserInfoItem>
            <img
              src={answerer ? profile : "/public/initialProfile.png"}
              className='img'
            />
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
