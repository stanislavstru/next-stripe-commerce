"use client";

import Modal from "../../_UI/Modal";
import { useModals } from "@/common/hooks/useModals";
import { Form, Formik } from "formik";
import FormField from "../../_UI/FormField";
import Input from "@/components/_UI/Input";
import { validationSchema } from "./validation";
import { createSubscriptionsByType } from "@/common/actions/subscriptions";
import { toast } from "react-toastify";
import { useState } from "react";
import Button from "../../_UI/Button";
import { useRouter } from "next/navigation";

const ModalSubscribe = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { modals, toggleCallbackModal } = useModals();

  const initialValues = {
    first_name: "",
    email: "",
    instagram: "",
  };

  return (
    <>
      <Modal
        title="Subscribe to our newsletter"
        className="md:wco-min-w-[500px]"
        isOpen={modals.callbackModal.show}
        onClose={toggleCallbackModal}
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={async (values) => {
            try {
              setLoading(true);

              const response = await createSubscriptionsByType({
                ...values,
                type: "news",
              });

              if (response) {
                toggleCallbackModal();
                if (modals.callbackModal.data?.routeToSuscriptionPage)
                  router.push(`/subscription?subscription-id=${response.id}`);
                toast.success("Thank you for subscribing!");
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
                label="First name"
                name="first_name"
                component={Input}
                required
              />

              <FormField
                label="Your email"
                name="email"
                component={Input}
                required
              />

              <FormField
                label="Your Instagram"
                name="instagram"
                component={Input}
              />

              <div className="wco-flex wco-justify-end wco-gap-5">
                <Button type="submit" loading={loading} uppercase>
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

export default ModalSubscribe;
