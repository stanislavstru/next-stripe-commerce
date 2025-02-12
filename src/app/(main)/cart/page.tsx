import { SeparateLayout } from "@/common/layouts/SeparateLayout";
import ControllerCart from "@/modules/ControllerCart/ControllerCart";
import ControllerDelivery from "@/modules/ControllerDelivery";

export default async function Page() {
  return (
    <SeparateLayout
      leftChildrens={<ControllerCart />}
      rightChildrens={<ControllerDelivery />}
    />
  );
}
