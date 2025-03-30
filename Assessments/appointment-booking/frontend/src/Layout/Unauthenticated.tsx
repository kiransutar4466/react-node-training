import { isLoggedIn } from "@/utils/isLoggedIn";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Unauthenticated = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn()) {
      console.log(isLoggedIn);
      navigate("/dashboard");
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Unauthenticated;
