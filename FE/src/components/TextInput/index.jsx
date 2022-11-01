import React from "react";
import { Link } from 'react-router-dom';

import { InputWrap } from "./style";

const TextInput = ({ id, label, isError, errorMsg, link=false, ...rest }) => {
  return (
    <InputWrap>
        <label htmlFor={id}>{label}</label>
        <input id={id} type='text' {...rest} />
         <p>{errorMsg}</p>
        {link && <Link>Forgot password?</Link>}
    </InputWrap>
  );
};

export default TextInput
