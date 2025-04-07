import { ErrorMessage, Field, Form, Formik } from "formik";
import SmallLoader from "../../components/SmallLoader";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store/store";
import { useEffect, useState } from "react";
import {

  fetchVendorById,
  patchVendor,
} from "../manage-vendors-page/vendorSaga";
import { createVendorFormValidations } from "../../yup-validations/createVendorFormValidations";
import { createVendorPayloadType } from "../../types/slice-state-types/vendorStateTypes";
import { useNavigate } from "react-router";
import Loader from "../../components/Loader";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { isLoading, selectedVendor } = useSelector(
    (state: rootState) => state.vendor
  );
  const { userDetails } = useSelector((state: rootState) => state.auth);
  const [initialData, setInitialData] =
    useState<createVendorPayloadType | null>(null);

  useEffect(() => {
    userDetails?.id && dispatch(fetchVendorById(userDetails?.id));
  }, []);

  useEffect(() => {
    setInitialData(selectedVendor);
  }, [selectedVendor]);

  return (
    <div className="px-5 ">
      <div className="my-3">
          <h1 className="font-bold text-[18px] text-start">Settings</h1>
          <p className="text-sm cursor-pointer"><span onClick={()=>navigate('/')}>Home</span>/<span onClick={()=>navigate('/settings')}>Settings</span></p>
        </div>

      <div className="flex justify-start gap-5 p-5 items-start min-h-[500px]  mt-12">
        <div className="flex items-start justify-start h-full">
        {userDetails?.firstName && userDetails?.lastName && (
          <span className="bg-primary-orange text-primary-white border-text-dark text-2xl rounded-full h-24 w-24 text-center flex justify-center items-center font-medium border-[1px] mb-2">
            {userDetails.firstName[0] +
              userDetails.lastName[0].toLocaleUpperCase()}
          </span>
        )}
        </div>

        {initialData ? (
          <Formik
            initialValues={{
              firstName: initialData.firstName,
              lastName: initialData.lastName,
              email: initialData.email,
              companyName: initialData.companyName,
              contactNumber: initialData.contactNumber,
              city: initialData.city,
              pinCode: initialData.pinCode,
              inventoryName: initialData.inventoryName,
            }}
            validationSchema={createVendorFormValidations}
            onSubmit={(values) => {
              userDetails?.id &&
                dispatch(
                  patchVendor({
                    id: userDetails?.id,
                    formData: values,
                    dispatchAction: () => {},
                  })
                );
            }}
          >
            <Form className="flex w-fit  gap-5">
              <div className="flex flex-col gap-3 mb-4">
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
              </div>
              <div className="flex flex-col gap-3 mb-4">
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
            
              <div className="flex gap-3 flex-col mb-4">
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
                <div className="flex gap-3 justify-start items-center  h-20">
                {isLoading ? (
                  <SmallLoader />
                ) : (
                  <Button
                    type="submit"
                    btnContent={"Update Profile"}
                    color="primary-white"
                    bgColor="dark-orange"
                    width={"fit"}
                  />
                )}
              </div>
              </div>
              
            </Form>
          </Formik>
        ):<Loader/>}
      </div>
    </div>
  );
};

export default SettingsPage;
