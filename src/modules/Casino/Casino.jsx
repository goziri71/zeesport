import React, { useState } from "react";
import AppLayout from "../../layout/AppLayout";
import SecondHeader from "../../components/SecondHeader";

function Casino() {
  const [sportLink] = useState([]);

  return (
    <div>
      <SecondHeader text={sportLink} />
      <h1>Casino</h1>
    </div>
  );
}

export default Casino;
