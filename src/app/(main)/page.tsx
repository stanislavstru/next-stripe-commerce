import ControllerHome from "@/modules/ControllerHome";
import { MainLayout } from "@/common/layouts/MainLayout";

export default async function MainPage() {
  return (
    <MainLayout>
      <ControllerHome />
    </MainLayout>
  );
}
