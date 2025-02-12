import React, { useState } from "react";
import classNames from "classnames";
import Label from "../Label/Label";

const MAIN_CLASS =
  "wco-appearance-none wco-w-full wco-transition-all wco-rounded-sm wco-border wco-border-third wco-outline-dark";

const SIZE_CLASSES = {
  sm: "wco-min-h-[36px] wco-px-4 wco-text-sm",
  md: "wco-min-h-[48px] wco-px-5 wco-text-sm",
  lg: "wco-min-h-[53px] wco-px-8 wco-text-lg",
};

const CONDITION_CLASSES = {
  danger: "!wco-border-danger",
};

export type CaInputProps = {
  value: HTMLInputElement["value"];
  type?: "text" | "password" | "email" | "number";
  className?: string;
  size?: "sm" | "md" | "lg";
  isInvalid?: boolean;
  disabled?: boolean;
  onFocus?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label?: string;
  textarea?: boolean;
  placeholder?: string;
  autoComplete?: HTMLInputElement["autocomplete"];
  required?: boolean;
};

const Input: React.FC<CaInputProps> = ({
  type = "text",
  className,
  disabled,
  onFocus,
  onBlur,
  label,
  textarea,
  size = "md",
  isInvalid,
  required,
  ...props
}) => {
  // const [isFocused, setIsFocused] = useState(false);
  const [passwordShow] = useState(false);

  const handleFocus = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // setIsFocused(false);
    onBlur?.(event);
  };

  return (
    <div className={classNames("wco-flex wco-flex-col wco-gap-1.5", className)}>
      {label && <Label label={label} required={required} />}
      <div className={classNames("wco-relative wco-w-full", className)}>
        {textarea ? (
          <textarea
            className={classNames(
              MAIN_CLASS,
              "wco-py-5",
              SIZE_CLASSES[size],
              isInvalid && CONDITION_CLASSES.danger
            )}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        ) : (
          <input
            className={classNames(
              MAIN_CLASS,
              SIZE_CLASSES[size],
              isInvalid && CONDITION_CLASSES.danger
            )}
            type={type === "password" && passwordShow ? "text" : type}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
        )}

        {/* {type === "password" && (
            <div
              className="wco-cursor-pointer"
              onClick={() => setPasswordShow(!passwordShow)}
            >
              {passwordShow ? <EyeIconHide /> : <EyeIcon />}
            </div>
          )} */}
      </div>
    </div>
  );
};

export default Input;
