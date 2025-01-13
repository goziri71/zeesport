import React, { useState } from "react";
import SecondHeader from "../../components/SecondHeader";
import "../../css/ScheduleVirtual.css";

const ScheduleVirtual = () => {
  const [activeTab, setActiveTab] = useState("football");

  const virtualSports = [
    { id: "football", name: "Football", icon: "⚽" },
    { id: "horse", name: "Horse Racing", icon: "🏇" },
    { id: "dogs", name: "Dog Racing", icon: "🐕" },
    { id: "tennis", name: "Tennis", icon: "🎾" },
  ];

  const scheduleData = {
    football: [
      {
        id: 1,
        league: "Virtual Premier",
        time: "2 MIN",
        team1: "Arsenal",
        team2: "Chelsea",
        odds: { 1: 2.5, X: 3.2, 2: 2.8 },
      },
      {
        id: 2,
        league: "Euro League",
        time: "5 MIN",
        team1: "Barcelona",
        team2: "Real Madrid",
        odds: { 1: 1.9, X: 3.5, 2: 3.8 },
      },
      {
        id: 3,
        league: "Serie A",
        time: "8 MIN",
        team1: "Milan",
        team2: "Inter",
        odds: { 1: 2.2, X: 3.0, 2: 3.2 },
      },
    ],
    horse: [
      { id: 4, race: "Race 1", time: "1 MIN", runners: 8, track: "Dirt" },
      { id: 5, race: "Race 2", time: "4 MIN", runners: 6, track: "Turf" },
    ],
    dogs: [
      {
        id: 6,
        race: "Sprint Cup",
        time: "3 MIN",
        runners: 6,
        track: "Standard",
      },
      { id: 7, race: "Chase Cup", time: "6 MIN", runners: 8, track: "Elite" },
    ],
    tennis: [
      {
        id: 8,
        tournament: "Virtual Open",
        time: "2 MIN",
        player1: "Player A",
        player2: "Player B",
        odds: { 1: 1.8, 2: 2.1 },
      },
      {
        id: 9,
        tournament: "Cyber Cup",
        time: "7 MIN",
        player1: "Player C",
        player2: "Player D",
        odds: { 1: 1.6, 2: 2.4 },
      },
    ],
  };

  const [sportLink] = useState([]);

  return (
    <div className="backgc">
      <div className="second-header">
        <SecondHeader text={sportLink} />
      </div>
      <div className="schedule-virtual">
        <div className="header">
          <h2>Virtual Sports Schedule</h2>
          <div className="live-indicator">
            <span className="pulse"></span>
            LIVE NOW
          </div>
        </div>

        <div className="sports-tabs">
          {virtualSports.map((sport) => (
            <button
              key={sport.id}
              className={`tab ${activeTab === sport.id ? "active" : ""}`}
              onClick={() => setActiveTab(sport.id)}
            >
              <span className="sport-icon">{sport.icon}</span>
              {sport.name}
            </button>
          ))}
        </div>

        <div className="schedule-content">
          {activeTab === "football" && (
            <div className="football-schedule">
              {scheduleData.football.map((match) => (
                <div key={match.id} className="match-card">
                  <div className="match-header">
                    <span className="league">{match.league}</span>
                    <span className="time">{match.time}</span>
                  </div>
                  <div className="teams">
                    <span>{match.team1}</span>
                    <span>vs</span>
                    <span>{match.team2}</span>
                  </div>
                  <div className="odds">
                    <button>
                      1 <span>{match.odds["1"]}</span>
                    </button>
                    <button>
                      X <span>{match.odds["X"]}</span>
                    </button>
                    <button>
                      2 <span>{match.odds["2"]}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "horse" && (
            <div className="racing-schedule">
              {scheduleData.horse.map((race) => (
                <div key={race.id} className="race-card">
                  <div className="race-header">
                    <span className="race-name">{race.race}</span>
                    <span className="time">{race.time}</span>
                  </div>
                  <div className="race-info">
                    <span>{race.runners} Runners</span>
                    <span>{race.track}</span>
                  </div>
                  <button className="view-race">View Race Card</button>
                </div>
              ))}
            </div>
          )}

          {/* Similar blocks for dogs and tennis */}
        </div>

        <div className="quick-links">
          <button className="quick-link">Upcoming</button>
          <button className="quick-link">Results</button>
          <button className="quick-link">Rules</button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleVirtual;
