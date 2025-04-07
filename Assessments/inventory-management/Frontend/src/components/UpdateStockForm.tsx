import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import SmallLoader from "./SmallLoader";
import Button from "./Button";
import {
  fetchProductById,
  patchProduct,
} from "../pages/product-list-page/productSaga";
import { rootState } from "../store/store";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { fetchAllLowStocks } from "../pages/low-stocks-page/lowStocksSaga";

const UpdateStockForm = ({
  id,
  closeModalCb,
}: {
  id: string;
  closeModalCb: Function;
}) => {
  const dispatch = useDispatch();
  const { isLoading, selectedProduct, isSuccess } = useSelector(
    (state: rootState) => state.product,
  );

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, []);

  return (
    <div className=" bg-primary-white rounded-xl border-1 p-5 w-fit">
      <h2 className="text-start mb-4 text-2xl font-medium">Update Stocks</h2>
      {selectedProduct?.quantity && (
        <Formik
          initialValues={{ quantity: selectedProduct?.quantity }}
          //validationSchema={prouductFromValidations}

          onSubmit={(values) => {
            if (values.quantity !== selectedProduct.quantity) {
              dispatch(
                patchProduct({
                  id,
                  formData: values,
                  dispatchAction: () =>
                    dispatch(
                      fetchAllLowStocks({ page: 1, perPage: 10, category: "" }),
                    ),
                }),
              );
              isSuccess && closeModalCb();
            } else {
              toast.error("Please update the value");
            }
          }}
        >
          <Form className="flex  w-fit">
            <div className="flex flex-col space-y-1 max-w-62 w-62 h-20 max-h-20">
              <label htmlFor="quantity">Quantity</label>
              <Field
                className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white"
                placeholder="Enter updated quantity"
                id="quantity"
                name="quantity"
                type="number"
                required={true}
                autoComplete="off"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-xs w-full text-red-500"
              />
            </div>

            <div className="flex w-full justify-center items-center">
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
      )}
    </div>
  );
};

export default UpdateStockForm;
