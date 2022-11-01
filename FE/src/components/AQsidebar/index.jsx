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

const AQRightsidebar = () => {
  const YellowList = [
    {
      title: "The Overflow Blog",
      sentence: [
        "CEO update: Breaking down barriers to unlock innovation",
        "Introducing the Ask Wizard: Your guide to crafting high-quality questions",
      ],
    },
    {
      title: "Featured on Meta",
      sentence: [
        "The 2022 Community-a-thon has begun!",
        "Mobile app infrastructure being decommissioned",
        "Staging Ground Workflow: Canned Comments",
        "The Ask Wizard (2022) has graduated",
      ],
    },
    {
      title: "Hot Meta Posts",
      sentence: [
        "Announcing the Content Discovery initiative",
        "Secrets in a post?",
      ],
    },
  ];

  return (
    <>
      <SidebarContainer>
        <Yellowidget>
          {[YellowList].map((list) => {
            return (
              <YWList>
                {list.map((content, i) => {
                  return (
                    <>
                      <YWListtitle key={i}> {content.title} </YWListtitle>
                      <>
                        {[content.sentence].map((item, i) => {
                          return <YWListitem>{item}</YWListitem>;
                        })}
                      </>
                    </>
                  );
                })}
              </YWList>
            );
          })}
        </Yellowidget>
        <>
          <RelatedTags>
            <Tagstitle>Reated Tags</Tagstitle>
            <Tagsitems>
              <Button primary='false' label='tags' Tagged='Tagged' />
            </Tagsitems>
            <Tagsitems>
              <Button primary='false' label='tags' Tagged='Tagged' />
            </Tagsitems>
            <Tagsitems>
              <Button primary='false' label='tags' Tagged='Tagged' />
            </Tagsitems>
          </RelatedTags>
        </>
      </SidebarContainer>
    </>
  );
};

export default AQRightsidebar;
