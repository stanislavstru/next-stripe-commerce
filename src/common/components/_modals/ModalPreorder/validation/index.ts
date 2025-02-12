import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  user_full_name: Yup.string().required("Name is required"),
  user_address: Yup.string().required("Country is required"),
  user_email: Yup.string().email("Invalid email").required("Email is required"),
  content: Yup.string().required("Message is required"),
});
