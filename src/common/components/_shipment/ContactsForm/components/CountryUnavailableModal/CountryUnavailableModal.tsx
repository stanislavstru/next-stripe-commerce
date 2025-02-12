"use client";

import Modal from "@/common/components/_UI/Modal";
import { AVAILABLE_COUNTRY_CODES } from "@/common/config/main-client-config";
import { Form, Formik } from "formik";
import { CreateFeedbackRequestsDto } from "@/common/types/api/types-from-swagger";
import { toast } from "react-toastify";
import { setFeedbackRequests } from "@/common/actions/feedback";
import FormField from "@/common/components/_UI/FormField";
import Input from "@/common/components/_UI/Input";
import Button from "@/common/components/_UI/Button";
import { validationSchema } from "./validation";

export type CountryUnavailableModalType = {
  show: boolean;
  data: {
    title: string;
    user_full_name: string;
    user_email: string;
    user_country: string;
    user_address: string;
    user_phone: string | null;
    from_path: string;
  } | null;
};

const preparedContentMessage = ({
  user_country,
  user_address,
}: {
  user_country: string;
  user_address: string;
}) => {
  return `Greetings, Team.\n\nI am trying to place an order but I see that the country ${user_country} is not supported. Could you please contact me and arrange for personal delivery? \n\nMy address: ${user_address}\n\nThank you!`;
};

type CountryUnavailableModalProps = {
  modalData: CountryUnavailableModalType;
  onClose: () => void;
};

const initialValues: CreateFeedbackRequestsDto = {
  title: "",
  content: "",
  user_full_name: "",
  user_email: "",
  user_address: "",
  user_phone: "",
  from_path: "",
};

const CountryUnavailableModal: React.FC<CountryUnavailableModalProps> = ({
  modalData,
  onClose,
}) => {
  return (
    <Modal isOpen={modalData.show} onClose={onClose} title="Support service">
      We currently support shipping only to{" "}
      {AVAILABLE_COUNTRY_CODES.map((item) => "the " + item.label).join(", ")}.
      Please make sure to fill out the correct address or contact us here.
      <Formik
        enableReinitialize
        initialValues={{
          ...initialValues,
          content: preparedContentMessage({
            user_country: modalData.data?.user_country || "",
            user_address: modalData.data?.user_address || "",
          }),
          user_full_name: modalData.data?.user_full_name || "",
          user_email: modalData.data?.user_email || "",
          user_country: modalData.data?.user_country || "",
          user_address: modalData.data?.user_address || "",
          user_phone: modalData.data?.user_phone || "",
          from_path: modalData.data?.from_path || "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setSubmitting(true);
            const response = await setFeedbackRequests({
              title: "Country is not supported",
              content: values.content,
              user_full_name: values.user_full_name,
              user_email: values.user_email,
              user_address: values.user_address,
              user_phone: values.user_phone,
              from_path: values.from_path,
            });

            if (response) {
              toast.success("Feedback sent successfully");
              onClose();
            } else {
              toast.error("Something went wrong. Please try again later");
            }
          } finally {
            setSubmitting(false);
          }
        }}
        validationSchema={validationSchema}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="wco-mt-8 wco-flex wco-flex-col wco-gap-5">
              <FormField
                label="Your country"
                name="user_country"
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
                rows={10}
              />

              <div className="wco-flex wco-justify-end">
                <Button type="submit" loading={isSubmitting}>
                  Send
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default CountryUnavailableModal;
