import { MainLayout } from "@/common/layouts/MainLayout";
import { SinglePageLayout } from "@/common/layouts/SinglePageLayout";
import type { Metadata } from "next";
import { SubscriptionsByIdDto } from "@/common/types/api/types-from-swagger";
import { getSubscriptionsBySubscriptionId } from "@/common/actions/subscriptions";
import ControllerSubscriptions from "@/modules/ControllerSubscriptions";

export const metadata: Metadata = {
  title: "WCO Market | Subscription",
  description:
    "We are the WCO market. We understand the appeal of vintage Volkswagens and the desire to preserve their original beauty. This store is for you. We create retro parts for cars and buses.",
  robots: "noindex, nofollow",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { ...params } = await searchParams;
  const subscriptionId = params["subscription-id"];
  let subscriptions: SubscriptionsByIdDto[] = [];

  if (subscriptionId) {
    subscriptions = await getSubscriptionsBySubscriptionId(subscriptionId);
  }

  return (
    <MainLayout>
      <SinglePageLayout title="Subscription">
        <div className="md:wco-w-[400px] lg:wco-w-[600px] wco-mx-auto">
          <ControllerSubscriptions subscriptions={subscriptions} />
        </div>
      </SinglePageLayout>
    </MainLayout>
  );
}
