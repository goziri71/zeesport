import React, { createContext, useState } from "react";

export const OddContext = createContext();

function OddContextProvider({ children }) {
  const [Odds, setOdds] = useState(null);
  const [Teams, setTeams] = useState(null);
  const [bookingCodeFixtures, setBookingCodeFixtures] = useState(null);
  const [bookingCodePopup, setBookingCodePopup] = useState(null);
  const [verifyData, setVerifyData] = useState(null);
  const [accountSpinner, setAccountSpinner] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  console.log(bookingCodePopup);
  console.log(Teams);
  console.log(bookingCodeFixtures);
  console.log(accountSpinner);

  // Existing calculations
  const calculateTotalOdds = (games) => {
    if (!games || games.length === 0) return 0;
    return games.reduce((total, game) => total * parseFloat(game.odd), 1);
  };

  const updateBookingWithCalculations = (games, stake = 0) => {
    const newOdds = calculateTotalOdds(games);
    const newBonus = newOdds > 5 ? 0.05 * newOdds : 0;
    const newWinningAmount = (newOdds + newBonus) * stake;

    return {
      games,
      odds: newOdds,
      bonus: newBonus,
      winningAmount: newWinningAmount,
      stake,
    };
  };

  const handleSetBookingFixtures = (fixtureData) => {
    if (!fixtureData?.games?.length) {
      setBookingCodeFixtures(null);
      setOdds(0);
      setTeams(null);
      return;
    }

    const updatedFixture = updateBookingWithCalculations(
      fixtureData.games,
      fixtureData.stake
    );
    setBookingCodeFixtures({ ...fixtureData, ...updatedFixture });
    setTeams(null);
    setOdds(updatedFixture.odds);
  };

  const handleRemoveGame = (fixtureId) => {
    if (!Teams?.length) return;

    const newTeams = Teams.filter((team) => team.fixtureId !== fixtureId);
    setTeams(newTeams);
    setOdds(newTeams.length ? calculateTotalOdds(newTeams) : 0);
  };

  const handleRemoveBookingGame = (fixtureId) => {
    if (!bookingCodeFixtures?.games?.length) return;
    const updatedGames = bookingCodeFixtures.games.filter(
      (game) => game.fixtureId !== fixtureId
    );
    if (!updatedGames.length) {
      setBookingCodeFixtures(null);
      setOdds(0);
      return;
    }
    const updatedFixture = updateBookingWithCalculations(
      updatedGames,
      bookingCodeFixtures.stake
    );
    setBookingCodeFixtures({ ...bookingCodeFixtures, ...updatedFixture });
    setOdds(updatedFixture.odds);
  };

  const handleAddGameToBooking = (newGame) => {
    const newGameData = {
      fixtureId: newGame.fixtureId,
      selection: newGame.selection,
      odd: parseFloat(newGame.odd),
      fixture: {
        homeTeam: newGame.team.split(" vs ")[0],
        awayTeam: newGame.team.split(" vs ")[1],
      },
    };
    if (
      bookingCodeFixtures?.games?.some(
        (game) => game.fixtureId === newGame.fixtureId
      )
    ) {
      return;
    }
    const updatedGames = bookingCodeFixtures?.games
      ? [...bookingCodeFixtures.games, newGameData]
      : [newGameData];
    const updatedFixture = updateBookingWithCalculations(
      updatedGames,
      bookingCodeFixtures?.stake || 0
    );
    setBookingCodeFixtures({
      ...(bookingCodeFixtures || {}),
      ...updatedFixture,
    });
    setOdds(updatedFixture.odds);
  };

  return (
    <OddContext.Provider
      value={{
        Odds,
        setOdds,
        Teams,
        setTeams,
        handleRemoveGame,
        handleRemoveBookingGame,
        handleAddGameToBooking,
        setBookingCodeFixtures,
        handleSetBookingFixtures,
        bookingCodeFixtures,
        updateBookingWithCalculations,
        bookingCodePopup,
        setBookingCodePopup,
        verifyData,
        setVerifyData,
        accountSpinner,
        setAccountSpinner,
        otp,
        setOtp,
      }}
    >
      {children}
    </OddContext.Provider>
  );
}

export default OddContextProvider;
