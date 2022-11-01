import React from "react";

import { Button } from ".";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = (args) => <Button {...args} />;

export const Normalbutton = Template.bind({});
Normalbutton.args = {
  label: "Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  label: "Button",
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "Button",
};

export const Linkbutton = Template.bind({});
Linkbutton.args = {
  primary: "Linkbutton",
  label: "Sorting",
};

export const Middle = Template.bind({});
Middle.args = {
  primary: "Linkbutton",
  label: "Sorting",
  Position: "Middle",
};

export const Left = Template.bind({});
Left.args = {
  primary: "Linkbutton",
  label: "Sorting",
  Position: "Left",
};

export const Right = Template.bind({});
Right.args = {
  primary: "Linkbutton",
  label: "Sorting",
  Position: "Right",
};

export const Choosed = Template.bind({});
Choosed.args = {
  primary: "Linkbutton",
  label: "Sorting",
  Choosed: "Choosed",
};

export const Tagged = Template.bind({});
Tagged.args = {
  primary: "Linkbutton",
  label: "Sorting",
  Tagged: "Tagged",
};

export const Mypagebutton = Template.bind({});
Mypagebutton.args = {
  primary: "Mypagebutton",
  label: "Sorting",
};

export const MypageSelected = Template.bind({});
MypageSelected.args = {
  primary: "Mypagebutton",
  label: "Sorting",
  Selected: "Selected",
};
