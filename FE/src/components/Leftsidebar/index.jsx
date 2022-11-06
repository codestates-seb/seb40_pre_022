import React from "react";
import { useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useMutation } from '@tanstack/react-query';

import { SIDEBAR_ITEMS, SIDEBAR_SENTENCES } from "../../constants";
import { asideState } from "../../store/user";
import { userLogout } from "../../api/members";

import { Button } from "../Button";


import {
  Tabtitle,
  SidebarContainer,
  TabList,
  TabItem,
  ItemContainer,
  TabItemText,
} from "./style";

const Leftsidebar = ({ isLeftSidebar }) => {
  const auth = localStorage.getItem('isLogin');
  
  let { pathname } = useLocation();
  let path = pathname.split("/")[1];
  if (window.location.pathname === "/questions/ask") return null;

  const isAside = useRecoilValue(asideState);

  const handleLogout = ()=> {
    mutate();
  }

  const { mutate } = useMutation(userLogout, {
    onSuccess: () => {
      localStorage.clear();
      window.location.replace('/')
    },
    onError: (error) => {
      alert(error.message)
    }
  });

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
                    path === "users" && item.name === "Users"
                      ? "tab active"
                      : "tab"
                  }
                  key={item.name}>
                  <TabItemText><Link to='/users'>{item.name}</Link></TabItemText>
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
          {auth && <Button className='logout' label='로그아웃' primary='Linkbutton' onClick={handleLogout} />}
        </TabList>
      </SidebarContainer>
    </>
  );
};

export default Leftsidebar;
