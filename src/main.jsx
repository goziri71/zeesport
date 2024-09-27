import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import OddContextProvider from "./context/oddContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <OddContextProvider>
      <App />
    </OddContextProvider>
  </StrictMode>
);
