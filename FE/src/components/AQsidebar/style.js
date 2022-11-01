import styled from "styled-components";

const SidebarContainer = styled.div`
  float: right;
  display: block;
  justify-content: center;
  width: 300px;
  padding-left: 50px;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const Yellowidget = styled.div`
  border: 1px solid;
  border-top: none;
  border-radius: 3px;
  border-color: hsl(47, 65%, 84%);
  background-color: hsl(47, 87%, 94%);
  position: relative;
  font-size: 13px;
  padding: 0;
  margin-bottom: 24px;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
`;


const YWListtitle = styled.li`
  padding: 12px 16px;
  margin: 0;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: hsl(47, 65%, 84%);
  background-color: hsl(47, 83%, 91%);
  font-size: 12px;
  font-weight: bold;
`;

const YWListitem = styled.li`
  padding: 0px 16px;
  margin-top: 12px;
  margin-bottom: 12px;
  font-size: 13px;
`;

const RelatedTags = styled.div`
  display: inline-block;
  margin-left: 0;
  margin-right: 0;
`;

const Tagstitle = styled.h2`
  display: block;
  font-size: 1.5em;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 10px;
`;

const Tagsitems = styled.h2`
  display: block;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 10px;
`;

export {
  SidebarContainer,
  Yellowidget,
  YWList,
  YWListitem,
  YWListtitle,
  RelatedTags,
  Tagstitle,
  Tagsitems,
};
