import React from "react";
import classNames from "classnames";

export function ArrowDownIcon({ className, style, ...props }: ClientIconProps) {
  return (
    <svg
      className={classNames(["wco-h-5 wco-w-5", className])}
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
