import React from "react";
import { Link } from "react-router-dom";
import { UserInfo, UserInfoText, InfoContainer } from "../DetailPost/style";
import { UserInfoItem } from "./style";

const DetailUserProfile = () => {
  return (
    <UserInfo>
      <UserInfoText>asked 3 hours ago</UserInfoText>
      <InfoContainer>
        <Link to='/mypage'>
          <UserInfoItem>
            <img src={ "../../../public/initialProfile.png"} className='img' />
          </UserInfoItem>
        </Link>
        <Link to='/mypage'>
          <UserInfoItem className='user-name'>Dahee Hong</UserInfoItem>
        </Link>
      </InfoContainer>
    </UserInfo>
  );
};

export default DetailUserProfile;
