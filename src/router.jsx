import { createBrowserRouter } from "react-router-dom";
import Sport from "./modules/home/Sport";
import AppLayout from "./layout/AppLayout";
import Casino from "./modules/Casino/Casino";
import LiveBetting from "./modules/livebetting/LiveBetting";
import SchedulVirtual from "./modules/schedulvirtual/SchedulVirtual";
import Jackport from "./modules/jackport/Jackport";
import Result from "./modules/result/Result";
import Hommee from "./modules/home/Hommee";
import Football from "./modules/football/Football";
import LiveScore from "./modules/livescore/LiveScore";
import Ottpp from "./modules/otp/Ottpp";
import ForgotPassword from "./modules/forgortPassword/ForgotPassword";
import BettingSlip from "./modules/highlights/BettingSlip";
import ListOfBettingHistory from "./modules/bettinghistgory/ListOfBesttingHistory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Sport />,
  },
  {
    path: "/Hommee",
    element: <Hommee />,
  },
  {
    path: "/Football",
    element: <Football />,
  },
  {
    path: "/Casino",
    element: <Casino />,
  },
  {
    path: "/LiveBetting",
    element: <LiveBetting />,
  },
  {
    path: "/SchedulVirtual",
    element: <SchedulVirtual />,
  },
  {
    path: "/Jackport",
    element: <Jackport />,
  },
  {
    path: "/Result",
    element: <Result />,
  },
  {
    path: "/Livescore",
    element: <LiveScore />,
  },
  {
    path: "/verify",
    element: <Ottpp />,
  },
  {
    path: "/ListOfBettingHistory",
    element: <ListOfBettingHistory />,
  },
  {
    path: "/reset/password/:id/:token",
    element: <ForgotPassword />,
  },
  {
    path: "*",
    element: (
      <>
        <h2>404 Page Not found</h2>,
      </>
    ),
  },
]);
