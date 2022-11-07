import styled from "styled-components";

const Sidebar = styled.div`
  aside {
    margin: 0 auto;
    border: 1px solid hsl(47, 65%, 84%);
    background-color: hsl(47, 83%, 91%);
    color: rgb(59, 64, 69);
    box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
      0 2px 8px hsla(0, 0%, 0%, 0.05);
  }
  header {
    padding: 12px 15px;
    border-bottom: 1px solid hsl(47, 65%, 84%);
    font-size: 15px;
  }
  ul {
    padding: 4px 15px;
    background-color: #faf5e6;
  }
  li {
    margin: 12px 0;
    font-size: 13px;
    list-style: inside;
  }
`;

export default Sidebar;
