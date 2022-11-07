import styled, { css } from "styled-components";
import { container } from "../../styles";
export const Container = styled.main`
  position: relative;
  ${container};
  ${(props) =>
    props.background &&
    css`
      ::after {
        content: "";
        position: absolute;
        height: 100px;
        width: 500px;
        background-image: url("../../../public/background.svg");
        background-repeat: no-repeat;
        background-position: top;
        background-size: contain;
        right: -85px;
      }
    `};
`;
