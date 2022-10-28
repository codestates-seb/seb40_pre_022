import React from "react";
import PropTypes from "prop-types";
import Btn from "./style";

export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
  const mode = primary ? "primary" : "secondary";
  return (
    <Btn
      type='button'
      className={[`${size}`, mode].join(" ")}
      style={backgroundColor && { backgroundColor }}
      {...props}>
      {label}
    </Btn>
  );
};

Button.propTypes = {
  primary: PropTypes.bool,
  backgroundColor: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large", "header-size"]),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  backgroundColor: null,
  primary: false,
  size: "medium",
  onClick: undefined,
};
