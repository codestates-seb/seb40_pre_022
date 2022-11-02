import styled from "styled-components";

const SidebarContainer = styled.aside`
  width: 164px;
  height: 100vh;
  padding-top: 24px;
  position: sticky;
  top: 0;
  border-right: 1px solid hsl(210deg 8% 90%);
  @media ${(props) => props.theme.mobile} {
    position: fixed;
    height: auto;
    top: 51px;
    border-bottom: 1px solid hsl(210deg 8% 90%);
    background: #fff;
    z-index: 1;
    display: none;
    &.active {
      display: block;
    }
  }
`;

const Tabtitle = styled.div`
  text-align: left;
  color: hsl(210deg 8% 45%);
  font-weight: 500;
  font-size: 0.8em;
  margin: 7px 7px;
  &.home {
    text-align: left;
    color: hsl(210deg 8% 35%);
    font-size: 1em;
    margin-left: 7px;
  }
`;

const TabList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: ${(props) => props.padding || "0"};
  .active {
    font-weight: bold;
    background-color: hsl(210deg 8% 95%);
    color: hsl(210deg 8% 5%);
    border-right: 3px solid hsl(27deg 90% 55%);
  }
`;

const TabItem = styled.li`
  list-style: none;
  color: hsl(210deg 8% 35%);
  text-align: left;
  font-weight: 500;
  font-size: 0.95em;

  margin-top: 5px;
  width: 164px;
  cursor: pointer;

  &:hover {
    color: hsl(210deg 8% 15%);
  }
  &.size {
    margin-left: 20px;
    font-size: 0.9em;
  }
  .icon {
    position: absolute;
    left: -18px;
  }
  .active {
    font-weight: bold;
    background-color: hsl(210deg 8% 95%);
    color: hsl(210deg 8% 5%);
    border-right: 3px solid hsl(27deg 90% 55%);
  }
  .link {
    line-height: 20px;
  }
  .tab {
    height: 34px;
    width: 164px;
    padding-top: 8px;
  }
`;

const TabItemText = styled.div`
  margin-left: 30px;
  display: flex;
  align-items: center;
  height: 100%;
`;

const ItemContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 10px;
  margin-left: 30px;
  margin-top: 10.285px;
`;

export {
  SidebarContainer,
  TabItem,
  Tabtitle,
  TabList,
  TabItemText,
  ItemContainer,
};
