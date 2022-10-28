import React from "react";

import { SortingButton } from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/SortingButton",
  component: SortingButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <SortingButton {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: "Sorting",
  link: "/questions?tab=Newest",
};

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
