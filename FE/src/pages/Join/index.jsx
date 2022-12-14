import React, { useState, useCallback, isValidElement } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import Layout from "@components/Layout";
import TextInput from "@components/TextInput";
import Sns from "@components/Sns";
import JoinInfo from "@components/JoinInfo";
import { Button } from "@components/Button";

import { userJoin } from "../../api/members";
import { PW_REGEX, EMAIL_REGEX } from "../../constants/regex";

import { Wrapper, InnerBox, Title, FormWrap, Info } from "./style";

const Join = () => {
  const auth = localStorage.getItem("isLogin");
  if (auth) return <Navigate to="/" />;

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [pwError, setPwError] = useState(false);

  const { mutate } = useMutation(userJoin, {
    retry: 0,
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      navigate("/members/login");
    },
  });

  const handleSignUp = (e) => {
    e.preventDefault();

    if (name === "" || !EMAIL_REGEX.test(email) || !PW_REGEX.test(pw)) {
      if (name === "") setNameError(true);
      if (!EMAIL_REGEX.test(email)) setEmailError(true);
      if (!PW_REGEX.test(pw)) setPwError(true);
      return;
    }
    mutate({
      name: name,
      email: email,
      password: pw,
    });
  };

  const handleChangeSign = useCallback(
    (e) => {
      const id = e.target.id;
      if (id === "name") {
        setNameError(false);
        setName(e.target.value);
      }
      if (id === "email") {
        setEmailError(false);
        setEmail(e.target.value);
      }
      if (id === "pw") {
        setPwError(false);
        setPw(e.target.value);
      }
    },
    [name, email, pw]
  );

  return (
    <Layout isLeftSidebar={false}>
      <Wrapper>
        <InnerBox>
          <JoinInfo />
        </InnerBox>
        <InnerBox>
          <Title>
            Create your Stack Overflow account. It’s free and only takes a
            minute.
          </Title>
          <Sns value="Sign up" />
          <FormWrap>
            <form>
              <TextInput
                id="name"
                label="Display name"
                errorMsg="이름을 입력해 주세요."
                isError={nameError}
                value={name}
                onChange={handleChangeSign}
              />
              <TextInput
                id="email"
                label="Email"
                errorMsg="이메일 형식을 맞춰주세요."
                isError={emailError}
                value={email}
                onChange={handleChangeSign}
              />
              <TextInput
                id="pw"
                type="password"
                label="Password"
                errorMsg="최소 8 자, 최소 하나의 문자,하나의 숫자 및 하나의 특수 문자"
                isError={pwError}
                value={pw}
                onChange={handleChangeSign}
              />
              <p>
                Passwords must contain at least eight characters, including at
                least 1 letter and 1 number.
              </p>
              <Button label="Sign up" type="submit" onClick={handleSignUp}>
                Sign up
              </Button>
            </form>
          </FormWrap>
          <Info>
            <li>
              Already have an account <Link>Log in</Link>
            </li>
            <li>
              Are you an employer? <Link>Sign up on Talent</Link>
            </li>
          </Info>
        </InnerBox>
      </Wrapper>
    </Layout>
  );
};

export default Join;
