import React, { createContext, useState } from "react";

export const RegisterContext = createContext();

function RegisterContext({ children }) {
  const [openCreateAccount, setOpenCreateAccount] = useState(null);
  return (
    <RegisterContext.Provider value={{ setOpenCreateAccount }}>
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterContext;
