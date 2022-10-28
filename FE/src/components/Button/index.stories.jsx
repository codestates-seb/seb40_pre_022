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

export const Secondary = Template.bind({});
Secondary.args = {
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

export const Middle = Template.bind({});
Middle.args = {
  primary: true,
  label: "Sorting",
  Position: "Middle",
};

export const Left = Template.bind({});
Left.args = {
  primary: true,
  label: "Sorting",
  Position: "Left",
};

export const Right = Template.bind({});
Right.args = {
  primary: true,
  label: "Sorting",
  Position: "Right",
};

export const Choosed = Template.bind({});
Choosed.args = {
  primary: true,
  label: "Sorting",
  Choosed: "Choosed",
};

export const Tagged = Template.bind({});
Tagged.args = {
  primary: true,
  label: "Sorting",
  Tagged: "Tagged",
};
