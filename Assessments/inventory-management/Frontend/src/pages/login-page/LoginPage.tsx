import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "./authSaga";
import { rootState } from "../../store/store";
import SmallLoader from "../../components/SmallLoader";
import { useNavigate } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginFormValidations } from "../../yup-validations/loginFormValidations";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isLoading } = useSelector(
    (state: rootState) => state.auth,
  );

  return (
    <>
      <div className={"flex justify-center items-center w-full h-full"}>
        <div className="h-fit w-fit min-w-[400px] max-w-[400px] p-5 bg-primary-white rounded-xl border-secondary-gray border-1">
          <h2 className="font-bold text-2xl text-center">Welcome</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginFormValidations}
            onSubmit={(values, actions) => {
              dispatch(loginUser({ formData: values, navigate }));
              isLoggedIn && actions.resetForm();
            }}
          >
            <Form className="flex flex-col gap-8 p-5 items-center">
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="email">Email</label>
                <Field
                  className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white"
                  placeholder="Enter your email"
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
              <div className="flex flex-col gap-3  w-full">
                <label htmlFor="password">Password</label>
                <Field
                  className="px-2 py-1 bg-tertiary-gray rounded-lg color-primary-white"
                  placeholder="Enter your password"
                  id="password"
                  name="password"
                  type="password"
                  required={true}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-xs w-full text-red-500"
                />
              </div>

              {isLoading ? (
                <SmallLoader />
              ) : (
                <Button
                  type="submit"
                  btnContent={"Login"}
                  color="primary-white"
                  bgColor="primary-orange"
                  width={"[100px]"}
                />
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
