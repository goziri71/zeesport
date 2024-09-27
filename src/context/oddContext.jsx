import React, { createContext, useState } from "react";

export const OddContext = createContext();

function OddContextProvider({ children }) {
  const [data, setData] = useState(null);
  const [verifyData, setVerifyData] = useState(null);
  return (
    <OddContext.Provider value={{ setData, data, setVerifyData, verifyData }}>
      {children}
    </OddContext.Provider>
  );
}

export default OddContextProvider;
