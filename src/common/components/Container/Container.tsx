import classNames from "classnames";

const Container = ({
  children,
  className,
  fluid = false,
}: {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}) => {
  return (
    <div className={classNames("wco-w-full")}>
      <div
        className={classNames(
          fluid ? "wco-px-8" : "wco-container wco-px-5",
          "wco-mx-auto",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
