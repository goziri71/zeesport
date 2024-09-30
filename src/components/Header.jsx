import { useState, useEffect, useContext, useReducer } from "react";
import "../css/Header.css";
import { Link } from "react-router-dom";
import image1 from "../assets/images/Nigeriaflag.png";
import CreateAcc from "../modules/createaccount/CreateAcc";
import { AuthContext } from "../context/authContextProvider";
import useLogout from "../hooks/useLogout";
import { AuthApis } from "./../api/index";
import { dotSpinner } from "ldrs";

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

dotSpinner.register();

function Header() {
  const [loginSpiner, setLoginSpiner] = useState(null);
  const { validUser } = useContext(AuthContext);
  const { logoutUser } = useLogout();
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(reducer, { email: "", password: "" });
  const [formValue, setFormValue] = useState(null);

  const handleSubmit = async (e) => {
    setLoginSpiner(true);
    e.preventDefault();
    setError(null);
    const response = await authApi.loginUser(state);
    if (response.success) {
      localStorage.setItem("LT", JSON.stringify(response.token));
      window.location.reload();
      setLoginSpiner(null);
      setUserDetails(validUser.user.firstname);
    } else {
      setError(response);
    }
    console.log(response);
  };

  console.log(validUser);

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
              <h1>ZeeSport</h1>
              <img src={image1} alt="this is the nigeria flag" />
              <p>Nigera</p>
            </div>
          </Link>

          <div className="userlogin">
            <div className="usernamestyle">
              <div>
                {validUser.success ? (
                  <h5>{validUser?.user.firstname}</h5>
                ) : null}
              </div>
              {validUser.user && (
                <button type="submit" onClick={logoutUser}>
                  Logout
                </button>
              )}
            </div>
            {(validUser.status == 400 ||
              validUser.message == "Network Error") && (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
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
                    setFormValue(e.target.value !== "" && state.email !== "");
                  }}
                  value={state.password}
                />
                <button
                  className={formValue ? "loginButton" : "loginButtonInvalid"}
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
              </form>
            )}
            <div>
              {(validUser.status == 400 ||
                validUser.message == "Network Error") && <CreateAcc />}
            </div>
          </div>
        </div>

        <div className="typesOfSport">
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
  );
}

export default Header;
