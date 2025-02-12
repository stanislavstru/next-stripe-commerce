import React, { FC } from "react";
import classNames from "classnames";

export type CheckboxProps = {
  id?: string;
  name?: string;
  disabled?: boolean;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
};

const Checkbox: FC<CheckboxProps> = ({
  id,
  name,
  disabled,
  checked,
  onChange,
  label,
  className,
}) => {
  return (
    <div className={classNames("wco-flex wco-items-center", className)}>
      <input
        id={id}
        name={name}
        type="checkbox"
        className={classNames(
          "wco-cursor-pointer wco-w-4 wco-h-4",
          disabled && "wco-cursor-not-allowed"
        )}
        checked={checked}
        disabled={disabled}
        onChange={() => {
          onChange && onChange(!checked);
        }}
      />
      {label && (
        <label
          htmlFor={id}
          className="wco-ms-2 wco-cursor-pointer wco-font-sans-serif"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
