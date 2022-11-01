import React from "react";
import { Link } from 'react-router-dom';

import Layout from '@components/Layout';
import TextInput from '@components/TextInput';
import Sns from "@components/Sns";
import { Button } from '@components/Button';

import { Wrapper, FormWrap, Info } from './style';

const Login = () => {
  return (
    <Layout isAside={false}>
      <Wrapper>
          <Link className='logo' to='/'><span>stack overflow</span></Link>
          <Sns />
          <FormWrap>
            <form>
              <TextInput id='email' label='Email' />
              <TextInput id='pw' label='Password' link />
              <Button label='Log in' type='submit'>Login</Button>
            </form>
          </FormWrap>
          <Info>
            <li>Don't have an account? <Link>Sign up</Link></li>
            <li>Are you an employer? <Link>Sign up on Talent</Link></li>
          </Info>
      </Wrapper>
    </Layout>
  )
};

export default Login;
