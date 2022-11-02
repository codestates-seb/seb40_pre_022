import styled from "styled-components";

const AnswerHeader = styled.div`
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
`;

const AnswerCount = styled.h2`
  font-weight: 400;
  font-size: 1.3rem;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SortText = styled.div`
  font-size: 12px;
`;

const SortSelect = styled.select`
  padding: 0.6em 0.7em;
  padding-right: 32px;
  font-size: 13px;
  border: 1px solid hsl(210deg 8% 75%);
`;

const SortOption = styled.option``;

export {
  AnswerHeader,
  AnswerCount,
  SortContainer,
  SortText,
  SortSelect,
  SortOption,
};
