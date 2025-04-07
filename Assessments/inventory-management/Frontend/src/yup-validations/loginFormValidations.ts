import * as Yup from "yup";

export const loginFormValidations = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format")
    .required("Please enter your email"),
  password: Yup.string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character",
    ),
});
