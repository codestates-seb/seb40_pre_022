import React from "react";
import {
  ErrorContainer,
  ErrorItemContainer,
  ErrorMessage,
  ImgContainer,
  MessageContainer,
} from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <ErrorContainer>
      <ErrorItemContainer>
        <ImgContainer>
          <FontAwesomeIcon icon={faTriangleExclamation} className='icon' />
        </ImgContainer>
        <MessageContainer>
          <ErrorMessage className='title'>Page not found</ErrorMessage>
          <ErrorMessage className='subtitle'>
            We're sorry, we couldn't find the page you requested.
          </ErrorMessage>
          <ErrorMessage>
            Try <Link to='/'>searching for similar questions</Link>
          </ErrorMessage>
          <ErrorMessage>
            Try <Link to='/members/login'>Login</Link> or{" "}
            <Link to='/join'>Sign up</Link>
          </ErrorMessage>
          <ErrorMessage>
            Browse our <Link to='/questions'>recent questions</Link>
          </ErrorMessage>
          <ErrorMessage>
            Browse our <Link to='/mypage'>My page</Link>
          </ErrorMessage>
        </MessageContainer>
      </ErrorItemContainer>
    </ErrorContainer>
  );
};

export default NotFound;
