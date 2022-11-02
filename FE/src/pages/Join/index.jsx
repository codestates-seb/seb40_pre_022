import React from "react";
import { Link } from 'react-router-dom';

import Layout from '@components/Layout';
import TextInput from '@components/TextInput';
import Sns from "@components/Sns";
import JoinInfo from "@components/JoinInfo";
import { Button } from '@components/Button';

import { Wrapper, InnerBox, Title, FormWrap, Info } from './style';

const Join = () => {
  return (
    <Layout isAside={false}>
       <Wrapper>
        <InnerBox>
          <JoinInfo />
        </InnerBox>
        <InnerBox>
          <Title>Create your Stack Overflow account. It’s free and only takes a minute.</Title>
          <Sns value='Sign up'/>
          <FormWrap>
            <form>
              <TextInput id='name' label='Display name' />
              <TextInput id='email' label='Email' />
              <TextInput id='pw' label='Password' />
              <p>Passwords must contain at least eight characters, including at least 1 letter and 1 number.</p>
              <Button label='Sign up' type='submit'>Sign up</Button>
            </form>
          </FormWrap>
          <Info>
            <li>Already have an account <Link>Log in</Link></li>
            <li>Are you an employer? <Link>Sign up on Talent</Link></li>
          </Info>
        </InnerBox>
      </Wrapper>
    </Layout>
  )
};

export default Join;



