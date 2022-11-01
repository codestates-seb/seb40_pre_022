import React from "react";
import { Link } from 'react-router-dom';

import Layout from '@components/Layout';
import TextInput from '@components/TextInput';
import Sns from "@components/Sns";
import { Button } from '@components/Button';

import { Wrapper, FormWrap } from './style';

const Login = () => {
  return (
    <Layout isAside={false}>
      <Wrapper>
          <Link className='logo' to='/'><span>stack overflow</span></Link>
          <Sns />
          <FormWrap>
            <form>
              <TextInput id='email' label='Email' />
              <Button label='Log in' type='submit'>Login</Button>
            </form>
          </FormWrap>
      </Wrapper>
    </Layout>
  )
};

export default Login;
