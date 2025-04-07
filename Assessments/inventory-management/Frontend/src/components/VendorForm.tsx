import { ErrorMessage, Field, Formik, Form } from "formik";
import SmallLoader from "./SmallLoader";
import Button from "./Button";
import { createVendorFormValidations } from "../yup-validations/createVendorFormValidations";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllVendors,
  patchVendor,
  postVendor,
} from "../pages/manage-vendors-page/vendorSaga";
import { rootState } from "../store/store";

const VendorForm = ({
  title,
  id,
  initialData,
}: {
  title: string;
  id?: string;
  initialData?: any;
}) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state: rootState) => state.vendor);

  return (
    <div className=" bg-primary-white rounded-xl border-1 p-5 w-fit">
      <h2 className="text-start mb-4 text-2xl font-medium">{title}</h2>
      <Formik
        initialValues={
          initialData
            ? initialData
            : {
                firstName: "",
                lastName: "",
                email: "",
                companyName: "",
                contactNumber: "",
                city: "",
                pinCode: "",
                inventoryName: "",
              }
        }
        validationSchema={createVendorFormValidations}
        onSubmit={(values, actions) => {
          if (title == "Edit Vendor" && id) {
            dispatch(
              patchVendor({
                id,
                formData: values,
                dispatchAction: () => {
                  actions.resetForm();
                  dispatch(
                    fetchAllVendors({
                      page: 1,
                      searchQuery: "",
                      perPage: 10,
                    }),
                  );
                },
              }),
            );
          } else if (title == "Add Vendor") {
            console.log(values);
            dispatch(
              postVendor({
                formData: values,
                dispatchAction: () => {
                  actions.resetForm();
                  dispatch(
                    fetchAllVendors({
                      page: 1,
                      searchQuery: "",
                      perPage: 10,
                    }),
                  );
                },
              }),
            );
          }
        }}
      >
        <Form className="flex flex-col w-fit">
          <div className="flex gap-3 mb-4">
            <div className="flex flex-col space-y-1 max-w-62 w-62 h-20 max-h-20">
              <label htmlFor="firstName">First Name</label>
              <Field
                className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white"
                placeholder="Enter first name"
                id="firstName"
                name="firstName"
                type="text"
                required={true}
                autoComplete="off"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-xs w-full text-red-500"
              />
            </div>
            <div className="flex flex-col gap-1max-w-62 w-62 h-20 max-h-20">
              <label htmlFor="lastName">Last Name</label>
              <Field
                className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white"
                placeholder="Enter last name"
                id="lastName"
                name="lastName"
                type="text"
                required={true}
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-xs w-full text-red-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mb-4">
            <div className="flex flex-col gap-1 max-w-62 w-62 h-20 max-h-20">
              <label htmlFor="email">Email</label>
              <Field
                className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white"
                placeholder="Enter email"
                id="email"
                name="email"
                type="email"
                required={true}
                autoComplete="off"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-xs w-full text-red-500"
              />
            </div>
            <div className="flex flex-col gap-1 max-w-62 w-62 h-20 max-h-20">
              <label htmlFor="contactNumber">Contact Number</label>
              <Field
                className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white"
                placeholder="Enter phone number"
                id="contactNumber"
                name="contactNumber"
                type="text"
                required={true}
              />
              <ErrorMessage
                name="contactNumber"
                component="div"
                className="text-xs w-full text-red-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mb-4">
            <div className="flex flex-col gap-1 max-w-62 w-62 h-20 max-h-20">
              <label htmlFor="companyName">Company Name</label>
              <Field
                className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white"
                placeholder="Enter company name"
                id="companyName"
                name="companyName"
                type="text"
                required={true}
                autoComplete="off"
              />
              <ErrorMessage
                name="companyName"
                component="div"
                className="text-xs w-full text-red-500"
              />
            </div>
            <div className="flex flex-col gap-1 max-w-62 w-62 h-20 max-h-20">
              <label htmlFor="inventoryName">Inventory Name</label>
              <Field
                className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white"
                placeholder="Enter inventory name"
                id="inventoryName"
                name="inventoryName"
                type="text"
                required={true}
              />
              <ErrorMessage
                name="inventoryName"
                component="div"
                className="text-xs w-full text-red-500"
              />
            </div>
          </div>
          <div className="flex gap-3 mb-4">
            <div className="flex flex-col gap-1 max-w-62 w-62 h-20 max-h-20">
              <label htmlFor="city">City</label>
              <Field
                className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white"
                placeholder="Enter city"
                id="city"
                name="city"
                type="text"
                required={true}
                autoComplete="off"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-xs w-full text-red-500"
              />
            </div>
            <div className="flex flex-col gap-1 max-w-62 w-62 h-20 max-h-20">
              <label htmlFor="pinCode">Pincode</label>
              <Field
                className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white"
                placeholder="Enter pincode"
                id="pinCode"
                name="pinCode"
                type="text"
                required={true}
              />
              <ErrorMessage
                name="pinCode"
                component="div"
                className="text-xs w-full text-red-500"
              />
            </div>
          </div>
          <div className="flex w-full justify-end items-center">
            {isLoading ? (
              <SmallLoader />
            ) : (
              <Button
                type="submit"
                btnContent={"Submit"}
                color="primary-white"
                bgColor="dark-orange"
                width={"[100px]"}
              />
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default VendorForm;
