import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  user_country: Yup.string().required("Country is required"),
  user_full_name: Yup.string().required("Full name is required"),
  user_email: Yup.string().email("Invalid email").required("Email is required"),
  content: Yup.string().min(5).required("Message is required"),
});
