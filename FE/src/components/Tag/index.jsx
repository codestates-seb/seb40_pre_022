import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Wrapper from "./style";

export const Tag = ({ deleteButton, name, onClick }) => {
  return (
    <Wrapper type="button">
      <span>{name}</span>
      {deleteButton && onClick && (
        <div onClick={() => onClick(name)}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      )}
    </Wrapper>
  );
};

export default Tag;
