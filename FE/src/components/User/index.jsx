import React from "react";
import { Container, Item } from "./style";


const User = () => {
  return (
    <Container>
      <Item>
        <img src='/initialProfile.png'/>
        <ul>
          <li className="blue">caTS</li>
          <li>Dallas, Texas</li>
          <li>1,833</li>
          <li className="blue">typescript, javascript, reactjs</li>
        </ul>
      </Item>
    </Container>
  );
};

export default User;
