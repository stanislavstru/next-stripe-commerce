import classNames from "classnames";

export type LabelProps = {
  label: string;
  id?: string;
  required?: boolean;
  className?: string;
  uppercase?: boolean;
};

function Label({
  label,
  id,
  required,
  className,
  uppercase = true,
}: LabelProps) {
  return (
    <label
      className={classNames(
        "wco-text-sm wco-font-normal wco-font-sans-serif wco-text-deep-blue",
        uppercase && "wco-uppercase",
        className
      )}
      {...(id ? { htmlFor: id } : {})}
    >
      {label}
      <span className="wco-text-danger wco-ml-1">{required ? "*" : ""}</span>
    </label>
  );
}

export default Label;
