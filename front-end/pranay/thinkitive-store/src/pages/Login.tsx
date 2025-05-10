import LoginForm from "../components/LoginForm";
import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
const Login = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  return (
    <>
      <div className="text-center text-2xl font-bold m-3">
        {isRegistered ? "Welcome !" : "Register"}
      </div>
      <div className="flex flex-col gap-3">
        {isRegistered ? <LoginForm /> : <RegisterForm />}
        <span
          className="text-center cursor-pointer"
          onClick={() => setIsRegistered((prev) => !prev)}
        >
          {isRegistered
            ? "Don't have an account? click here to register"
            : "Already have an account? click here to login"}
        </span>
      </div>
    </>
  );
};

export default Login;
