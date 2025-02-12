import React from "react";
import { Field, FieldAttributes, FieldProps, getIn } from "formik";
import FormControl from "../FormControl/FormControl";

export type HandleOnChangeArgs = {
  field: FieldProps["field"];
  event: any;
};

export type FormFieldProps = FieldAttributes<any> & {
  required?: boolean;
  render?: (args: {
    field: FieldProps["field"];
    form: FieldProps["form"];
    meta: FieldProps["meta"];
    isInvalid?: string;
  }) => React.ReactNode;
};

function FormField({
  label,
  id,
  name,
  required,
  component,
  render,
  helperText,
  ...props
}: FormFieldProps) {
  const Component = component || undefined;

  return (
    <Field id={id} name={name} {...props}>
      {({ field, form, meta }: FieldProps) => {
        const showValidationMessage =
          getIn(form.touched, field.name) && getIn(form.errors, field.name);
        const validationMessage = getIn(form.errors, field.name) as string;

        return (
          <FormControl
            label={label}
            id={id}
            {...(label ? { required } : {})}
            error={showValidationMessage ? validationMessage : undefined}
            helperText={helperText}
          >
            {Component ? (
              <Component
                {...field}
                isInvalid={
                  showValidationMessage ? validationMessage : undefined
                }
                {...props}
              />
            ) : render ? (
              render({
                field,
                form,
                meta,
                isInvalid: showValidationMessage ? !!validationMessage : false,
              })
            ) : null}
          </FormControl>
        );
      }}
    </Field>
  );
}

export default FormField;
