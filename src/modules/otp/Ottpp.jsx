import "../../css/Otp.css";
import React, { useState, useContext } from "react";
import { OddContext } from "../../context/oddContext";
import { AuthApis } from "../../api";
import NewOtpapi from "./NewOtpapi";
import { useNavigate } from "react-router-dom";

const authApis = new AuthApis();
function Ottpp() {
  const [otp] = useState("");
  const [isValid] = useState(false);
  const { verifyData } = useContext(OddContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFormSubmission = async (data) => {
    try {
      setError(null);
      console.log(data);
      const response = await authApis.verifyAccount({ otp: Number(data) });
      console.log(response);
      if (response.success) {
        localStorage.setItem("LT", JSON.stringify(response.data.token));
        navigate("/");
      }

      setError(response.response.data.error);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRequestNewOTP = async () => {
    const response = await authApis.requestNewOTP();
    if (response.success) {
      localStorage.setItem("VT", JSON.stringify(response.message.token));
    }
    console.log(response);
  };

  return (
    <div className="backgroundbody">
      <div className="otpbody">
        <div>
          <h1>Verification Code</h1>
          <h6>{verifyData?.message}</h6>
          {error && <p>{error}</p>}
          <a href="#" onClick={handleRequestNewOTP}>
            request new OTP
          </a>
          <NewOtpapi handleFormSubmission={handleFormSubmission} />
        </div>
      </div>
    </div>
  );
}

export default Ottpp;
