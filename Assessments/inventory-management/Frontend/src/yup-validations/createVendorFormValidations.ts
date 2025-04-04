import * as Yup from "yup";

export const createVendorFormValidations = Yup.object().shape({

  email: Yup.string()
    .email("Invalid email")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format")
    .required("Please enter the email"),

  contactNumber: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10,"A Phone number must have at least than 10 digits")
    .required("A phone number is required"),

  pinCode: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .required("A pincode is required")
    .min(6, "Must be exactly 6 digits")
    .max(6, "Must be exactly 6 digits"),

  firstName: Yup.string()
    .required("First Name is required")
    .max(20, "Must be less than 20 characters"),

  lastName: Yup.string()
    .required("Last Name is required")
    .max(20, "Must be less than 20 characters"),

  city: Yup.string()
    .required("City is required")
    .max(50, "Must be less than 50 characters"),

  companyName: Yup.string()
    .required("Company Name is required")
    .max(50, "Must be less than 50 characters"),

  inventoryName: Yup.string()
    .required("Inventory Name is required")
    .max(50, "Must be less than 50 characters"),
});
