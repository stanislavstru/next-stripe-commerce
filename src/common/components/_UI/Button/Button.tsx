import { FC } from "react";
import classNames from "classnames";
import Tooltip from "../Tooltip/Tooltip";

const BASE_BUTTON_CLASSES =
  "wco-font-semibold wco-transition wco-outline-none wco-rounded-sm wco-border-2";

const SIZE_BUTTON_CLASSES = {
  sm: "wco-py-2 wco-px-4 wco-text-sm",
  md: "wco-py-3 wco-px-6",
  lg: "wco-py-4 wco-px-8 wco-text-lg",
};

const VARIANT_BUTTON_CLASSES = {
  black: "wco-bg-black wco-text-white wco-border-black wco-text-black",
  primary: "wco-bg-primary wco-border-primary wco-text-white",
  secondary: "wco-bg-secondary wco-border-secondary wco-text-white",
  danger: "wco-bg-danger wco-border-danger wco-text-white",
  warning: "wco-bg-warning wco-border-warning wco-text-white",
  success: "wco-bg-success wco-border-success wco-text-white",
  outline: "wco-border wco-border-black wco-text-black",
};

type ButtonProps = {
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?:
    | "black"
    | "primary"
    | "secondary"
    | "danger"
    | "warning"
    | "success"
    | "outline";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  uppercase?: boolean;
  loading?: boolean;
  disabled?: boolean;
  tooltip?: string;
  className?: string;
};

const Button: FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "black",
  type = "button",
  onClick,
  uppercase = false,
  loading,
  disabled,
  tooltip,
  className,
}) => {
  return (
    <Tooltip tooltipContent={tooltip} hidden={!tooltip} type="dark">
      <button
        className={classNames(
          BASE_BUTTON_CLASSES,
          SIZE_BUTTON_CLASSES[size],
          VARIANT_BUTTON_CLASSES[variant],
          uppercase && "wco-uppercase",
          disabled && "wco-cursor-not-allowed wco-opacity-40",
          className
        )}
        onClick={onClick}
        type={type}
        disabled={disabled || loading}
      >
        {loading ? "Loading" : children}
      </button>
    </Tooltip>
  );
};

export default Button;
