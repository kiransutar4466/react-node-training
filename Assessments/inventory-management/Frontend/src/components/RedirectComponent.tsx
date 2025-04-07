import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";

const RedirectComponent = ({ page }: { page: ReactNode }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return !token && page;
};

export default RedirectComponent;
