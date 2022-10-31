import React from "react";
import initialProfile from "../../../public/initialProfile.png";
import { Link } from "react-router-dom";
import { UserInfo, UserInfoText, InfoContainer } from "../DetailPost/style";
import { UserInfoItem } from "./style";

const DetailUserProfile = ({ answerer }) => {
  const questioner = "hongdahee";
  return (
    <UserInfo>
      <UserInfoText>asked 3 hours ago</UserInfoText>
      <InfoContainer>
        <Link to='/mypage'>
          <UserInfoItem>
            <img src={initialProfile} className='img' />
          </UserInfoItem>
        </Link>
        <Link to='/mypage'>
          {
            <UserInfoItem className='user-name'>
              {answerer || questioner}
            </UserInfoItem>
          }
        </Link>
      </InfoContainer>
    </UserInfo>
  );
};

export default DetailUserProfile;
