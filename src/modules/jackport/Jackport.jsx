import React from "react";
import "../../css/ComingSoon.css";
import AppLayout from "../../layout/AppLayout";
import SecondHeader from "../../components/SecondHeader";
import ComingSoon from "../comingsoon/ComingSoon";

function Jackport() {
  return (
    <div>
      <div className="second-header">
        <SecondHeader />
      </div>
      <ComingSoon />
    </div>
  );
}

export default Jackport;
