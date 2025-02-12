import * as Yup from "yup";
import { AVAILABLE_COUNTRY_CODES } from "@/common/config/main-client-config";

export const validationSchema = Yup.object({
  country: Yup.string()
    .oneOf(
      AVAILABLE_COUNTRY_CODES.map((country) => country.value),
      "Please select a country"
    )
    .required("Required field"),
  firstName: Yup.string().required("Required field"),
  lastName: Yup.string().required("Required field"),
  email: Yup.string().email("Invalid email").required("Required field"),
  phone: Yup.string()
    .matches(
      /^(\+?[1-9]\d{0,2})?\s?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      "Invalid phone number"
    )
    .required("Phone is required"),
  address1: Yup.string().required("Required field"),
  city: Yup.string().required("Required field"),
  state: Yup.string().required("Required field"),
  zip: Yup.string().required("Required field"),
});
