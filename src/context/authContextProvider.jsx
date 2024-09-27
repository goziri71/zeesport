import React from "react";
import { createContext, useEffect, useState, useMemo } from "react";
import { AuthApis } from "../api";

export const AuthContext = createContext();
const authApis = new AuthApis();

function AuthContextProvider({ children }) {
  const [validUser, setValidUser] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await authApis.authenticator();
      console.log(response.user);
      setValidUser(response);
    })();
  }, []);

  //   const validUser = useMemo(() => user, [user]);
  //console.log("memoize " + validUser);
  return (
    <AuthContext.Provider value={{ validUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
