"use client";

import classNames from "classnames";

const MAIN_CLASS =
  "wco-appearance-none wco-w-full wco-rounded-sm wco-border wco-border-third wco-outline-dark wco-transition-all";

const CONDITION_CLASSES = {
  danger: "!wco-border-danger",
};

const SIZE_CLASSES = {
  sm: "wco-h-[36px] wco-px-4 wco-text-sm",
  md: "wco-h-[48px] wco-px-5 wco-text-sm",
  lg: "wco-h-[53px] wco-px-8 wco-text-lg",
};

type NativeSelectProps = {
  options: { value: string; label: string }[];
  value: string | undefined;
  onChange: (value: string) => void;
  size?: "sm" | "md" | "lg";
  autoComplete?: HTMLInputElement["autocomplete"];
  isInvalid?: boolean;
  placeholder?: string;
  disabled?: boolean;
};

const NativeSelect: React.FC<NativeSelectProps> = ({
  options,
  value,
  onChange,
  size = "md",
  isInvalid,
  placeholder,
  disabled,
  ...props
}) => {
  const isValueValid = options.some((option) => option.value === value);
  const displayValue = isValueValid ? value : "";

  return (
    <div className="wco-relative wco-w-full">
      <select
        className={classNames(
          MAIN_CLASS,
          SIZE_CLASSES[size],
          isInvalid && CONDITION_CLASSES.danger,
          (displayValue === undefined || displayValue.length === 0) &&
            "!wco-text-gray-400",
          disabled
            ? "!wco-bg-gray-200 wco-text-gray-400 wco-cursor-not-allowed !wco-outline-none"
            : "wco-cursor-pointer"
        )}
        value={displayValue}
        onChange={(e) => onChange && !disabled && onChange(e.target.value)}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="wco-absolute wco-inset-y-0 wco-right-2 wco-flex wco-items-center wco-px-2 wco-pointer-events-none">
        <svg
          className="wco-w-4 wco-h-4 wco-text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default NativeSelect;
