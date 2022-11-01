import styled from "styled-components";

const Title = styled.div`
  padding: 20px;
  line-height: 1;
  font-size: 1.6em;
`;

const SettingContainer = styled.div`
  width: 450px;
  display: flex;
  border: 1px solid hsl(210, 8%, 85%);
  border-radius: 5px;
  padding: 25px;
  padding-bottom: 35px;
`;

const Settingitem = styled.input``;

const ModeContainer = styled.div`
  display: flex;
  padding-left: 25px;
`;

const ModeImg = styled.div`
  display: block;
  padding-left: 15px;
  text-align: center;

  .img {
    border-radius: 5px;
    cursor: pointer;
    margin-top: 25px;
    margin-bottom: 3px;
    box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
      0 2px 8px hsla(0, 0%, 0%, 0.05);
  }
`;

export { Title, SettingContainer, Settingitem, ModeContainer, ModeImg };
