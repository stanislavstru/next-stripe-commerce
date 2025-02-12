type SinglePageLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export const SinglePageLayout: React.FC<SinglePageLayoutProps> = ({
  title,
  children,
}) => {
  return (
    <div className="wco-flex wco-flex-col wco-gap-8">
      <h1 className="wco-text-center wco-text-4xl wco-mt-8 wco-mb-4">
        {title}
      </h1>

      <div>{children}</div>
    </div>
  );
};
