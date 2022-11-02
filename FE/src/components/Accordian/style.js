import styled from "styled-components";

const AskRightAside = styled.aside`
  display: flex;
  flex-flow: column nowrap;
  row-gap: 30px;
  max-height: 80vh;
`;

const AskStep = styled.div`
  display: flex;
  flex-flow: column wrap;
  background-color: white;
  box-shadow: grey 0px 0px 3px;
  border-radius: 3px;
`;

const RoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  width: 314px;
  height: 100%;
`;

const Title = styled.div`
  padding: 12px 15px;
  border-bottom: 1px solid #f2f2f2;
  background-color: #f7faf9;
`;

const Content = styled.div`
  padding: 12px 15px;
  font-size: 13px;
  background-color: white;
`;

const Ol = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;

  .li-content {
    font-weight: bold;
    padding: 10px 0;
  }

  .li-title-logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid black;
    padding-bottom: 15px;
    cursor: pointer;
  }
`;

const Ul = styled.ul`
  list-style-type: disc;

  li {
    font-weight: normal;
    padding: 15px 0;
    display: ${(props) => props.display || "none"};
  }
`;

export { AskRightAside, AskStep, RoleContainer, Title, Content, Ol, Ul };
