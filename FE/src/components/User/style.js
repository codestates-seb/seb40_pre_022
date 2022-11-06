import styled from "styled-components";

export const Container = styled.div`
  display: block;
  margin-top: 50px;
`;

export const Item = styled.div`
  overflow: hidden;
  display: flex;
  align-items: flex-start;

  padding-top: 25px;
  column-gap: 10px;

  img {
    width: 50px;
    margin-top: 2px;
    border-radius: 5px;
    margin-left: 30px;
    margin-right: 10px;
  }
  ul {
    font-size: 0.8rem;
    .blue {
      color: hsl(206, 100%, 40%);
    }
    .Name {
      font-size: 1.2em;
    }
  }
`;
