import React from "react";
import "../../css/home.css";
import image2 from "../../assets/images/betphoto.png";
import image3 from "../../assets/images/heropics.png";
import Hightlight from "../highlights/Hightlight";

function Hommee() {
  return (
    <div className="pupolarstructure">
      <div className="pupolarcheck">
        <div className="populartext">
          <h2>Popular</h2>
          <ul className="todaysFotbalList">
            <li>Todays Football</li>
            <li>Upcoming Games</li>
            <li>England Premier League</li>
            <li>Spain La Liga</li>
            <li>Italy Serie A</li>
            <li>Germany Bundesliga</li>
          </ul>
        </div>
        <div className="sportpics">
          <img src={image2} alt="a sport ads display" />
        </div>
        <div className="populatext2">
          <h3>Instant Registration</h3>
          <p>Make a deposit and start Betting!</p>
          <form>
            <input type="tell" placeholder="Mobile Number" />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
      <div className="sportywraper">
        <div className="sportyphoto">
          <img src={image3} alt="a betting ads" />
          <Hightlight />
        </div>
      </div>
    </div>
  );
}

export default Hommee;
