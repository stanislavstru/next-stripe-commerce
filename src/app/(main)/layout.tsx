import ReduxProvider from "@/common/redux/ReduxProvider";
import { ToastContainer } from "react-toastify";
import { SWRProvider } from "@/common/http/swrProvider";
import GlobalModals from "@/common/components/_modals/GlobalModals";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <ToastContainer position="top-center" autoClose={5000} />
      <SWRProvider>
        {children}
        <GlobalModals />
      </SWRProvider>
    </ReduxProvider>
  );
}
