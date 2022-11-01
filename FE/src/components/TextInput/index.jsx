import React from "react";
import { InputWrap } from "./style";

const TextInput = ({ value, ...rest }) => {
  return (
    <InputWrap>
      <label>
        <input type='text' value={value} {...rest} />
      </label>
    </InputWrap>
  );
};

export default index;
