import React from "react";
import Label from "../Label/Label";

export type FormControlProps = {
  label?: string;
  children: React.ReactNode;
  id?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
};

export function FormControl({
  label,
  children,
  id,
  required = false,
  error,
  helperText,
}: FormControlProps) {
  return (
    <div className="wco-flex wco-flex-col wco-gap-1.5">
      {label && <Label label={label} required={required} id={id} />}
      {children}
      {helperText && (
        <div className="wco-text-gray-500 wco-text-xs">{helperText}</div>
      )}
      {error && <div className="wco-text-danger wco-text-sm">{error}</div>}
    </div>
  );
}

export default FormControl;
