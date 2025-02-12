import classNames from "classnames";

const CLASS_SIZE = {
  sm: "wco-text-md",
  md: "wco-text-xl",
  lg: "wco-text-2xl",
};

type TitleProps = {
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof CLASS_SIZE;
};

const Title = ({ children, className, size = "md" }: TitleProps) => {
  return (
    <div
      className={classNames(
        "wco-uppercase wco-font-semibold",
        CLASS_SIZE[size],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Title;
