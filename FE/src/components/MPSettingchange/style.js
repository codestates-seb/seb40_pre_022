import styled from "styled-components";

const MPSContainer = styled.div`
  display: block;
`;

const MPSImg = styled.div`
  margin: 10px;
  display: flex;
  align-items: center;

  .img {
    width: 150px;
    height: 150px;
    border-radius: 5px;
    margin-right: 8px;
    box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
      0 2px 8px hsla(0, 0%, 0%, 0.05);
  }
`;

const MPSName = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
  margin-top: 30px;
  font-size: 25px;
`;

const Postbutton = styled.button`
  margin-left: 30px;
  margin-right: 30px;
  background-color: white;
  border: none;
  cursor: pointer;
`;

export { MPSContainer, MPSImg, MPSName, Postbutton };
