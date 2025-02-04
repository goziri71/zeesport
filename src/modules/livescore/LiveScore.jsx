import React from "react";
import "../../css/ComingSoon.css";
import AppLayout from "../../layout/AppLayout";
import SecondHeader from "../../components/SecondHeader";
import ComingSoon from "../comingsoon/ComingSoon";

function LiveScore() {
  return (
    <div>
      <div className="second-header">
        <SecondHeader />
      </div>
      <h1>LiveScore</h1>
      <ComingSoon />
    </div>
  );
}

export default LiveScore;
