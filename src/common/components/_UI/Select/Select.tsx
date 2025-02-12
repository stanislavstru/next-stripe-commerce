import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowDownIcon } from "@/common/icons/ArrowDownIcon";
import classNames from "classnames";
import { CancelIcon } from "@/common/icons/CancelIcon";
import CaLabel from "../Label/Label";

export type SelectSize = "small" | "medium" | "large";

const BASE_CLASSES = [
  "wco-font-sans-serif",
  "wco-font-normal",
  "wco-border",
  "wco-rounded-sm",
  "wco-w-full",
  "wco-min-w-[150px]",
];

const SIZE_CLASSES = {
  xsmall: ["wco-text-sm", "wco-min-h-[32px]", "wco-px-2.5"],
  small: ["wco-text-sm", "wco-min-h-[42px]", "wco-px-3"],
  medium: ["wco-text-sm", "wco-min-h-[50px]", "wco-px-5"],
  large: ["wco-text-lg", "wco-py-5", "wco-px-5"],
};

// "xsmall" | "small" | "medium" | "large" | "xlarge"

type SelectType = { label: string; value: any; [x: string]: any };

export type CaSelectProps = {
  size?: keyof typeof SIZE_CLASSES;
  label?: string;
  value?: SelectType["value"];
  options: SelectType[];
  ["aria-invalid"]?: boolean;
  under?: React.ReactNode;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  onChange?: (value: SelectType["value"], option: SelectType) => void;
  onReset?: () => void;
};

function Select({
  size,
  label,
  value,
  options,
  under,
  placeholder = "Select",
  className,
  disabled,
  onChange,
  onReset,
  ...props
}: CaSelectProps) {
  const prepareValue = options.find((item) => item.value === value);

  return (
    <Listbox
      value={prepareValue}
      onChange={(option) => onChange && onChange(option.value, option)}
      disabled={disabled}
    >
      {({ open, value: valueSelect }) => (
        <div className="wco-flex wco-flex-col wco-gap-1.5">
          {label && <CaLabel label={label} />}
          <div className={classNames("wco-relative", className)}>
            <Listbox.Button
              className={classNames(
                BASE_CLASSES,
                SIZE_CLASSES[size || "medium"],
                props["aria-invalid"]
                  ? "wco-border-danger"
                  : "wco-border-mid-neutral-3",
                disabled
                  ? "wco-bg-light-neutral-3 wco-cursor-not-allowed"
                  : "wco-bg-white hover:wco-border-mid-neutral-2 focus:wco-border-info",
                value && onReset && "wco-pr-20"
              )}
            >
              {prepareValue ? (
                <span
                  className={classNames(
                    `wco-flex wco-items-center ${
                      disabled && "wco-text-mid-neutral-2"
                    }`
                  )}
                >
                  {valueSelect.label}
                </span>
              ) : (
                <span className="wco-flex wco-items-center wco-text-mid-neutral-2">
                  {placeholder}
                </span>
              )}
              <span
                className={`wco-pointer-events-none wco-absolute wco-inset-y-0 wco-right-0 wco-flex wco-items-center wco-pr-5 ${
                  disabled ? "wco-opacity-50" : "wco-opacity-100"
                }`}
              >
                <ArrowDownIcon style={{ width: 20, height: 20 }} />
              </span>
              {!!value && onReset && (
                <div
                  className={`wco-absolute wco-inset-y-0 wco-right-12 wco-flex wco-items-center ${
                    disabled ? "wco-opacity-50" : "wco-opacity-100"
                  }`}
                  onClick={() => {
                    onReset();
                  }}
                >
                  <CancelIcon style={{ width: "20px" }} />
                </div>
              )}
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={classNames(
                  "wco-absolute wco-flex wco-flex-col wco-gap-2 wco-z-50 wco-mt-1 wco-max-h-56 wco-w-full wco-overflow-auto wco-bg-white wco-shadow-lg wco-rounded-sm wco-p-2"
                )}
                style={{ listStyleType: "none" }}
              >
                {options.map((option, key) => (
                  <Listbox.Option
                    key={key}
                    className={({ active, selected }) =>
                      classNames(
                        SIZE_CLASSES[size || "medium"],
                        "wco-flex wco-items-center",
                        active && "wco-bg-light-neutral-4",
                        selected && "wco-bg-light-neutral-4",
                        "wco-relative wco-cursor-pointer"
                      )
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <span
                        className={classNames(
                          selected
                            ? "wco-font-semibold wco-text-purple"
                            : "wco-font-normal wco-text-deep-blue",
                          "hover:wco-font-semibold wco-block"
                        )}
                      >
                        {option.label}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
          {under && (
            <div className="wco-flex wco-items-center wco-mt-2 wco-text-xs wco-text-mid-neutral-1">
              {under}
            </div>
          )}
        </div>
      )}
    </Listbox>
  );
}

export default Select;
