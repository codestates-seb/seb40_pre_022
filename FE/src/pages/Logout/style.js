import styled from "styled-components";
import { flexRowCenter } from "../../styles/index";

export const Wrapper = styled.div`
  ${flexRowCenter}
  margin: 50px auto;
`;

export const InnerBox = styled.div`
  margin: 50px;
  max-width: 320px;
`;

export const Title = styled.h3`
  font-size: 1.4rem;
  position: relative;
  width: 380px;
  left: 50%;
  text-align: center;
  transform: translateX(-50%);
`;

export const FormWrap = styled.div`
  width: 100%;
  padding: 24px;
  margin: 20px 0;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 10px 24px hsla(0, 0%, 0%, 0.05),
    0 20px 48px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.1);
  ul li {
    line-height: 26px;
    a {
      font-size: 0.9rem;
      font-weight: 600;
      color: hsl(206, 100%, 40%);
    }
  }
  p {
    position: inherit;
    margin-top: 30px;
    color: var(--gray);
    font-size: 0.8rem;
  }
`;

export const BtnWrap = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
  margin-top: 15px;
  padding-top: 20px;
  button {
    font-size: 0.85rem !important;
    :last-child {
      border: 0 none;
      color: hsl(206, 100%, 40%);
    }
  }
`;
