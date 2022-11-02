import styled from "styled-components";

export const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
`;

export const Ul = styled.ul`
  li {
    position: relative;
    font-size: 1rem;
    margin: 30px 0 30px 30px;
    .icon {
      position: absolute;
      top: 50%;
      left: -30px;
      transform: translateY(-55%);
      color: hsl(206deg 100% 52%);
      font-size: 1.3rem;
    }
  }
`;

export const Info = styled.div`
  line-height: 18px;
  p {
    font-size: 0.8rem;
    color: var(--gray);
  }
  p a {
    font-weight: 600;
    color: var(--darkblue);
  }
`;
