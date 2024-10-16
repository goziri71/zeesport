import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../css/forgortPassword.css";
import { Icon } from "@iconify/react";
import { AuthApis } from "../../api";
import { useNavigate } from "react-router-dom";
import { dotSpinner } from "ldrs";

const authApi = new AuthApis();
dotSpinner.register();

function ForgotPassword() {
  const [viewPassword, setViewPassword] = useState(null);
  const [updatePassword, setUpdatePassword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();
  const [responseData, setResponseData] = useState(null);
  const [responseSpiner, setResponseSpiner] = useState(null);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setResponseSpiner(true);
    const response = await authApi.updatePassword(updatePassword, id, token);
    setResponseData(response);
    setResponseSpiner(null);
    if (response.success) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  console.log(responseData);
  return (
    <div className="parent">
      <img />
      <div>
        <h1>Create New Password</h1>
        <p>
          your new password must be defferent
          <br /> from previous used password
        </p>
        <div className="grid-parent">
          {responseData && (
            <div className="messageResponse">
              <p>{responseData?.message}</p>
            </div>
          )}

          <form onSubmit={handleUpdatePassword}>
            <label>Password</label>
            <div className="input-with-icon">
              <input
                onChange={(e) => setUpdatePassword(e.target.value)}
                type={viewPassword ? "text" : "password"}
                placeholder="New Password"
                value={updatePassword}
              />
              {viewPassword ? (
                <Icon
                  icon="codicon:eye"
                  width="1.2em"
                  height="1.2em"
                  style={{ color: "black" }}
                  onClick={() => setViewPassword(!viewPassword)}
                />
              ) : (
                <Icon
                  icon="fluent:eye-off-20-regular"
                  width="1.2em"
                  height="1.2em"
                  style={{ color: "black" }}
                  onClick={() => setViewPassword(!viewPassword)}
                />
              )}
            </div>
            <button>
              {responseSpiner ? (
                <l-dot-spinner
                  size="9"
                  speed="0.3"
                  color="white"
                ></l-dot-spinner>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
