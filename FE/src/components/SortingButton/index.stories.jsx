import React from "react";

import { SortingButton } from ".";

export default {
  title: "Example/SortingButton",
  component: SortingButton,
  argTypes: {},
};

const Template = (args) => <SortingButton {...args} />;

export const Middle = Template.bind({});
Middle.args = {
  label: "Sorting",
  Position: "Middle",
  link: "/questions?tab=Newest",
};

export const Left = Template.bind({});
Left.args = {
  label: "Sorting",
  Position: "Left",
  link: "/questions?tab=Newest",
};

export const Right = Template.bind({});
Right.args = {
  label: "Sorting",
  Position: "Right",
  link: "/questions?tab=Newest",
};

export const Clicked = Template.bind({});
Clicked.args = {
  label: "Sorting",
  Clicked: "Clicked",
  link: "/questions?tab=Newest",
};

export const Tagged = Template.bind({});
Tagged.args = {
  label: "Sorting",
  Tagged: "Tagged",
  link: "/questions?tab=Newest",
};
