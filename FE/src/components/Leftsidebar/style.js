import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 164px;
  display: flex;
  justify-content: center;
  padding: 24px;
`;

const Home = styled.div`
  text-align: left;
  color: hsl(210deg 8% 35%);
  font-size: 1em;
  /* margin: 4px;
  margin-left: 8px; */
`;

const Tabtitle = styled.div`
  text-align: left;
  color: hsl(210deg 8% 45%);
  font-weight: 500;
  font-size: 0.8em;
  margin-top: 16px;
`;

const TabList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: ${(props) => props.padding || "15px"};
`;

const TabItem = styled.li`
  list-style: none;
  color: hsl(210deg 8% 35%);
  text-align: left;
  font-weight: 500;
  font-size: 0.95em;
  font-size: ${(props) => props.size === "small" && "0.9em"};
  margin-left: 2px;
  &:hover {
    color: hsl(210deg 8% 15%);
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ImgContainer = styled.div`
  /* margin: 5px; */
`;

export {
  SidebarContainer,
  TabItem,
  Tabtitle,
  TabList,
  Home,
  ItemContainer,
  ImgContainer,
};
