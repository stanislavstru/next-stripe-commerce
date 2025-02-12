import React, { useState, cloneElement } from "react";
import { ArrowDownIcon } from "@/common/icons/ArrowDownIcon";
import Button from "../Button";
import classNames from "classnames";
import Tooltip from "../Tooltip/Tooltip";
import { CircleSpinner } from "../_spinners/CircleSpinner";
import Label from "../Label/Label";

export type DropdownBtnProps = {
  label?: string;
  menu: (hideDropdown: () => void) => React.ReactNode;
  customBtn?: (openDropdown: () => void) => JSX.Element;
  classNameDefaultBtn?: string;
  classNameDropdown?: string;
  loading?: boolean;
};

function DropdownBtn({
  label,
  menu,
  customBtn,
  classNameDefaultBtn,
  classNameDropdown,
  loading,
}: DropdownBtnProps) {
  const [open, setOpen] = useState(false);

  const customButtonComponent = customBtn
    ? customBtn(() => setOpen(true))
    : null;

  return (
    <>
      <Tooltip
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
        tooltipContent={
          <div className={classNames(classNameDropdown)}>
            {menu(() => {
              setOpen(false);
            })}
          </div>
        }
        onlyClick
      >
        {customButtonComponent ? (
          cloneElement(customButtonComponent, {
            className: classNames(
              customButtonComponent?.props.className,
              "wco-cursor-pointer"
            ),
            onClick: () => {
              setOpen(!open);
            },
          })
        ) : (
          <Button
            className={classNames("wco-text-sm", classNameDefaultBtn)}
            onClick={() => {
              setOpen(!open);
            }}
          >
            {label && <Label label={label} />}
            <div className="wco-flex wco-justify-center wco-w-5">
              {loading ? (
                <CircleSpinner className="!wco-w-4 !wco-h-4" />
              ) : (
                <ArrowDownIcon
                  className={`wco-block wco-transition-all wco-cursor-pointer ${
                    open ? "wco-rotate-180" : "wco-rotate-0"
                  }`}
                />
              )}
            </div>
          </Button>
        )}
      </Tooltip>
    </>
  );
}

export default DropdownBtn;
