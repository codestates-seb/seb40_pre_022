import styled from "styled-components";
import { flexRowBetween } from "../../../../styles";

export const MainbarContainer = styled.div`
  padding-top: 24px;
`;

export const Hearder = styled.div`
  ${flexRowBetween}
  padding-left: 30px;
  h1 {
    font-size: 2rem;
  }
`;
