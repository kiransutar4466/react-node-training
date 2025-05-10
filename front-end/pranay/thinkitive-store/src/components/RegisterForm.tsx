import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { rootState } from "../redux/store";
import { POST_USER } from "../redux/constants";
import { TextField } from "@mui/material";

const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state: rootState) => state.user);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch({
      type: POST_USER,
      payload: { username: userName, password, email },
    });
  };

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
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            value={email}
            id="outlined-basic"
            label="Email"
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
            value={isLoading ? "Loading..." : "Submit"}
          />
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
