import React from "react";
import PropTypes from "prop-types";
import Btn from "./style";

export const Button = ({
  Tagged,
  Position,
  Choosed,
  link,
  primary,
  backgroundColor,
  size,
  label,
  ...props
}) => {
  const mode = primary ? "Linkbutton" : "secondary";
  return (
    <Btn
      type='button'
      className={[
        `${size}`,
        `${Position}`,
        `${Choosed}`,
        `${Tagged}`,
        mode,
      ].join(" ")}
      style={backgroundColor && { backgroundColor }}
      {...props}>
      {label}
    </Btn>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  Position: PropTypes.oneOf(["Middle", "Left", "Right"]),
  Choosed: PropTypes.oneOf(["Choosed"]),
  Tagged: PropTypes.oneOf(["Tagged"]),
};

Button.defaultProps = {
  primary: false,
  backgroundColor: null,
  size: "medium",
  onClick: undefined,
};
