import React from "react";
import PropTypes from "prop-types";
import SortingA from "./style";

export const SortingButton = ({
  primary,
  backgroundColor,
  Middle,
  Left,
  Tagged,
  Right,
  Position,
  Clicked,
  link,
  label,
  ...props
}) => {
  const mode = primary ? "primary" : "secondary";
  return (
    <SortingA
      type='a'
      href={link}
      className={[`${Position}`, `${Clicked}`, `${Tagged}`, mode].join(" ")}
      style={backgroundColor && { backgroundColor }}
      {...props}>
      {label}
    </SortingA>
  );
};

SortingButton.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  Position: PropTypes.oneOf(["Middle", "Left", "Right"]),
  Clicked: PropTypes.oneOf(["Clicked"]),
  Tagged: PropTypes.oneOf(["Tagged"]),
  label: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

SortingButton.defaultProps = {
  primary: false,
};
