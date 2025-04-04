import { useNavigate } from "react-router-dom";
import { loginInputs } from "../../constant/login_register_inputs";
import { useState } from "react";
import { loginTypes } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "./authSaga";
import loginBackGround from "../../assets/loginBackGround.png";

import { validateLoginData } from "../../utils/formValidation";
import { RootState } from "../../store/store";
import { CircularProgress } from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState<loginTypes>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateLoginData(loginData)) {
      return;
    }
    const payload = {
      data: loginData,
      navigate: navigate,
    };
    dispatch(logInUser(payload));
  };

  return (
    <div
      className="h-[100vh] w-[100%] flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBackGround})` }}
    >
      <div className="login-form w-[450px] bg-[#434343] p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-white text-2xl font-bold">Login</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          {loginInputs.map((item, index) => (
            <div key={index} className="mt-4">
              <label htmlFor={item.name} className="text-white block">
                {item.label}
              </label>
              <div className="relative">
                <input
                  className="w-full p-2 mt-2 rounded  focus:outline-none"
                  name={item.name}
                  type={
                    item.name === "password" ? (showPassword ? "text" : "password") : item.type
                  }
                  placeholder={item.placeholder}
                  onChange={handleChange}
                />
                
                {item.name === "password" && (
                  <span
                    className="absolute right-3 text-white top-[40%] transform-translate-y-[50%] cursor-pointer text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                  </span>
                )}
              </div>
            </div>
          ))}
          {/* Submit Button */}
          <button
            className="w-full text-[18px] p-2 bg-red-500 text-white mt-8 rounded-lg cursor-pointer flex justify-center items-center"
            disabled={loading}
          >
            {loading ? <CircularProgress size="20px" /> : "Login"}
          </button>
        </form>
        <p className="underline cursor-pointer text-[13px] mt-4 text-white" onClick={() => navigate('/register')}>
  Don't have an account? Register here.
</p>

      </div>
    </div>
  );
};

export default LoginPage;
