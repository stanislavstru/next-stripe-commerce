"use client";

import Modal from "../../_UI/Modal";
import { useModals } from "@/common/hooks/useModals";
import { Form, Formik } from "formik";
import FormField from "../../_UI/FormField";
import Input from "@/components/_UI/Input";
import { validationSchema } from "./validation";
import { createPreOrder } from "@/common/actions/pre-orders";
import { toast } from "react-toastify";
import { useState } from "react";
import Button from "../../_UI/Button";
import Label from "../../_UI/Label/Label";
import QuantityInput from "../../_UI/QuantityInput";

const ModalPreorder = () => {
  const [loading, setLoading] = useState(false);
  const { modals, togglePreorderModal } = useModals();

  const initialValues = {
    product_quantity: 1,
    user_address: "",
    user_full_name: "",
    user_email: "",
    content: "",
  };

  return (
    <>
      <Modal
        title={`Pre-order for ${modals.preorderModal.data?.product.title}`}
        className="wco-max-w-[450px]"
        isOpen={modals.preorderModal.show}
        onClose={() => {
          togglePreorderModal({
            show: false,
            data: null,
          });
        }}
      >
        <div>
          Please leave your suggestion and contact details, and we will get in
          touch with you to make arrangements, even if we do not deliver to your
          address.
        </div>

        <Formik
          enableReinitialize
          initialValues={{ ...initialValues, ...modals.preorderModal.data }}
          onSubmit={async (values) => {
            try {
              if (!modals.preorderModal.data?.product) {
                toast.error("Something went wrong. Please try again later");
                return;
              }

              setLoading(true);

              console.log({
                ...values,
                product: modals.preorderModal.data?.product,
              });

              const response = await createPreOrder({
                ...values,
                product: modals.preorderModal.data?.product,
              });

              if (response) {
                togglePreorderModal({
                  show: false,
                  data: null,
                });
                toast.success(
                  "Your message has been successfully sent. We will contact you soon"
                );
              } else {
                toast.error("Something went wrong. Please try again later");
              }
            } finally {
              setLoading(false);
            }
          }}
          validationSchema={validationSchema}
        >
          {({ setFieldValue }) => (
            <Form className="wco-mt-8 wco-flex wco-flex-col wco-gap-5">
              <div className="wco-flex wco-flex-col wco-gap-1.5 ">
                <Label label="Quantity of product" />
                <FormField
                  name="product_quantity"
                  render={(args: any) => (
                    <QuantityInput
                      value={args.field.value}
                      onChange={(value) => {
                        setFieldValue(args.field.name, value);
                      }}
                      max={99}
                    />
                  )}
                />
              </div>
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
                label="Your question or suggestion"
                name="content"
                component={Input}
                required
                textarea
                rows={5}
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

export default ModalPreorder;
