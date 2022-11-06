import styled from "styled-components";
import { flexRowBetween } from "../../../../styles";

export const MainbarContainer = styled.div`
  padding-top: 24px;
`;

export const BtnList = styled.div`
  margin: 40px 0 20px;
  display: flex;
  justify-content: flex-end;
  button.Linkbutton {
    border-radius: 0;
    margin-left: -1px;
    :first-child {
      border-top-left-radius: 5px;
      border-bottom-left-radius: 5px;
    }
    :last-child {
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
`;

export const Hearder = styled.div`
  ${flexRowBetween}
  padding-left: 30px;
  h1 {
    font-size: 2rem;
  }
`;
