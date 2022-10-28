import { React } from "react";
import {
  Tabtitle,
  SidebarContainer,
  TabList,
  TabItem,
  ItemContainer,
} from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_ITEMS, SIDEBAR_SENTENCES } from "../../constants";

const Leftsidebar = () => {
  let { pathname } = useLocation();
  let path = pathname.split("/")[1];

  return (
    <>
      <SidebarContainer>
        <TabList>
          <TabItem className={pathname === "/" ? "active" : null}>
            <Link to='/' className='link'>
              <Tabtitle className='home'>Home</Tabtitle>
            </Link>
          </TabItem>
          <TabItem>
            <Tabtitle>PUBLIC</Tabtitle>
            <TabItem>
              <TabList>
                <TabItem className={path === "question" ? "active" : null}>
                  <Link to='/question'>
                    <ItemContainer>
                      <FontAwesomeIcon
                        icon={faEarthAmericas}
                        className='icon'
                      />
                      Questions
                    </ItemContainer>
                  </Link>
                </TabItem>
                {SIDEBAR_ITEMS.map((item) => (
                  <TabItem className='tab' key={item}>
                    {item}
                  </TabItem>
                ))}
              </TabList>
            </TabItem>
          </TabItem>
          {SIDEBAR_SENTENCES.map((item) => (
            <TabItem>
              <Tabtitle key={item.title}>{item.title}</Tabtitle>
              <TabList>
                <TabItem size='small' className='tab' key={item.sentence}>
                  {item.sentence}
                </TabItem>
              </TabList>
            </TabItem>
          ))}
        </TabList>
      </SidebarContainer>
    </>
  );
};

export default Leftsidebar;
