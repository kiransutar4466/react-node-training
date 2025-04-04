import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

const useAuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JwtPayload & { role?: string } = jwtDecode(token);
      console.log("data in use")
      if (decoded?.role === "admin") {
        navigate("/layout/admin-dashboard");
      } else if (decoded.role == 'user') {
        navigate("/");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);
};

export default useAuthRedirect;
