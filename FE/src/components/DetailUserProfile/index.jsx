import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserInfo, UserInfoText, InfoContainer } from "../DetailPost/style";
import { UserInfoItem } from "./style";
import { calculateTime } from "../../utils/calculateTime";

const DetailUserProfile = ({ questions, QcreatedAt }) => {
  const question = questions.member;

  return (
    <UserInfo>
      <UserInfoText>{calculateTime(QcreatedAt)}</UserInfoText>
      <InfoContainer>
        <Link to="/mypage">
          <UserInfoItem>
            <img src={question.image} className="img" />
          </UserInfoItem>
        </Link>
        <Link to="/mypage">
          {<UserInfoItem className="user-name">{question.name}</UserInfoItem>}
        </Link>
      </InfoContainer>
    </UserInfo>
  );
};

export default DetailUserProfile;
