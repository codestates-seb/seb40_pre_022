import React, { useState, useCallback } from "react";

import { EMAIL_REGEX } from '../../constants/regex';

import Layout from '@components/Layout';
import TextInput from '@components/TextInput';
import { Button } from '@components/Button';

import { Wrapper, FormWrap } from './style';

const Recovery = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const handleChangeEmail = useCallback ((e)=> {
      if(EMAIL_REGEX.test(e.target.value)){
        setEmailError(false);
      }
      setEmail(e.target.value)
  }, [email])


  const handleSubmit = ((e)=>{
    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      if (!EMAIL_REGEX.test(email)) setEmailError(true);
      return;
    }
  })

  return (
    <Layout isLeftSidebar={false}>
      <Wrapper>
          <FormWrap>
            <form>
              <p>Forgot your account’s password or having trouble logging into your Team? Enter your email address and we’ll send you a recovery link.</p>
              <TextInput id='email' label='Email' errorMsg='이메일 형식을 맞춰주세요.' isError={emailError} value={email} onChange={handleChangeEmail} />
              <Button label='Send recovery email' type='submit' onClick={handleSubmit}>Send recovery email</Button>
            </form>
          </FormWrap>
      </Wrapper>
    </Layout>
  )
};

export default Recovery;
