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
                <YWListtitle key={list.title}>{list.title}</YWListtitle>
                {list.sentence.map((item) => (
                  <YWListitem key={item}>{item}</YWListitem>
                ))}
              </YWList>
            );
          })}
        </Yellowidget>
        <RelatedTags>
          <Tagstitle key='ReatedTags'>Reated Tags</Tagstitle>
          {TAGLIST.map((list, i) => (
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
