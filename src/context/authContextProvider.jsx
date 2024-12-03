import React from "react";
import { createContext, useEffect, useState } from "react";
import { AuthApis } from "../api";

export const AuthContext = createContext();
const authApis = new AuthApis();

function AuthContextProvider({ children }) {
  const [validUser, setValidUser] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await authApis.authenticator();
      setValidUser(response);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ validUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
