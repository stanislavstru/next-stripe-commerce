import Container from "../components/Container/Container";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Container className="wco-mt-[100px] md:wco-mt-[140px]">
        <div className="wco-grid wco-grid-cols-12">
          <div className="wco-col-span-12 md:wco-col-span-1">123</div>
          <div className="wco-col-span-12 md:wco-col-span-11 md:wco-px-5 wco-mt-5 md:wco-mt-0">
            {children}
          </div>
        </div>
      </Container>
    </>
  );
};
