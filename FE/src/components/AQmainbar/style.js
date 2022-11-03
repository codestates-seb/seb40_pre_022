import styled from "styled-components";

const MainbarContainer = styled.div`
  display: inline-block;
  flex: 3;
  padding-top: 24px;
`;

const AQheader = styled.div`
  font-size: 2em;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AQsorting = styled.div`
  font-size: 1.2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const AQsortingButton = styled.div`
  font-size: 1.3em;
  display: flex;
`;

export { MainbarContainer, AQheader, AQsorting, AQsortingButton };
