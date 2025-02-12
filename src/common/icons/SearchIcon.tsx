import React from "react";
import classNames from "classnames";

export function SearchIcon({ className, style, ...props }: ClientIconProps) {
  return (
    <svg
      className={classNames(["cr-h-5 cr-w-5", className])}
      style={style}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="12.2246"
        cy="10.1494"
        r="7.14942"
        stroke="#5E678C"
        strokeWidth="1.5"
      />
      <path
        d="M16.835 16.7188L20.6748 21.9541"
        stroke="#5E678C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
