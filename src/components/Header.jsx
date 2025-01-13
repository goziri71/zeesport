import { useState, useEffect, useContext, useReducer } from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import image1 from "../assets/images/ZeeSportlogo.png";
import CreateAcc from "../modules/createaccount/CreateAcc";
import { AuthContext } from "../context/authContextProvider";
import useLogout from "../hooks/useLogout";
import { AuthApis } from "./../api/index";
import { dotSpinner } from "ldrs";
import { Icon } from "@iconify/react";

const authApi = new AuthApis();
const reducer = (state, action) => {
  switch (action.type) {
    case "EMAIL":
      return { ...state, email: action.payload };
    case "PASSWORD":
      return { ...state, password: action.payload };
    default:
      throw new Error("invalid input");
  }
};

const reducer2 = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
  }
};

dotSpinner.register();

function Header() {
  const [loginSpiner, setLoginSpiner] = useState(null);
  const { validUser } = useContext(AuthContext);
  const { logoutUser } = useLogout();
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(reducer, { email: "", password: "" });
  const [formValue, setFormValue] = useState(null);
  const [dropDown, setDropDown] = useState(true);
  const [loginDisplay, setLoginDisplay] = useState(null);
  const [forgotpassword, setForgotpassword] = useState(null);
  const [resetState, dispatchState] = useReducer(reducer2, { email: "" });
  const [resetStateLoader, setReseatStateLoader] = useState(null);
  const [resetErrorMesage, setResetErrorMesage] = useState(null);
  const [updateMessagebgc, setUpdateMessagebgc] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!state.email || !state.password) {
      setError({
        response: { data: { error: "Email and password are required." } },
      });
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    setLoginSpiner(true);
    const response = await authApi.loginUser(state);
    if (response.success) {
      localStorage.setItem("LT", JSON.stringify(response.token));
      window.location.reload();
      setLoginSpiner(null);
      setUserDetails(validUser.user.firstname);
    } else {
      setError(response);
      setLoginSpiner(null);
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
    console.log(response);
  };

  const handleSideBar = () => {
    setDropDown(!dropDown);
  };

  const handlerest_password = async (e) => {
    e.preventDefault();
    setResetErrorMesage(null);
    setReseatStateLoader(true);
    console.log(resetState.email);
    const response = await authApi.resetPassword(resetState.email);
    if (response) {
      setResetErrorMesage(response);
      setUpdateMessagebgc(response.success);
      setReseatStateLoader(null);
    }
  };

  useEffect(() => {
    (() => {
      setTimeout(() => {
        window.location.reload;
      }, 200);
    })();
  }, []);

  return (
    <div className="headerBgColor">
      <div>
        <div className="header">
          <Link to="/">
            <div className="headerText">
              <img src={image1} alt="this is zee sport logo" />
            </div>
          </Link>

          <div className="userlogin">
            <div className="usernamestyle">
              <div>
                {validUser?.success ? (
                  <h5>{validUser?.user.firstname.slice(0, 2)}</h5>
                ) : null}
              </div>
              {validUser?.user && (
                <button type="submit" onClick={logoutUser}>
                  Logout
                </button>
              )}
            </div>
            {(validUser?.status == 400 ||
              validUser?.message == "Network Error") && (
              <div className="login-forgetpassword-box">
                <form
                  className={!loginDisplay ? "formbreak" : "formbreakhide"}
                  onSubmit={handleSubmit}
                >
                  <div className="formedite">
                    {error && (
                      <div className="texterrordisplay">
                        <p>{error.response.data.error}</p>
                      </div>
                    )}
                    <input
                      type="email"
                      placeholder="Email"
                      onChange={(e) => {
                        dispatch({ type: "EMAIL", payload: e.target.value });
                      }}
                      value={state.email}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        dispatch({ type: "PASSWORD", payload: e.target.value });
                        setFormValue(
                          e.target.value !== "" && state.email !== ""
                        );
                      }}
                      value={state.password}
                    />
                    <button
                      className={
                        formValue ? "loginButton" : "loginButtonInvalid"
                      }
                      type="submit"
                    >
                      {loginSpiner ? (
                        <l-dot-spinner
                          size="9"
                          speed="0.3"
                          color="white"
                        ></l-dot-spinner>
                      ) : (
                        "Login"
                      )}
                    </button>
                  </div>
                </form>
                <div
                  className={
                    !loginDisplay ? "forgotpasword" : "forgotpasswordshow"
                  }
                >
                  <p
                    onClick={() => {
                      setForgotpassword(!forgotpassword);
                    }}
                  >
                    Forgot Password?
                  </p>
                </div>
                {forgotpassword && (
                  <div className="forgot_Password">
                    <div className="forgotpassword_child">
                      <div
                        className="icon_icon"
                        onClick={() => {
                          setForgotpassword(null);
                          setResetErrorMesage(null);
                          setReseatStateLoader(null);
                        }}
                      >
                        <Icon
                          icon="weui:close-filled"
                          width="1.2em"
                          height="1.2em"
                        />
                      </div>

                      <div className="forgot_input">
                        <div
                          className={
                            updateMessagebgc
                              ? "forgot_err-message_success"
                              : "forgot_errz-message"
                          }
                        >
                          {resetErrorMesage && (
                            <h5>
                              {resetErrorMesage.error ||
                                resetErrorMesage.message}
                            </h5>
                          )}
                        </div>
                        <p>
                          To reset your password, please confirm your account
                          first.
                        </p>
                        <form onSubmit={handlerest_password}>
                          <label>Email Address</label>
                          <input
                            required
                            onChange={(e) =>
                              dispatchState({
                                type: "email",
                                payload: e.target.value,
                              })
                            }
                            type="email"
                            placeholder="email address"
                            value={resetState.email}
                          />
                          <button>
                            {resetStateLoader ? (
                              <l-dot-spinner
                                size="9"
                                speed="0.3"
                                color="white"
                              ></l-dot-spinner>
                            ) : (
                              "Submit"
                            )}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="logincreate_acc">
              <div>
                <button
                  className="loginbtndisplay"
                  onClick={() => {
                    setLoginDisplay(!loginDisplay);
                  }}
                >
                  Login
                </button>
              </div>
              <div>
                {(validUser?.status == 400 ||
                  validUser?.message == "Network Error") && <CreateAcc />}
              </div>
            </div>
          </div>
        </div>

        <div className={dropDown ? "typesOfSport" : "typesOfSporthidedisplay"}>
          <div className="typsofsportdiv">
            <Link className="sportFocus" to="/">
              Sport
            </Link>
            <Link className="sportFocus" to="/Casino">
              Casino
            </Link>
            <Link className="sportFocus" to="/LiveBetting">
              LiveBetting
            </Link>
            <Link className="sportFocus" to="/SchedulVirtual">
              SchedulVirtual
            </Link>
            <Link className="sportFocus" to="/Jackport">
              Jackport
            </Link>
            <Link className="sportFocus" to="/LiveScore">
              Livescore
            </Link>
            <Link className="sportFocus" to="/Result">
              Result
            </Link>
          </div>
        </div>
      </div>
      <div className="iconebar">
        <div onClick={handleSideBar}>
          <Icon
            icon={
              dropDown
                ? "material-symbols:menu"
                : "line-md:menu-to-close-alt-transition"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
