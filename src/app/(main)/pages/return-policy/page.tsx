import { MainLayout } from "@/common/layouts/MainLayout";
import { SinglePageLayout } from "@/common/layouts/SinglePageLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WCO Market | Return Policy",
  description:
    "We are the WCO market. We understand the appeal of vintage Volkswagens and the desire to preserve their original beauty. This store is for you. We create retro parts for cars and buses.",
};

export default async function Page() {
  return (
    <MainLayout>
      <SinglePageLayout title="Return Policy">
        <div className="md:wco-w-[600px] wco-mx-auto">
          Returns for refunds are accepted only within 15 days of purchase. All
          returned items must be in clean, unused condition and include their
          original packaging. Customers are responsible for covering all return
          shipping costs and associated fees. Any shipping damages must be
          reported directly to the courier at the time of delivery, and damage
          claims will only be considered within three days of receiving the
          shipment.
        </div>
      </SinglePageLayout>
    </MainLayout>
  );
}
