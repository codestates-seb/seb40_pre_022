import styled from "styled-components";
import { flexColumnCenter } from "../../styles";

const Btn = styled.div`
  border-left: 16px solid transparent;
  border-right: 16px solid transparent;
  border-bottom: 16px solid rgb(186, 191, 196);
  cursor: pointer;
  margin: 1em;
  &.down {
    transform: scaleY(-1);
  }
  &.voted {
    border-bottom-color: hsl(27deg 90% 55%);
  }
`;

const VoteContainer = styled.div`
  ${flexColumnCenter}
  .icon {
    margin-bottom: 1em;
    cursor: pointer;
  }
  .check {
    width: 36px;
    height: 36px;
  }
  .checked {
    color: hsl(140deg 41% 31%);
  }
`;

const VoteCount = styled.div`
  color: hsl(210deg 8% 45%);
  font-size: 1.4rem;
`;

export { Btn, VoteContainer, VoteCount };
