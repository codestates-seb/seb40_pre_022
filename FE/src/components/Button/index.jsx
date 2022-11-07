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
  Selected,
  color,
  ...props
}) => {
  return (
    <Btn
      type='button'
      className={[
        `${primary}`,
        `${size}`,
        `${Position}`,
        `${Choosed}`,
        `${Tagged}`,
        `${Selected}`,
      ].join(" ")}
      style={(backgroundColor && { backgroundColor }, color && { color })}
      {...props}
      value={label}>
      {label}
    </Btn>
  );
};

Button.propTypes = {
  primary: PropTypes.oneOf([
    "Normalbutton",
    "Linkbutton",
    "Mypagebutton",
    "Pagingbutton",
  ]),
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large", "header-size"]),
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  Position: PropTypes.oneOf(["Middle", "Left", "Right"]),
  Choosed: PropTypes.oneOf(["Choosed"]),
  Tagged: PropTypes.oneOf(["Tagged"]),
  Selected: PropTypes.oneOf(["Selected"]),
};

Button.defaultProps = {
  primary: "Normalbutton",
  backgroundColor: null,
  size: "medium",
  onClick: undefined,
};
