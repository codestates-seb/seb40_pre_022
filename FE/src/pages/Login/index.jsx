import React, { useState, useEffect, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from 'react-router';
import { Navigate, Link } from 'react-router-dom';

import { userLogin } from '../../api/members';

import { EMAIL_REGEX, PW_REGEX } from '../../constants/regex';

import Layout from '@components/Layout';
import TextInput from '@components/TextInput';
import Sns from "@components/Sns";
import { Button } from '@components/Button';

import { Wrapper, FormWrap, Info } from './style';

const Login = () => {
  const auth = localStorage.getItem('isLogin');
  if( auth ) return (<Navigate to='/' />)

  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [emailError, setEmailError] = useState(false);
  const [pwError, setPwError] = useState(false);

  const [isLogin, setIsLogin] = useState(false);

  const navigate = useNavigate();

  const { mutate, data } = useMutation(userLogin, {
    onSuccess: () => {
      setIsLogin(true);
    },
    onError: (error) => {
      alert(error.message)
    }
  });

  useEffect(()=>{
    if(isLogin){     
      localStorage.setItem("isLogin", true);
      localStorage.setItem('token', JSON.stringify(data.headers.authorization))
      localStorage.setItem('refreshToken', JSON.stringify(data.headers.refreshtoken))
      navigate('/');
    }
  },[isLogin])

  const handleChangeEmail = useCallback ((e)=> {
      if(EMAIL_REGEX.test(e.target.value)){
        setEmailError(false);
      }
      setEmail(e.target.value)
  }, [email])

  const handleChangePw = useCallback((e)=>{
      if(PW_REGEX.test(e.target.value)){
        setPwError(false);
      }
      setPw(e.target.value)
  },[pw])

  const handleSubmit = ((e)=>{
    e.preventDefault();
    if (!EMAIL_REGEX.test(email) || !PW_REGEX.test(pw)) {
      if (!EMAIL_REGEX.test(email)) setEmailError(true);
      if (!PW_REGEX.test(pw)) setPwError(true);
      return;
    }
    mutate({
      "username" : email,
      "password" : pw
    })
  })

  return (
    <Layout isLeftSidebar={false}>
      <Wrapper>
          <Link className='logo' to='/'><span>stack overflow</span></Link>
          <Sns />
          <FormWrap>
            <form>
              <TextInput id='email' label='Email' errorMsg='이메일 형식을 맞춰주세요.' isError={emailError} value={email} onChange={handleChangeEmail} />
              <TextInput id='pw' type='password' label='Password' errorMsg='최소 8 자, 최소 하나의 문자,하나의 숫자 및 하나의 특수 문자' isError={pwError} link value={pw} onChange={handleChangePw}/>
              <Button label='Log in' type='submit' onClick={handleSubmit}>Login</Button>
            </form>
          </FormWrap>
          <Info>
            <li>Don't have an account? <Link to='/join'>Sign up</Link></li>
            <li>Are you an employer? <Link>Sign up on Talent</Link></li>
          </Info>
      </Wrapper>
    </Layout>
  )
};

export default Login;
