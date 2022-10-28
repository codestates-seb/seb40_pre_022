import React from "react";
import PropTypes from "prop-types";
import SortingA from "./style";

export const SortingButton = ({ Tagged, Position, Clicked, link, label }) => {
  return (
    <SortingA
      type='a'
      href={link}
      className={[`${Position}`, `${Clicked}`, `${Tagged}`].join(" ")}>
      {label}
    </SortingA>
  );
};

SortingButton.propTypes = {
  Position: PropTypes.oneOf(["Middle", "Left", "Right"]),
  Clicked: PropTypes.oneOf(["Clicked"]),
  Tagged: PropTypes.oneOf(["Tagged"]),
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
