import React, { ReactNode } from "react";
import closeIconImage from "@/images/close-icon.svg";
import Button from "../Button";
import Image from "next/image";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";

export type ModalProps = {
  className?: string;
  isOpen: boolean;
  title?: ReactNode;
  titleBorder?: boolean;
  closeIcon?: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onOk?: () => void;
  okBtnText?: string;
  loading?: boolean;
};

function Modal({
  className,
  isOpen,
  title,
  closeIcon = true,
  children,
  onClose,
  onOk,
  okBtnText,
  loading,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={onClose}
          className="wco-relative wco-z-50"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="wco-fixed wco-inset-0 wco-bg-black/30"
          />
          <div className="wco-fixed wco-inset-0 wco-w-screen wco-overflow-y-auto wco-p-4">
            <div className="wco-flex wco-min-h-full wco-items-center wco-justify-center">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={classNames(
                  `wco-bg-white wco-p-6 sm:wco-p-12 wco-relative wco-min-w-[350px]`,
                  className
                )}
              >
                {title && (
                  <DialogTitle className="wco-text-lg wco-font-bold">
                    {title}
                  </DialogTitle>
                )}
                {closeIcon && (
                  <div
                    className="wco-cursor-pointer wco-absolute wco-top-4 wco-right-4"
                    onClick={onClose}
                    itemType="button"
                  >
                    <Image
                      src={closeIconImage}
                      alt="Close"
                      width={20}
                      height={20}
                    />
                  </div>
                )}

                <div className="wco-mt-5">{children}</div>
                {onOk && (
                  <div className="wco-flex wco-justify-end wco-gap-5 wco-mt-8">
                    <Button size="sm" onClick={onOk} type="button">
                      {loading ? "Loading" : okBtnText ? okBtnText : "OK"}
                    </Button>
                    <Button
                      size="sm"
                      onClick={onClose}
                      type="button"
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

export default Modal;
