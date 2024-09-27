import React from "react";
import { useState } from "react";
import AppLayout from "../../layout/AppLayout";
import SecondHeader from "../../components/SecondHeader";

function Football() {
  const [sportLink] = useState([
    { name: "Home", link: "/" },
    { name: "Football", link: "/football" },
    { name: "vFootball", link: "/vfootball" },
    { name: "Basketball", link: "/basketball" },
    { name: "Tennis", link: "/tennis" },
    { name: "Table Tennis", link: "/table-tennis" },
  ]);

  return (
    <div>
      <SecondHeader text={sportLink} />
      <h4>bingo</h4>
    </div>
  );
}

export default Football;
