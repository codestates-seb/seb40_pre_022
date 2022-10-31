import styled from "styled-components";

const AskContainer = styled.section`
  width: 100vw;
  height: 100vh;
`;

const AskTitleHeader = styled.header`
  display: flex;
  background-image: url("../../../public/background.svg");
  background-repeat: no-repeat;
  background-position: right;
  background-color: #f8f9f9;
  align-items: center;
  width: 100%;
`;

const AskTitleH1 = styled.h1`
  display: block;
  font-size: 2rem;
  padding: 40px 10px 40px 30px;
  margin-right: auto;
`;

const AskBox = styled.section`
  display: flex;
  justify-content: center;
  column-gap: 20px;
  background-color: #f8f9f9;
`;

export { AskContainer, AskTitleHeader, AskTitleH1, AskBox };
