import React, { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import Layout from "@components/Layout";
import TextInput from "@components/TextInput";
import { Button } from "@components/Button";
import Modal from "@components/Modal";

import { EMAIL_REGEX } from "../../constants/regex";
import { userRecover } from "../../api/members";

import { Wrapper, FormWrap } from "./style";

const Recovery = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const { mutate, data } = useMutation(userRecover, {
    onSuccess: () => {
      openModal();
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleChangeEmail = useCallback(
    (e) => {
      if (EMAIL_REGEX.test(e.target.value)) {
        setEmailError(false);
      }
      setEmail(e.target.value);
    },
    [email]
  );

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email)) {
      if (!EMAIL_REGEX.test(email)) setEmailError(true);
      return;
    }
    mutate({
      email: email,
    });
  };

  return (
    <Layout isLeftSidebar={false}>
      <Modal open={modalOpen} close={closeModal} header={data?.data.title}>
        {data?.data.body}
      </Modal>
      <Wrapper>
        <FormWrap>
          <form>
            <p>
              Forgot your account’s password or having trouble logging into your
              Team? Enter your email address and we’ll send you a recovery link.
            </p>
            <TextInput
              id="email"
              label="Email"
              errorMsg="이메일 형식을 맞춰주세요."
              isError={emailError}
              value={email}
              onChange={handleChangeEmail}
            />
            <Button
              label="Send recovery email"
              type="submit"
              onClick={handleSubmit}
            >
              Send recovery email
            </Button>
          </form>
        </FormWrap>
      </Wrapper>
    </Layout>
  );
};

export default Recovery;
