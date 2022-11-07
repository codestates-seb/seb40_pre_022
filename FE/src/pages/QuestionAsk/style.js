import styled from "styled-components";

const AskContainer = styled.div`
  width: 100vw;
  margin-top: 5px;
`;

const AskTitleHeader = styled.header`
  display: flex;
  width: 1300px;
  margin: 0 auto;
`;

const AskTitleH1 = styled.h1`
  display: block;
  font-size: 2rem;
  padding: 40px 10px 40px 0px;
  margin-right: auto;
`;

const AskBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  column-gap: 20px;
  width: 1300px;
  margin: 0 auto;
`;

const AskForm = styled.form`
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
`;

const AskWrapper = styled.section`
  display: flex;
  flex-flow: column;
  row-gap: 10px;
  background-color: white;
  padding: 10px;
  box-shadow: grey 0px 0px 3px;
  border-radius: 3px;
`;

const TagsContainer = styled.div`
  padding: 20px;
`;

const TagTitle = styled.div`
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
`;

const TagsText = styled.div`
  font-size: 0.8rem;
  color: #525960;
  margin-bottom: 7px;
`;

const BtnBox = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
`;

export {
  AskContainer,
  AskForm,
  AskTitleHeader,
  AskTitleH1,
  AskBox,
  AskWrapper,
  TagsContainer,
  TagTitle,
  TagsText,
  BtnBox,
};
