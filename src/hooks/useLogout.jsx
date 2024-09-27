import React from "react";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem("LT");
    window.location.reload();
  };
  return { logoutUser };
}

export default useLogout;
