import React, { useContext } from "react";
import "../css/AppLayout.css";
import { dotSpinner } from "ldrs";
import { AuthContext } from "../context/authContextProvider";
import SecondHeader from "../components/SecondHeader";
import SkeletonLoader from "./SkeletonLoader";

function AppLayout({ children }) {
  const { validUser } = useContext(AuthContext);

  dotSpinner.register();

  return (
    <div className="layout1">
      {!validUser ? (
        <SkeletonLoader />
      ) : (
        <>
          <div className="layout2">
            <SecondHeader />
          </div>

          <div className="layout3">{children}</div>
        </>
      )}
    </div>
  );
}

export default AppLayout;
