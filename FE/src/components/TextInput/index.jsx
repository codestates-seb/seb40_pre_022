import React from "react";
import { InputWrap } from "./style";

const TextInput = ({ id, label, ...rest }) => {
  return (
    <InputWrap>
        <label htmlFor={id}>{label}</label>
        <input id={id} type='text' {...rest} />
    </InputWrap>
  );
};

export default TextInput
