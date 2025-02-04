import React from "react";
import "../../css/ComingSoon.css";
import image1 from "../../assets/images/Zeesportlogo.png";

function ComingSoon() {
  return (
    <div>
      <div className="comingsoon">
        <div className="comingsoon-content">
          <div className="soon">
            <img src={image1} />
          </div>
          <h1>COMING</h1>
          <h5>SOON!</h5>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
