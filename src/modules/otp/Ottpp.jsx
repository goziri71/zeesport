import "../../css/Otp.css";
import React, { useState, useContext } from "react";
import { OddContext } from "../../context/oddContext";
import { AuthApis } from "../../api";
import NewOtpapi from "./NewOtpapi";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/images/ZeeSportlogo.png";

const authApis = new AuthApis();
function Ottpp() {
  const [otp] = useState("");
  const [isValid] = useState(false);
  const { verifyData, setVerifyData, setAccountSpinner, setOtp } =
    useContext(OddContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  const handleFormSubmission = async (data) => {
    setShowError(false);
    try {
      setError(null);
      setVerifyData(null);
      console.log(data);
      const response = await authApis.verifyAccount({ otp: Number(data) });
      setShowError(true);
      console.log(response);
      if (response.success) {
        localStorage.setItem("LT", JSON.stringify(response.data.token));
        navigate("/");
      }

      setError(response.response.data.error);
      setAccountSpinner(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleRequestNewOTP = async () => {
    setError(null);
    setVerifyData(null);
    setOtp(["", "", "", "", "", ""]);
    const response = await authApis.requestNewOTP();
    if (response.success) {
      localStorage.setItem("VT", JSON.stringify(response.message.token));
    }
    console.log(response);
    setVerifyData(response.message);
  };

  return (
    <>
      <div className="backgroundbody">
        <div className="logo">
          <img src={image1} alt="this is zee sport logo" />
        </div>
        <div className="otpbody">
          <div>
            <span className={`errorstyleing ${showError ? "show" : ""}`}>
              {error && <p>{error}</p>}
            </span>
            <h1>Verification Code</h1>
            <h6>{verifyData?.message}</h6>
            <a href="#" onClick={handleRequestNewOTP}>
              request new OTP
            </a>
            <NewOtpapi handleFormSubmission={handleFormSubmission} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Ottpp;
