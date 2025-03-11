"use client";

import React, { useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import { Formik, Form, Field, FieldProps } from "formik";
import { validationSchema } from "./validation";
import "./styles.css";
import Input from "../../_UI/Input";
import AddressField from "./components/AddressField";
import FormField from "../../_UI/FormField";
import Button from "../../_UI/Button";
import NativeSelect from "../../_UI/NativeSelect/NativeSelect";
import { getShippingMethods } from "@/common/actions/shipping";
import { useCart } from "@/common/hooks/useCart";
import type { ShipmentMethodsCalculateModalProps } from "@/common/components/_shipment/ShipmentMethodsCalculateModal/ShipmentMethodsCalculateModal";
import { toast } from "react-toastify";
import { CustomerContactDto } from "@/common/types/api/types-from-swagger";
import {
  USA_States,
  CANADA_States,
  MEXICO_States,
  SPANISH_States,
  GERMANY_States,
} from "@/common/constants/location";
import { AVAILABLE_COUNTRY_CODES } from "@/common/config/main-client-config";
import CountryUnavailableModal, {
  CountryUnavailableModalType,
} from "./components/CountryUnavailableModal/CountryUnavailableModal";
import { usePathname } from "next/navigation";
import { useConfig } from "@/common/hooks/useConfig";

const optionsStates = (countryCode: string) => {
  switch (countryCode) {
    case "US":
      return USA_States;

    case "CA":
      return CANADA_States;

    case "MX":
      return MEXICO_States;

    case "ES":
      return SPANISH_States;

    case "DE":
      return GERMANY_States;

    default:
      return [];
  }
};

export type CustomerContactValues = {
  country: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string | undefined;
  city: string;
  state: string;
  zip: string;
  phone: string | undefined;
  email: string;
};

const initialValues: CustomerContactValues = {
  country: "",
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
};

type ContactsFormProps = {
  setCustomerContact: React.Dispatch<
    React.SetStateAction<CustomerContactDto | undefined>
  >;
  setShipmentCalculatorDataModal: React.Dispatch<
    React.SetStateAction<ShipmentMethodsCalculateModalProps["modalData"]>
  >;
};

const ContactsForm: React.FC<ContactsFormProps> = ({
  setCustomerContact,
  setShipmentCalculatorDataModal,
}) => {
  const { config } = useConfig();
  const [unavailableCountryModal, setUnavailableCountryModal] =
    useState<CountryUnavailableModalType>({
      show: false,
      data: null,
    });
  const { getCartFromLocalStorage } = useCart();
  const pathname = usePathname();

  const onSubmit = async (values: CustomerContactValues) => {
    try {
      const response = await getShippingMethods({
        addressTo: {
          name: `${values.firstName} ${values.lastName}`,
          street1: `${values.address1} ${values.address2}`,
          city: values.city,
          state: values.state,
          zip: values.zip,
          country: values.country,
          phone: values.phone,
          email: values.email,
        },
        cart: getCartFromLocalStorage(),
      });

      if (response && response.rates.length > 0) {
        setShipmentCalculatorDataModal({
          show: true,
          data: response,
        });
        setCustomerContact({
          country: values.country,
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address1,
          address2: values?.address2 ?? null,
          city: values.city,
          state: values.state,
          zip: values.zip,
          phone: values?.phone ?? null,
          email: values.email,
        });
      } else {
        toast.error(
          "There are no shipping methods available for this address or we cannot process the items in your cart as a single order. Please split your cart into separate orders."
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(
        `There is a problem with the shipping calculator. Please let us know about this problem.` +
          config?.business_email
          ? ` Our email <a href='mailto:${config?.business_email}'>${config?.business_email}</a>`
          : ""
      );
    }
  };

  if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY === undefined)
    return (
      <div className="wco-flex wco-justify-center wco-items-center wco-h-96 wco-text-3xl wco-font-semibold">
        Google Maps API Key is not defined
      </div>
    );

  return (
    <>
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""}
        libraries={["places"]}
      >
        <Formik
          initialValues={{ ...initialValues }}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setSubmitting(true);
              await onSubmit(values);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ values, isSubmitting }) => {
            const onComeUnavaibleCountry = () => {
              setUnavailableCountryModal({
                show: true,
                data: {
                  title: "Customer country is not supported",
                  user_full_name: `${values.firstName}${
                    values?.lastName ? " " + values.lastName : ""
                  }`,
                  user_email: values.email,
                  user_country: values.country,
                  user_address: `${values.address1}${
                    values.address2 ? " " + values.address2 : ""
                  }, ${values.city}, ${values.state} ${values.zip} ${
                    values.country
                  }`,
                  user_phone: values.phone ?? null,
                  from_path: pathname,
                },
              });
            };

            return (
              <Form className="wco-grid wco-grid-cols-6 wco-gap-3 wco-mt-8 wco-mb-[70px]">
                <div className="wco-col-span-3">
                  <FormField
                    label="First Name"
                    name="firstName"
                    placeholder="First name"
                    component={Input}
                    required
                  />
                </div>

                <div className="wco-col-span-3">
                  <FormField
                    label="Last Name"
                    name="lastName"
                    placeholder="Last name"
                    component={Input}
                    required
                  />
                </div>

                <div className="wco-col-span-6">
                  <Field name="address1">
                    {({ form: { setValues } }: FieldProps) => (
                      <AddressField
                        values={values}
                        setValues={setValues}
                        setUnavailableCountryModal={setUnavailableCountryModal}
                      />
                    )}
                  </Field>
                </div>

                <div className="wco-col-span-6">
                  <FormField
                    label="Address 2"
                    name="address2"
                    helperText={
                      <div className="wco-text-black">
                        Enter your apartment number to see available UPS
                        delivery options.
                      </div>
                    }
                    placeholder="Apartment, suite, etc. (optional)"
                    component={Input}
                  />
                </div>

                <div className="wco-col-span-6">
                  <FormField
                    label="Country"
                    name="country"
                    helperText={
                      <div className="wco-text-black">
                        If your country is not in the list, please{" "}
                        <span
                          className="wco-text-primary wco-cursor-pointer"
                          onClick={onComeUnavaibleCountry}
                        >
                          contact us
                        </span>
                      </div>
                    }
                    render={({
                      field,
                      form,
                      isInvalid,
                    }: FieldProps & {
                      isInvalid?: boolean;
                    }) => {
                      return (
                        <NativeSelect
                          value={field?.value}
                          options={AVAILABLE_COUNTRY_CODES}
                          onChange={(value) => {
                            form.setFieldValue(field.name, value);
                          }}
                          placeholder="Country"
                          isInvalid={isInvalid}
                        />
                      );
                    }}
                  />
                </div>

                <div className="wco-col-span-2">
                  <FormField
                    label="City"
                    name="city"
                    placeholder="Your city"
                    component={Input}
                    required
                  />
                </div>

                <div className="wco-col-span-2">
                  <FormField
                    label="State"
                    name="state"
                    render={({
                      field,
                      form,
                      isInvalid,
                    }: FieldProps & {
                      isInvalid?: boolean;
                    }) => {
                      const options = optionsStates(values.country);

                      return (
                        <NativeSelect
                          value={field.value}
                          options={options}
                          onChange={(value) => {
                            form.setFieldValue(field.name, value);
                          }}
                          placeholder="State"
                          autoComplete="address-level1"
                          isInvalid={isInvalid}
                          disabled={options.length === 0}
                        />
                      );
                    }}
                    required
                  />
                </div>

                <div className="wco-col-span-2">
                  <FormField
                    label="ZIP Code"
                    name="zip"
                    placeholder="ZIP code"
                    component={Input}
                    required
                  />
                </div>

                <div className="wco-col-span-3">
                  <FormField
                    label="Phone"
                    name="phone"
                    placeholder="Phone number"
                    component={Input}
                    required
                  />
                </div>

                <div className="wco-col-span-3">
                  <FormField
                    label="Email"
                    name="email"
                    placeholder="Email"
                    component={Input}
                    required
                  />
                </div>

                <div className="wco-col-span-6 wco-mt-8 wco-flex wco-justify-end">
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    uppercase
                    variant="outline"
                  >
                    Calculate shipping
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </LoadScript>

      <CountryUnavailableModal
        modalData={unavailableCountryModal}
        onClose={() => {
          setUnavailableCountryModal({ show: false, data: null });
        }}
      />
    </>
  );
};

export default ContactsForm;
