import React from "react";
import {
  SidebarContainer,
  Yellowidget,
  YWList,
  YWListtitle,
  YWListitem,
  RelatedTags,
  Tagstitle,
  Tagsitems,
} from "./style";
import { Button } from "../Button";
import { YellowList, tagList } from "../../constants/AQSideBar";

const AQRightsidebar = () => {
  return (
    <>
      <SidebarContainer>
        <Yellowidget>
          {YellowList.map((list, i) => {
            return (
              <YWList key={i}>
                <YWListtitle> {list.title} </YWListtitle>
                {list.sentence.map((item, i) => {
                  return <YWListitem key={i}>{item}</YWListitem>;
                })}
              </YWList>
            );
          })}
        </Yellowidget>
        <RelatedTags>
          <Tagstitle>Reated Tags</Tagstitle>
          {tagList.map((list) => (
            <Tagsitems>
              <Button primary='Linkbutton' label={list} Tagged='Tagged' />
            </Tagsitems>
          ))}
        </RelatedTags>
      </SidebarContainer>
    </>
  );
};

export default AQRightsidebar;
