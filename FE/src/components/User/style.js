import styled from "styled-components";
import { flexRowBetween } from "../../styles";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25%, auto));
  margin-top: 50px;
`;

export const Item = styled.div`
  ${flexRowBetween}
  align-items: flex-start;
  width: 220px;
  margin: 0 auto 0 -10px;
  column-gap: 10px;
  img {
    width: 40px;
    border-radius: 5px;
    margin-left: auto;
  }
  ul {
    font-size: 0.8rem;
    .blue {
      color: hsl(206, 100%, 40%);
    }
  }
`;
