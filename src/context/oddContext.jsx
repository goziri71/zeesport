import React, { createContext, useState } from "react";

export const OddContext = createContext();

function OddContextProvider({ children }) {
  const [Odds, setOdds] = useState(null);
  const [Teams, setTeams] = useState(null);

  const handleRemoveGame = (fixtureId) => {
    if (!Teams || Teams.length === 0) {
      return;
    }
    const newTeams = Teams.filter((team) => team.fixtureId !== fixtureId);
    setTeams(newTeams);
    if (newTeams.length > 0) {
      const newTotalOdds = newTeams.reduce(
        (total, team) => total * parseFloat(team.odd),
        1
      );
      setOdds(newTotalOdds);
    } else {
      setOdds(0);
    }
  };

  return (
    <OddContext.Provider
      value={{
        setOdds,
        Odds,
        setTeams,
        Teams,
        handleRemoveGame,
      }}
    >
      {children}
    </OddContext.Provider>
  );
}

export default OddContextProvider;
