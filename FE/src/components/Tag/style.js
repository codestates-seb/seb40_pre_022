import styled from "styled-components";

const Wrapper = styled.button`
  display: flex;
  margin: 2px;
  padding: 4.8px 6px;
  border: none;
  color: #39739d;
  background-color: #e1ecf4;
  border-radius: 3px;
  font-size: 12px;
  cursor: auto;

  span {
    white-space: nowrap;
  }

  div {
    display: flex;
    align-items: center;
    margin-left: 5px;
  }

  svg {
    font-size: 15px;
    color: rgb(57, 115, 157);
    cursor: pointer;

    &:hover {
      border-radius: 3px;
      background-color: rgb(57, 115, 157);
      color: white;
    }
  }
`;

export default Wrapper;
