import React from "react";
import classNames from "classnames";

export function CloseIcon({ className, style, ...props }: ClientIconProps) {
  return (
    <svg
      className={classNames(["cr-h-5 cr-w-5", className])}
      style={style}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 6.84277L6 18.8428"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6.84277L18 18.8428"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
