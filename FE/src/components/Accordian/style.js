import styled from "styled-components";

const AskRight = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  width: 314px;
  height: 100%;
  margin-left: 24px;
  cursor: pointer;
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
    padding-bottom: 10px;
  }
`;

const Ul = styled.ul`
  list-style-type: disc;

  li {
    font-weight: normal;
    padding: 3px 0;
    display: ${(props) => props.display || "none"};
  }
`;

export { AskRight, RoleContainer, Title, Content, Ol, Ul };
