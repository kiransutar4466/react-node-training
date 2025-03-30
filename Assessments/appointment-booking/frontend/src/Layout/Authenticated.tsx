import { Navbar } from "@/components/navbar";
import { isLoggedIn } from "@/utils/isLoggedIn";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Authenticated = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/");
    }
  });

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Authenticated;
