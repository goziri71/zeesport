import "./css/App.css";
import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import AuthContextProvider from "./context/authContextProvider";

function App() {
  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}

export default App;
