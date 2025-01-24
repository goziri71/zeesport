import React, { useState, useContext } from "react";
import { OddContext } from "../../context/oddContext";

const NewOtpapi = ({ handleFormSubmission }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { accountSpinner, setAccountSpinner, otp, setOtp } =
    useContext(OddContext);

  console.log(accountSpinner);
  console.log(otp);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
    setIsButtonDisabled(newOtp.includes(""));
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccountSpinner(true);
    const newOtp = Number(otp.join(""));
    await handleFormSubmission(newOtp);
  };

  return (
    <form onSubmit={handleSubmit} className="otp-form">
      <div className="otp-inputs">
        {otp.map((_, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="text"
            name="otp"
            maxLength="1"
            value={otp[index]}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="otp-input"
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              marginRight: "8px",
              fontSize: "20px",
            }}
          />
        ))}
      </div>

      <button
        className={isButtonDisabled ? "invalidotpBtn" : "otpBtn"}
        type="submit"
        disabled={isButtonDisabled}
      >
        {accountSpinner ? (
          <l-dot-spinner size="12" speed="0.3" color="white"></l-dot-spinner>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default NewOtpapi;
