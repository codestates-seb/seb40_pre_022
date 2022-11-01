import styled from "styled-components";

const QuestionContainer = styled.div`
  margin-left: -24px;
  border-top: 1px solid hsl(210, 8%, 85%);
  padding: 16px;
  padding-right: 0px;
  display: flex;
  position: relative;
  max-width: 751px;
`;

const Questioncontent = styled.div`
  display: block;
`;

const Questiontitle = styled.div`
  font-size: 1.17em;
  margin-top: -2px;
  margin-bottom: 5px;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
  color: hsl(206, 100%, 40%); ;
`;

const Questionbody = styled.div`
  margin-top: -2px;
  margin-bottom: 8px;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-word !important;
  overflow-wrap: break-word !important;
  hyphens: auto !important;
`;

const Questionuser = styled.div``;

const Questionsummary = styled.div`
  gap: 6px;
  margin-right: 16px;
  margin-bottom: 4px;
  width: 108px;
  display: flex;
  flex-wrap: wrap;
  font-size: 13px;
  flex-direction: column;
  flex-shrink: 0;
  align-items: flex-end;
`;

const Questionfooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Questiontags = styled.div`
  margin-right: 4px;
`;

export {
  QuestionContainer,
  Questioncontent,
  Questiontitle,
  Questionbody,
  Questionuser,
  Questionsummary,
  Questionfooter,
  Questiontags,
};
