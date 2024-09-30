import "../../css/createaccount.css";
import React, { useState, useEffect, useReducer, useContext } from "react";
import { AuthApis } from "../../api";
import { useNavigate } from "react-router-dom";
import { OddContext } from "../../context/oddContext";
import { dotSpinner } from "ldrs";

const authApi = new AuthApis();

const reducer = (state, action) => {
  switch (action.type) {
    case "FIRSTNAME":
      return { ...state, firstname: action.payload };
    case "LASTNAME":
      return { ...state, lastname: action.payload };
    case "EMAIL":
      return { ...state, email: action.payload };
    case "PASSWORD":
      return { ...state, password: action.payload };
    case "ADDRESS":
      return { ...state, address: action.payload };
    case "PHONE":
      return { ...state, phone: action.payload };
    case "DATEOFBIRTH":
      return { ...state, dateofbirth: action.payload };
    default:
      throw new Error("Invalid input");
  }
};

function CreateAcc() {
  const [openCreateAccount, setOpenCreateAccount] = useState();
  const [error, setError] = useState(null);
  const [networkError, setNetworkError] = useState(null);
  const [loading, setLoading] = useState(error);
  const [formValue, setFormValue] = useState(false);
  const { setVerifyData } = useContext(OddContext);
  const [state, dispatch] = useReducer(reducer, {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    dateofbirth: "",
  });

  const navigate = useNavigate();
  dotSpinner.register();

  const handleToggle = () => {
    setOpenCreateAccount(!openCreateAccount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setNetworkError(null);
    setFormValue(true);
    const response = await authApi.signupUser(state);
    if (response.status >= 200 && response.status < 300) {
      setLoading(false);
      if (response.data.success) {
        setError(null);
        localStorage.setItem("VT", JSON.stringify(response.data.message.token));
        setVerifyData(response.data.message);
        navigate("/verify");
      }
    } else {
      setLoading(false);
      console.log(response);
      if (response.message == "Network Error") {
        setNetworkError(response.message);
      }
      setError(response.response.data);
      setNetworkError(null);
    }
    console.log(response);

    console.log(state, "empty");
    setLoading(false);
  };

  return (
    <div className="containerbody">
      <button className="registerButton" onClick={handleToggle}>
        Register
      </button>
      {openCreateAccount ? (
        <div className="registerCase">
          <div className="formCase">
            <h4>Register</h4>
            <form className="formFlex" onSubmit={handleSubmit}>
              <div>
                <input
                  onChange={(e) =>
                    dispatch({ type: "FIRSTNAME", payload: e.target.value })
                  }
                  name="firstName"
                  value={state.firstname}
                  type="text"
                  placeholder="first Name"
                />

                <input
                  onChange={(e) =>
                    dispatch({ type: "LASTNAME", payload: e.target.value })
                  }
                  name="lastName"
                  value={state.lastname}
                  type="text"
                  placeholder="last Name"
                />
              </div>

              <div>
                <input
                  onChange={(e) =>
                    dispatch({ type: "EMAIL", payload: e.target.value })
                  }
                  name="email"
                  value={state.email}
                  type="text"
                  placeholder="Email"
                />
                <input
                  onChange={(e) =>
                    dispatch({ type: "PASSWORD", payload: e.target.value })
                  }
                  name="password"
                  value={state.password}
                  type="password"
                  placeholder="Password"
                />
              </div>

              <div>
                <input
                  onChange={(e) =>
                    dispatch({ type: "PHONE", payload: e.target.value })
                  }
                  name="phone"
                  value={state.phone}
                  type="number"
                  placeholder="Phone Number"
                />

                <input
                  onChange={(e) =>
                    dispatch({ type: "ADDRESS", payload: e.target.value })
                  }
                  name="address"
                  value={state.address}
                  type="text"
                  placeholder="Address"
                />
              </div>

              <div className="dobcase">
                <input
                  onChange={(e) => {
                    dispatch({ type: "DATEOFBIRTH", payload: e.target.value });
                    setFormValue(
                      e.target.value !== "" &&
                        state.dateofbirth !== "" &&
                        state.firstname &&
                        state.lastname &&
                        state.phone &&
                        state.email &&
                        state.password &&
                        state.address
                    );
                  }}
                  name="dateofbirth"
                  value={state.dateofbirth}
                  type="number"
                  placeholder="DOB"
                />
              </div>

              <button
                className={formValue ? "submitbutton" : "invalidSubmitBtn"}
                type="submit"
                disabled={!formValue}
              >
                {loading ? (
                  <l-dot-spinner
                    size="22"
                    speed="0.3"
                    color="white"
                  ></l-dot-spinner>
                ) : (
                  "Create New Account"
                )}
              </button>
            </form>
            <div className="loadingspiner">
              {error && <h1>{error?.error}</h1>}
            </div>
            <div className="loadingspiner">
              {networkError && <h1>{networkError}</h1>}
            </div>
          </div>
          <p>
            By creating an account, you agree to our Terms & Conditions and
            confirm that you are at least 18 years old or over and all
            information given is true.
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default CreateAcc;
