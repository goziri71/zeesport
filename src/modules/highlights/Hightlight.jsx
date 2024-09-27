import React, { useState } from "react";
import "../../css/Highlight.css";
import BettingSlip from "./BettingSlip";
import MatchList from "../Matchlist/MatchList";

function Hightlight() {
  return (
    <div className="hightcasing">
      <div className="highltbox">
        <div className="liveactive">
          <span className="colorlivebetting"></span>
          <span>Live Betting</span>
        </div>
        <div className="thirdnavbar">
          <ul>
            <li>Football</li>
            <li>vFootball</li>
            <li>Besketball</li>
            <li>Tennis</li>
            <li>Table Tennis</li>
            <select className="selestoption">
              <option>More Sport</option>
              <option>eFootball</option>
              <option>eBasketball</option>
              <option>Ice hockey</option>
              <option>Volleyball</option>
              <option>Baseball</option>
              <option>American...</option>
              <option>Cricket</option>
              <option>Darts</option>
              <option>Badminton</option>
              <option>Rugby</option>
              <option>Snooker</option>
              <option>Counter-S...</option>
              <option>Dota 2</option>
              <option>League of...</option>
            </select>
          </ul>
          <hr className="betlin" />
        </div>
        <MatchList />
      </div>

      <div className="bettingwidth">
        <BettingSlip awaysInfo={BettingSlip} />
      </div>
    </div>
  );
}

export default Hightlight;
