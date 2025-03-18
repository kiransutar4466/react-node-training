import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHECK_AUTH } from "../redux/constants";
import { TextField } from "@mui/material";
import { rootState } from "../redux/store";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading } = useSelector(
    (state: rootState) => state.auth
  );

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch({ type: CHECK_AUTH, payload: { username: userName, password } });
  };

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  return (
    <>
      <div className="w-fit m-auto">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <TextField
            required={true}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            value={userName}
            id="outlined-basic"
            label="Username"
            variant="outlined"
          />

          <TextField
            required={true}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <input
            className="bg-blue-700 p-2 rounded-md text-amber-50 cursor-pointer"
            disabled={isLoading}
            type="submit"
            value={isLoading ? "Loading..." : "Login"}
          />
        </form>
      </div>
    </>
  );
};

export default LoginForm;
