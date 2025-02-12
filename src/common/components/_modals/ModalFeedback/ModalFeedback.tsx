"use client";

import Modal from "../../_UI/Modal";
import { useModals } from "@/common/hooks/useModals";
import { Form, Formik } from "formik";
import FormField from "../../_UI/FormField";
import Input from "@/components/_UI/Input";
import { validationSchema } from "./validation";
import { setFeedbackRequests } from "@/common/actions/feedback";
import { toast } from "react-toastify";
import { useState } from "react";
import Button from "../../_UI/Button";
import { usePathname } from "next/navigation";
import { useCart } from "@/common/hooks/useCart";
import { CreateFeedbackRequestsDto } from "@/common/types/api/types-from-swagger";

const ModalFeedback = () => {
  const [loading, setLoading] = useState(false);
  const { modals, toggleFeedbackModal } = useModals();
  const { cart } = useCart();

  const pathname = usePathname();

  const initialValues: CreateFeedbackRequestsDto = {
    user_address: "",
    user_full_name: "",
    user_email: "",
    content: "",
    ...modals.feedbackModal.data,
  };

  return (
    <>
      <Modal
        title="Feedback"
        className="wco-min-w-[500px]"
        isOpen={modals.feedbackModal.show}
        onClose={() => {
          toggleFeedbackModal({
            show: false,
            data: null,
          });
        }}
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              const response = await setFeedbackRequests({
                ...values,
                from_path: pathname,
                hide_content: JSON.stringify(cart),
              });

              if (response) {
                toggleFeedbackModal({
                  show: false,
                  data: null,
                });
                toast.success("Feedback sent successfully");
              } else {
                toast.error("Something went wrong. Please try again later");
              }
            } finally {
              setLoading(false);
            }
          }}
          validationSchema={validationSchema}
        >
          {() => (
            <Form className="wco-mt-8 wco-flex wco-flex-col wco-gap-5">
              <FormField
                label="Your country or address"
                name="user_address"
                component={Input}
                required
              />
              <FormField
                label="Your full name"
                name="user_full_name"
                component={Input}
                required
              />

              <FormField
                label="Your email"
                name="user_email"
                component={Input}
                required
              />

              <FormField
                label="Complete the message"
                name="content"
                component={Input}
                required
                textarea
                rows={5}
              />

              <div className="wco-flex wco-justify-end wco-gap-5">
                <Button type="submit" loading={loading}>
                  Send
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default ModalFeedback;
