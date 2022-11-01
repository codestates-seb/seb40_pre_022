import styled from "styled-components";

const UserInfoItem = styled.span`
  &.user-name {
    color: hsl(206deg 100% 40%);
    margin-left: 8px;
    margin-bottom: 17.5px;
    cursor: pointer;
    font-size: 0.9em;
    &:hover {
      color: hsl(206deg 100% 52%);
    }
    @media screen and (max-width: 781px) {
      font-size: 0.8em;
    }
  }
  .img {
    width: 32px;
    height: 32px;
    border-radius: 3px;
    margin: 0 auto;
    cursor: pointer;
  }
`;

export { UserInfoItem };
