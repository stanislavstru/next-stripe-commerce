import { FC } from "react";
import Container from "../components/Container";
import Header from "../components/Header";

type SeparateLayoutProps = {
  leftChildrens?: React.ReactNode;
  rightChildrens?: React.ReactNode;
};

export const SeparateLayout: FC<SeparateLayoutProps> = ({
  leftChildrens,
  rightChildrens,
}) => {
  return (
    <>
      <Header variant="transparent" />
      <Container className="wco-flex wco-flex-col md:wco-flex-row wco-pt-[100px]">
        <div className="md:wco-w-1/2 wco-relative wco-z-10 md:wco-pr-20">
          {leftChildrens}
        </div>
        <div className="md:wco-w-1/2 wco-z-10 wco-mt-[80px] md:wco-mt-0 md:wco-px-10">
          {rightChildrens}
        </div>
      </Container>
      <div className="wco-hidden md:wco-block md:wco-fixed wco-bg-gray-300 wco-right-0 wco-top-0 wco-bottom-0 wco-w-1/2" />
    </>
  );
};
