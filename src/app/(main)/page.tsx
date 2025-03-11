import ControllerHome from "@/modules/ControllerHome";
import { MainLayout } from "@/common/layouts/MainLayout";
import { getSession } from "@/common/actions/session";

export default async function MainPage() {
  const session = await getSession();

  console.log("session", session);

  return (
    <MainLayout>
      <ControllerHome />
    </MainLayout>
  );
}
