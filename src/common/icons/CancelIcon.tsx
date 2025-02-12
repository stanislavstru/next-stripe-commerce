import React from "react";
import classNames from "classnames";

export function CancelIcon({
  className,
  style,
  colorFill = "#F9FBFE",
  colorStroke = "#050530",
  ...props
}: ClientIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classNames(["cr-h-5 cr-w-5", className])}
      style={style}
      viewBox="0 0 21 20"
      fill="none"
      {...props}
    >
      <circle
        cx="10.4297"
        cy="10"
        r="9.5"
        fill={colorFill}
        stroke={colorStroke}
      />
      <path
        d="M14.2758 6.15332L6.5835 13.8456"
        stroke={colorStroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.5835 6.15332L14.2758 13.8456"
        stroke={colorStroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
