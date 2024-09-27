import React, { useContext, useEffect } from "react";
import "../css/AppLayout.css";
import Header from "./../components/Header";
import { dotSpinner } from "ldrs";
import { AuthContext } from "../context/authContextProvider";

function AppLayout({ children }) {
  const { validUser } = useContext(AuthContext);

  dotSpinner.register();

  return (
    <div className="layout1">
      {!validUser ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <l-dot-spinner size="50" speed="0.3" color="black"></l-dot-spinner>
        </div>
      ) : (
        <>
          <div className="layout2">
            <Header />
          </div>

          <div className="layout3">{children}</div>
        </>
      )}
    </div>
  );
}

export default AppLayout;
