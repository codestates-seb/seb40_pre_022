import React from "react";
import {
  Home,
  Tabtitle,
  SidebarContainer,
  TabList,
  TabItem,
  ItemContainer,
  ImgContainer,
} from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Leftsidebar = () => {
  const itemList = ["Tags", "Users", "Companies"];
  const sentenceList = [
    { title: "COLLECTIVES", sentence: "Explore Collectives" },
    { title: "TEAMS", sentence: "Create free Team" },
  ];

  return (
    <>
      <SidebarContainer>
        <TabList>
          <TabItem>
            <Link to="/">
              <Home>Home</Home>
            </Link>
          </TabItem>
          <TabItem>
            <Tabtitle>PUBLIC</Tabtitle>
            <TabList padding="0px">
              <Link to="/question">
                <TabItem>
                  <ItemContainer>
                    <FontAwesomeIcon icon={faEarthAmericas} />
                    Questions
                  </ItemContainer>
                </TabItem>
              </Link>
            </TabList>
            <TabList>
              {itemList.map((item) => (
                <TabItem>{item}</TabItem>
              ))}
            </TabList>
          </TabItem>
          {sentenceList.map((el) => (
            <TabItem>
              <Tabtitle>{el.title}</Tabtitle>
              <TabList>
                <TabItem size="small">{el.sentence}</TabItem>
              </TabList>
            </TabItem>
          ))}
        </TabList>
      </SidebarContainer>
    </>
  );
};

export default Leftsidebar;
