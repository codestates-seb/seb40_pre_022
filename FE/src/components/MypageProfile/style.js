import styled from "styled-components";

const Title = styled.div`
  padding: 20px;
  line-height: 1;
  font-size: 1.6em;
`;

const UserContainer = styled.div`
  width: 500px;
  display: block;
  border: 1px solid hsl(210, 8%, 85%);
  border-radius: 5px;
  padding: 25px;
`;

const Useritem = styled.div`
  display: block;
  border-radius: 5px;
  padding: 25px;
  padding-right: 0px;
`;

export { Title, UserContainer, Useritem };
