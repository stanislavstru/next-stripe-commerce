import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});
