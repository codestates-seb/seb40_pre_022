import React from "react";
import { Link } from 'react-router-dom';

import { LOGOUT_ICONS } from '../../constants/user';

import Layout from '@components/Layout';
import { Button } from '@components/Button';

import { Wrapper, InnerBox, Title, FormWrap, BtnWrap } from './style';

const Logout = () => {
  return (
    <Layout isAside={false}>
       <Wrapper>
        <InnerBox>
          <Title>Clicking “Log out” will log you out of the following domains on this device:</Title>
          <FormWrap>
            <ul>
              {LOGOUT_ICONS.map((ico, idx)=>{
               const { contents, href } = ico;
                return(
                <li key={idx}><a href={href} target="_blank">{contents}</a></li>
                )
              })}
            </ul>
            <BtnWrap>
              <Button label='Log out'>Log out</Button>
              <Button primary='Linkbutton' label='Cancel'>Cancel</Button>
            </BtnWrap>
            <p>If you’re on a shared computer, remember to log out of your Open ID provider (Facebook, Google, Stack Exchange, etc.) as well.</p>
          </FormWrap>
        </InnerBox>
      </Wrapper>
    </Layout>
  )
};

export default Logout;



