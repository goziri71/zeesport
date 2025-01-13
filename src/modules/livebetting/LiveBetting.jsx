// LiveBetting.js
import React, { useState } from "react";
import "../../css/LiveBetting.css";
import SecondHeader from "../../components/SecondHeader";

const LiveBetting = () => {
  const [sportLink] = useState([]);
  return (
    <div className="backGC">
      <div className="second-header">
        <SecondHeader text={sportLink} />
      </div>
      <div className="live-betting">
        <div className="header">
          <h1>FC Jerusalem vs FC Tzeirey Tira</h1>
          <button className="deposit-button">
            Make a Deposit and Start Betting!
          </button>
        </div>

        {/* Navigation */}
        <div className="navigation">
          <nav>
            <button className="nav-button active">Match Tracker</button>
            <button className="nav-button">Statistics</button>
          </nav>
        </div>

        {/* Match Info */}
        <div className="match-info">
          <div className="team">
            <div className="team-logo"></div>
            <span>FC Jerusalem</span>
          </div>
          <div className="match-time">
            <span className="clock-icon">⏰</span>
            03 JAN | 11:00
          </div>
          <div className="team">
            <span>FC Tzeirey Tira</span>
            <div className="team-logo"></div>
          </div>
        </div>

        {/* Football Pitch */}
        <div className="pitch-container">
          <div className="pitch">
            {/* Center elements */}
            <div className="center-circle"></div>
            <div className="center-line"></div>

            {/* Penalty areas */}
            <div className="penalty-area-left"></div>
            <div className="penalty-area-right"></div>

            {/* Goal areas */}
            <div className="goal-area-left"></div>
            <div className="goal-area-right"></div>

            {/* Goals */}
            <div className="goal-left"></div>
            <div className="goal-right"></div>

            {/* Corner arcs */}
            <div className="corner-arc corner-top-left"></div>
            <div className="corner-arc corner-top-right"></div>
            <div className="corner-arc corner-bottom-left"></div>
            <div className="corner-arc corner-bottom-right"></div>
          </div>
        </div>
        {/* Timeline */}
        <div className="timeline">
          <div className="progress-bar">
            <div className="progress"></div>
          </div>
          <div className="time-markers">
            <span>0</span>
            <span>15</span>
            <span>30</span>
            <span>45</span>
            <span>60</span>
            <span>75</span>
            <span>90</span>
          </div>
        </div>

        {/* Previous Meetings */}
        <div className="previous-meetings">
          <div className="overlay"></div>
          <div className="content">
            <h2>PREVIOUS MEETINGS</h2>
            <div className="stats">
              <div className="stat wins">
                <div className="number">1</div>
                <div className="label">WINS</div>
              </div>
              <div className="stat draws">
                <div className="number">0</div>
                <div className="label">DRAWS</div>
              </div>
              <div className="stat losses">
                <div className="number">0</div>
                <div className="label">WINS</div>
              </div>
            </div>
          </div>
        </div>

        {/* Betting Form */}
        <div className="betting-form">
          <div className="toggle-buttons">
            <button className="toggle active">REAL</button>
            <button className="toggle">SIM</button>
          </div>
          <select className="input">
            <option>Nigeria</option>
          </select>
          <input type="text" placeholder="Booking Code" className="input" />
          <button className="load-button">Load</button>
          <p className="help-text">
            A booking code enables one to transfer a betslip between different
            devices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveBetting;
