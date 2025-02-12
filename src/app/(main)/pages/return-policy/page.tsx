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
        <div className="md:wco-w-[600px] wco-mx-auto">Area for text</div>
      </SinglePageLayout>
    </MainLayout>
  );
}
