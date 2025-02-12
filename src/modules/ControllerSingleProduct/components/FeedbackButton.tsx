"use client";

import { useModals } from "@/common/hooks/useModals";
import Button from "@/common/components/_UI/Button";
import classNames from "classnames";
import { CreateFeedbackRequestsDto } from "@/common/types/api/types-from-swagger";

type FeedbackButtonProps = {
  className?: string;
  initialData?: CreateFeedbackRequestsDto;
};

export const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  className,
  initialData,
}) => {
  const { toggleFeedbackModal } = useModals();

  return (
    <Button
      className={classNames(className, "wco-w-full")}
      onClick={() => {
        toggleFeedbackModal({
          show: true,
          data: initialData ?? {},
        });
      }}
      uppercase
    >
      Write to us
    </Button>
  );
};
