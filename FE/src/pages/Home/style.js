import styled from "styled-components";

const Container = styled.div`
  display: block;
  flex-direction: column;
  justify-content: center;
  flex: 1 1 auto;
  + div {
    float: none;
    padding-left: 30px;
    min-width: 298px;
  }
`;

export { Container };
