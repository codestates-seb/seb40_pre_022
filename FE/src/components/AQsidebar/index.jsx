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
import { YELLOWLIST, TAGLIST } from "../../constants/AQSideBar";

const AQRightsidebar = () => {
  return (
    <>
      <SidebarContainer>
        <Yellowidget>
          {YELLOWLIST.map((list, i) => {
            return (
              <YWList key={i}>
                <YWListtitle>{list.title}</YWListtitle>
                {list.sentence.map((item, i) => (
                  <YWListitem key={i}>{item}</YWListitem>
                ))}
              </YWList>
            );
          })}
        </Yellowidget>
        <RelatedTags>
          <Tagstitle>Reated Tags</Tagstitle>
          {TAGLIST.map((list, i) => (
            <Tagsitems key={i}>
              <Button primary='Linkbutton' label={list} Tagged='Tagged' />
            </Tagsitems>
          ))}
        </RelatedTags>
      </SidebarContainer>
    </>
  );
};

export default AQRightsidebar;
