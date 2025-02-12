"use client";

import { useModals } from "@/common/hooks/useModals";
import Button from "@/common/components/_UI/Button";
import classNames from "classnames";
import { ProductsEntity } from "@/common/types/api/types-from-swagger";
import ModalPreorder from "@/common/components/_modals/ModalPreorder";

type FeedbackButtonProps = {
  className?: string;
  product: ProductsEntity;
};

export const PreorderButton: React.FC<FeedbackButtonProps> = ({
  className,
  product,
}) => {
  const { togglePreorderModal } = useModals();

  return (
    <>
      <Button
        className={classNames(className, "wco-w-full")}
        variant="outline"
        onClick={() => {
          togglePreorderModal({
            show: true,
            data: {
              product,
            },
          });
        }}
        uppercase
      >
        Pre-order
      </Button>
      <ModalPreorder />
    </>
  );
};
