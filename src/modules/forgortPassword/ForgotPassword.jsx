import React from "react";
import { useParams } from "react-router-dom";

function ForgotPassword() {
  const { id, token } = useParams();
  console.log(id, token);
  return <div>ForgotPassword</div>;
}

export default ForgotPassword;
