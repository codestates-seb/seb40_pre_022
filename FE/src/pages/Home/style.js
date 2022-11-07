import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  flex-direction: column;
  + div {
    float: none;
    padding-left: 30px;
    max-width: 298px;
  }
`;

export { Container };
