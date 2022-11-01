import React from "react";
import Wrapper from "./style";

export const Tag = ({ deleteButton, name, onClick }) => {
  return (
    <Wrapper type='button'>
      <span>{name}</span>
      {deleteButton && onClick && <div onClick={() => onClick(name)}></div>}
    </Wrapper>
  );
};

export default Tag;
