"use client";

import { FC } from "react";
import Modal from "@/common/components/_UI/Modal";
import { useState } from "react";
import Button from "@/common/components/_UI/Button";
import classNames from "classnames";

type DescriptionModalProps = {
  children: React.ReactNode;
  className?: string;
};

export const DescriptionModal: FC<DescriptionModalProps> = ({
  children,
  className,
}) => {
  const [descriptionModal, setDescriptionModal] = useState<boolean>(false);

  return (
    <>
      <Button
        className={classNames("wco-w-full", className)}
        onClick={() => setDescriptionModal(true)}
        uppercase
        variant="outline"
      >
        Description
      </Button>
      <Modal
        isOpen={descriptionModal}
        onClose={() => setDescriptionModal(false)}
        title="Description"
        className="md:wco-max-w-[600px]"
      >
        {children}
      </Modal>
    </>
  );
};
