import React from "react";
import { useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

import { SIDEBAR_ITEMS, SIDEBAR_SENTENCES } from "../../constants";
import { asideState } from "../../store/user";

import {
  Tabtitle,
  SidebarContainer,
  TabList,
  TabItem,
  ItemContainer,
  TabItemText,
} from "./style";

const Leftsidebar = ({ isLeftSidebar }) => {
  let { pathname } = useLocation();
  let path = pathname.split("/")[1];
  if (window.location.pathname === "/questions/ask") return null;

  const isAside = useRecoilValue(asideState);

  return (
    <>
      <SidebarContainer
        isShow={isLeftSidebar}
        className={isAside ? "active" : ""}>
        <TabList>
          <TabItem className={pathname === "/" ? "active" : null}>
            <Link to='/' className='link'>
              <Tabtitle className='home'>Home</Tabtitle>
            </Link>
          </TabItem>
          <TabItem>
            <Tabtitle>PUBLIC</Tabtitle>
            <TabList>
              <TabItem className={path === "questions" ? "active" : null}>
                <Link to='/questions'>
                  <ItemContainer>
                    <FontAwesomeIcon icon={faEarthAmericas} className='icon' />
                    Questions
                  </ItemContainer>
                </Link>
              </TabItem>
              {SIDEBAR_ITEMS.map((item) => (
                <TabItem
                  className={
                    path === "mypage" && item === "Users" ? "tab active" : "tab"
                  }
                  key={item}>
                  <TabItemText>{item}</TabItemText>
                </TabItem>
              ))}
            </TabList>
          </TabItem>
          {SIDEBAR_SENTENCES.map((item) => (
            <TabItem key={item.title}>
              <Tabtitle>{item.title}</Tabtitle>
              <TabList>
                <TabItem className='tab size'>{item.sentence}</TabItem>
              </TabList>
            </TabItem>
          ))}
        </TabList>
      </SidebarContainer>
    </>
  );
};

export default Leftsidebar;
