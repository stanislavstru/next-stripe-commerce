import Header from "@/components/Header";
import Container from "../components/Container/Container";
import ProductCategories from "@/common/components/ProductCategories";
import Footer from "../components/Footer";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header menuShow cartShow />

      <Container className="wco-mt-[100px] md:wco-mt-[140px]">
        <div className="wco-grid wco-grid-cols-12">
          <div className="wco-col-span-12 md:wco-col-span-1">
            <ProductCategories />
          </div>
          <div className="wco-col-span-12 md:wco-col-span-11 md:wco-px-5 wco-mt-5 md:wco-mt-0">
            {children}
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
};
