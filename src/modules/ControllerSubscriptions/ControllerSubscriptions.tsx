"use client";

import { SubscriptionsByIdDto } from "@/common/types/api/types-from-swagger";
import Button from "@/common/components/_UI/Button";
import { useModals } from "@/common/hooks/useModals";
import { deleteSubscription } from "@/common/actions/subscriptions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type ControllerSubscriptionsProps = {
  subscriptions: SubscriptionsByIdDto[];
};

const ControllerSubscriptions: React.FC<ControllerSubscriptionsProps> = ({
  subscriptions,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toggleCallbackModal } = useModals();
  console.log("subscriptions", subscriptions);

  const newsSubscription = subscriptions.find(
    (subscription) => subscription.type === "news"
  );

  const unsubscribe = async (id: string) => {
    try {
      setLoading(true);
      const response = await deleteSubscription(id);

      if (response) {
        toast.success("You have successfully unsubscribed");
        router.push(`/subscription`);
      } else {
        throw new Error("Something went wrong. Please try again later");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong. Please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div>
          {`Stay connected with the latest retro parts, exclusive discounts, and special offers. No spam, just quality updates! You can subscribe or unsubscribe anytime.`}
        </div>
        <div className="wco-flex wco-items-center wco-justify-center">
          <Button
            size="sm"
            className="wco-mt-8"
            uppercase
            loading={loading}
            variant="outline"
            onClick={() =>
              newsSubscription?.is_active
                ? unsubscribe(newsSubscription.id)
                : toggleCallbackModal()
            }
          >
            {newsSubscription?.is_active
              ? "Unsubscribe from Newsletter"
              : "Join Our Newsletter"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ControllerSubscriptions;
