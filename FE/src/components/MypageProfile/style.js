import styled from "styled-components";

const Title = styled.div`
  padding: 20px;
  line-height: 1;
  font-size: 1.6em;
`;

const UserContainer = styled.div`
  display: block;
  flex: 3;
  border: 1px solid hsl(210, 8%, 85%);
  border-radius: 5px;
  padding: 25px;
  padding-right: 50px;
`;

const Qlist = styled.a`
  display: block;
  margin-bottom: 10px;
  color: #33a7ff;
`;

const Useritem = styled.div`
  display: block;
  border-radius: 5px;
  padding: 25px;
  padding-right: 0px;
`;

export { Title, UserContainer, Useritem, Qlist };
