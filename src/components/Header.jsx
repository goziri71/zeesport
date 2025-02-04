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
  const [mobileView, setMobileView] = useState(false);
  const [myAccount, setMyAccount] = useState(true);
  const [state, dispatch] = useReducer(reducer, { email: "", password: "" });
  const [formValue, setFormValue] = useState(null);
  const [dropDown, setDropDown] = useState(true);
  const [loginDisplay, setLoginDisplay] = useState(null);
  const [forgotpassword, setForgotpassword] = useState(null);
  const [resetState, dispatchState] = useReducer(reducer2, { email: "" });
  const [resetStateLoader, setReseatStateLoader] = useState(null);
  const [resetErrorMesage, setResetErrorMesage] = useState(null);
  const [updateMessagebgc, setUpdateMessagebgc] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isAccountDropDown, setIsAccountDropDown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!state.email || !state.password) {
      setError({
        response: { data: { error: "Email and password are required." } },
      });
      setTimeout(() => {
        setError(null);
      }, 1000);
      return;
    }
    setLoginSpiner(true);
    const response = await authApi.loginUser(state);
    if (response.success) {
      localStorage.setItem("LT", JSON.stringify(response.token));
      window.location.reload();
      setLoginSpiner(null);
      // setUserDetails(validUser.user.firstname);
    } else {
      setError(response);
      setLoginSpiner(null);
      setTimeout(() => {
        setError(null);
      }, 4000);
    }
  };

  const handleSideBar = () => {
    setMobileView(true);
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
            <div
              className={`headerText ${
                !validUser?.success ? "headerstyleup" : ""
              }`}
            >
              <img src={image1} alt="this is zee sport logo" />
            </div>
          </Link>

          <div className="userlogin">
            {validUser?.success && (
              <>
                <p className="balance">
                  NGN{" "}
                  <span className="amount">{`${validUser?.user.balance}`}</span>
                </p>
                <div
                  onMouseOver={() => {
                    setIsAccountDropDown(true);
                  }}
                  onMouseOut={() => {
                    setIsAccountDropDown(false);
                  }}
                  className={`usernamestyle ${
                    myAccount ? "usernamestyleclear" : ""
                  }`}
                >
                  {validUser?.success && (
                    <div className="profileandBalnce">
                      <span>My Account</span>
                      <Icon
                        icon="mynaui:chevron-down-solid"
                        width="15"
                        height="15"
                        style={{ color: "#fff" }}
                      />
                    </div>
                  )}
                  {isAccountDropDown && (
                    <div
                      onMouseOver={() => {
                        setIsAccountDropDown(true);
                      }}
                      onMouseOut={() => {
                        setIsAccountDropDown(false);
                      }}
                      className="userDisplayborder"
                    >
                      {validUser?.success && (
                        <div className="profileAlign">
                          <Icon
                            icon="ix:user-profile-filled"
                            width="20"
                            height="20"
                            style={{ color: "#ffffff", marginBottom: "0px" }}
                          />
                          <h5>{validUser?.user.firstname.toUpperCase()}</h5>
                        </div>
                      )}
                      {validUser?.user && (
                        <div
                          className="button"
                          type="submit"
                          onClick={logoutUser}
                        >
                          Logout
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}

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
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={(e) => {
                        dispatch({
                          type: "PASSWORD",
                          payload: e.target.value,
                        });
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
                          size="10"
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
                {(validUser?.status == 400 ||
                  validUser?.message == "Network Error") && (
                  <button
                    className="loginbtndisplay"
                    onClick={() => {
                      setLoginDisplay(!loginDisplay);
                    }}
                  >
                    Login
                  </button>
                )}
              </div>
              <div>
                {(validUser?.status == 400 ||
                  validUser?.message == "Network Error") && <CreateAcc />}
              </div>
            </div>
          </div>
        </div>
        <div className={`mobileSideBar ${dropDown ? "mobileSideBarhide" : ""}`}>
          <div
            className={dropDown ? "typesOfSport" : "typesOfSporthidedisplay"}
          >
            <div className="typsofsportdiv">
              <>
                {validUser?.success && mobileView && (
                  <div className="profileAlign">
                    <Icon
                      icon="ix:user-profile-filled"
                      width="30"
                      height="30"
                      style={{ color: "#fff", marginBottom: "-10px" }}
                    />
                    <h5>
                      {validUser?.user.firstname.charAt(0).toUpperCase() +
                        validUser?.user.firstname.slice(1).toLowerCase()}
                    </h5>
                  </div>
                )}
              </>
              <Link className="sportFocus" to="/">
                {mobileView && (
                  <Icon
                    icon="ic:baseline-sports-basketball"
                    width="15"
                    height="15"
                    style={{ marginRight: "20", color: "#fff" }}
                  />
                )}
                Sport
              </Link>
              <Link className="sportFocus" to="/Casino">
                {mobileView && (
                  <Icon
                    icon="maki:casino"
                    width="15"
                    height="15"
                    style={{ marginRight: "20", color: "#fff" }}
                  />
                )}
                Casino
              </Link>
              <Link className="sportFocus" to="/LiveBetting">
                {mobileView && (
                  <Icon
                    icon="mingcute:live-line"
                    width="15"
                    height="15"
                    style={{ marginRight: "20", color: "#fff" }}
                  />
                )}
                LiveBetting
              </Link>
              <Link className="sportFocus" to="/SchedulVirtual">
                {mobileView && (
                  <Icon
                    icon="eos-icons:virtual-guest"
                    width="15"
                    height="15"
                    style={{ marginRight: "20", color: "#fff" }}
                  />
                )}
                SchedulVirtual
              </Link>
              <Link className="sportFocus" to="/Jackport">
                {mobileView && (
                  <Icon
                    icon="game-icons:card-jack-clubs"
                    width="15"
                    height="15"
                    style={{ marginRight: "20", color: "#fff" }}
                  />
                )}
                Jackport
              </Link>
              <Link className="sportFocus" to="/LiveScore">
                {mobileView && (
                  <Icon
                    icon="ic:baseline-sports-score"
                    width="15"
                    height="15"
                    style={{ marginRight: "20", color: "#fff" }}
                  />
                )}
                Livescore
              </Link>
              <Link className="sportFocus" to="/Result">
                {mobileView && (
                  <Icon
                    icon="carbon:result-old"
                    width="15"
                    height="15"
                    style={{ marginRight: "20", color: "#fff" }}
                  />
                )}
                Result
              </Link>
              {validUser?.success && mobileView && (
                <div className="usernamestyle">
                  <div className="userDisplayborder">
                    <Icon
                      icon="majesticons:logout"
                      width="15"
                      height="15"
                      style={{
                        marginRight: "16",
                        marginLeft: "8",
                        marginTop: "20",
                        color: "#fff",
                      }}
                    />
                    {validUser?.success && (
                      <div
                        className="button"
                        type="submit"
                        onClick={logoutUser}
                      >
                        Logout
                      </div>
                    )}
                  </div>
                </div>
              )}
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
    </div>
  );
}

export default Header;
