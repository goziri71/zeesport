import React, { createContext, useState } from "react";

export const RegisterAccountContext = createContext();

function RegisterContext({ children }) {
  const [openCreateAccount, setOpenCreateAccount] = useState(null);
  return (
    <RegisterAccountContext.Provider value={{ setOpenCreateAccount }}>
      {children}
    </RegisterAccountContext.Provider>
  );
}

export default RegisterContext;
