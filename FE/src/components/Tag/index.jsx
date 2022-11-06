import React from "react";
import Wrapper from "./style";

export const Tag = ({ name }) => {
  return (
    <Wrapper type='button'>
      <span>{name}</span>
    </Wrapper>
  );
};

export default Tag;
