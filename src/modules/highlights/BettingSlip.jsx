import "../../css/BettingSlip.css";
import React, { useEffect, useState, useContext } from "react";
import { OddContext } from "../../context/oddContext";
import { AuthApis } from "../../api";
import { Icon } from "@iconify/react";

const apiValues = new AuthApis();

function BettingSlip() {
  const {
    setOdds,
    Odds,
    setTeams,
    Teams,
    handleRemoveGame,
    handleRemoveBookingGame,
    setBookingCodeFixtures,
    bookingCodeFixtures,
    updateBookingWithCalculations,
  } = useContext(OddContext);

  const [stake, setStake] = useState(100);
  const [newGames, setNewGames] = useState([]);
  const [showPotentialWin, setShowPotentialWin] = useState(true);
  const [responseValue, setResponseValue] = useState(null);
  const [succesfulPlayedGames, setSuccesfulPlayedGames] = useState(null);
  const [BookingCode, setBookingCode] = useState("");
  const [bookingResquestValue, setBookingRequestValue] = useState(null);
  const [confirmRequest, setConfirmRequest] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponseValue(true);
    try {
      // Combine games from both bookingCodeFixtures and Teams if they exist
      let allGames = [];

      // Add games from bookingCodeFixtures if they exist
      if (bookingCodeFixtures?.games?.length) {
        const bookingGames = bookingCodeFixtures.games.map((game) => ({
          selection: game.selection,
          fixtureId: game.fixtureId,
          odd: game.odd,
        }));
        allGames = [...allGames, ...bookingGames];
      }

      // Add games from Teams if they exist
      if (Teams?.length) {
        const teamGames = Teams.map((team) => ({
          fixtureId: team.fixtureId,
          selection: team.selection,
          odd: team.odd,
        }));
        allGames = [...allGames, ...teamGames];
      }

      // Handle submission based on total number of games
      if (allGames.length === 0) {
        setError("No games selected");
        return;
      }

      let value;
      if (allGames.length === 1) {
        // Single game submission
        const { fixtureId, selection, odd } = allGames[0];
        value = await apiValues.handleOfflineSingle({
          fixtureId,
          selection,
          stake,
          odd,
        });
      } else {
        // Multiple games submission
        value = await apiValues.handleOfflineSingle({
          games: allGames,
          stake,
        });
      }

      // Update state with response
      setResponseValue(value);
      setShowPotentialWin(null);
      setSuccesfulPlayedGames(true);
    } catch (error) {
      console.error("Error processing games:", error);
      setError("Failed to process bet. Please try again.");
    }
  };

  // Handle booking code submission and validation

  const handleBookingSubmit = async (event) => {
    event.preventDefault();
    setConfirmRequest(true);
    setError(null);

    try {
      const value = await apiValues.handleBookingCode(BookingCode);
      console.log(value);
      if (value.success) {
        setBookingCodeFixtures(value.game);
        setBookingRequestValue(!bookingResquestValue);
        setShowPotentialWin(true);
      } else {
        setError(value.response?.data?.error || "Invalid booking code");
      }
    } catch (error) {
      setError("Failed to load booking code");
    } finally {
      setConfirmRequest(false);
    }
  };

  console.log(bookingCodeFixtures);
  const isBookingCodeValid = BookingCode?.length > 0;
  const isSelectionList = Teams?.length > 1;

  const handleBetting = (event) => {
    setStake(event.target.value);
  };

  const handleCodeValue = (event) => {
    setBookingCode(event.target.value);
  };

  const formatAmount = (amount) => {
    const number = parseFloat(amount || 0).toFixed(2);
    const [wholeNum, decimal] = number.toString().split(".");
    const withCommas = wholeNum.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${withCommas}.${decimal}`;
  };

  const calculatePotentialWin = () => {
    if (!Odds || !stake) return "0.00";
    return formatAmount(parseFloat(Odds) * parseFloat(stake));
  };

  useEffect(() => {
    // If there are no teams selected, reset odds to null
    if (!Teams?.length && !bookingCodeFixtures?.games?.length) {
      setOdds(null);
    }
  }, [Teams, bookingCodeFixtures]);

  const handleClearGames = () => {
    setOdds(null);
    setTeams(null);
    setBookingCodeFixtures(null);

    // Then reset local state
    setStake(DEFAULT_STAKE);
    setShowPotentialWin(true);
    setResponseValue(null);
    setSuccesfulPlayedGames(null);
    setBookingRequestValue(null);
    setBookingCode("");
    setError(null);
  };

  return (
    <div className="bettingcase">
      <div className="betslipcashout">
        <h4>BetSlip</h4>
        <h4>Cashout</h4>
      </div>
      {Teams ? (
        <div className="betcase">
          <button
            className={
              isSelectionList ? "clearallgames" : "clearallgames-invalid"
            }
            onClick={() => {
              handleClearGames();
            }}
          >
            Remove all
          </button>
          {Teams?.map((pickGames) => {
            return (
              <div key={pickGames._id}>
                <div className="gamestyle">
                  <div>
                    <p>{pickGames.selection}</p>
                    <p>{pickGames.team}</p>
                    <p>{pickGames.odd}</p>
                  </div>
                  <p
                    className="gamesbutton"
                    onClick={() => handleRemoveGame(pickGames.fixtureId)}
                  >
                    X
                  </p>
                </div>
              </div>
            );
          })}
          <div></div>

          {!showPotentialWin && (
            <div className="modalstyloing">
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>Potential Winnings</h3>
                  <div className="winnings-display">
                    <p className="totalWining">₦{calculatePotentialWin()}</p>
                    <p className="stake-info">Based on stake: ₦{stake}</p>
                  </div>
                  <div className="winbuttin">
                    <button
                      onClick={() => {
                        setShowPotentialWin(!showPotentialWin);
                        setResponseValue(null);
                      }}
                    >
                      Cansel
                    </button>
                    <button onClick={handleSubmit}>
                      {responseValue ? (
                        <Icon
                          icon="svg-spinners:180-ring-with-bg"
                          style={{
                            width: "50px",
                            height: "12px",
                          }}
                        />
                      ) : (
                        "Confirm"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {succesfulPlayedGames && (
            <div className="modalstyloing">
              <div className="modal-overlay">
                <div className="modal-content">
                  <Icon
                    icon="emojione:white-heavy-check-mark"
                    width="50"
                    height="64"
                  />
                  <h3>Submission Successful</h3>
                  <div className="winnings-display">
                    <div className="succestyle">
                      <p>Total Stake</p>
                      <p className="amount">{stake}</p>
                    </div>
                    <div className="succestyle">
                      <p>Potential Win</p>
                      <p className="stake-info">₦{calculatePotentialWin()}</p>
                    </div>
                    <div className="succestyle">
                      <p>Booking Code</p>
                      <p className="bookingcode">
                        {responseValue?.data.bookingId}
                      </p>
                    </div>
                  </div>
                  <div className="succebtn">
                    <button
                      onClick={() => {
                        setSuccesfulPlayedGames(null);
                        setShowPotentialWin(null);
                        setResponseValue(null);
                        handleClearGames();
                      }}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className={bookingResquestValue ? "hidBetSlip" : "oddsbet"}>
            <div>
              <p>To place a bet, click on the odds. Or insert a booking code</p>
              <form onSubmit={handleBookingSubmit}>
                <select className="selectoptions">
                  <option>Nigeria</option>
                  <option>Ghana</option>
                  <option>South africa</option>
                  <option>Nigeria</option>
                </select>
                {error && (
                  <p style={{ color: "red", margin: "7px 0 0 0" }}>
                    invalide Booking Code
                  </p>
                )}
                <input
                  onChange={handleCodeValue}
                  type="text"
                  placeholder="Booking code"
                  required
                  value={BookingCode}
                />
                <button
                  type="submit"
                  disabled={!isBookingCodeValid}
                  className={!isBookingCodeValid ? "" : "button-enabled"}
                >
                  {confirmRequest ? (
                    <Icon icon="svg-spinners:6-dots-rotate" width="20" />
                  ) : (
                    "Load"
                  )}
                </button>
              </form>
              <p>
                A booking code enables one to transfer a betslip between
                different devices.
              </p>
            </div>
          </div>
        </div>
      )}
      <div>
        {bookingResquestValue && (
          <div>
            <div>
              {bookingCodeFixtures?.games?.length > 1 ? (
                bookingCodeFixtures?.games?.map((gameList) => (
                  <div key={gameList.id} className="bookingcodestyle">
                    <div
                      onClick={() => {
                        handleRemoveBookingGame(gameList.fixtureId);
                      }}
                    >
                      X
                    </div>
                    <div>
                      <p>{`${gameList.selection} @${gameList.odd}`}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        {gameList.fixture.homeTeam} vs{" "}
                        {gameList.fixture.awayTeam}{" "}
                      </p>
                      <Icon icon="mingcute:time-line" width="15" />
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <>
                    <div
                      onClick={() => {
                        handleRemoveBookingGame(
                          bookingCodeFixtures.game.games[0].fixtureId
                        );
                      }}
                    >
                      X
                    </div>
                    <div>
                      <p>{`${bookingCodeFixtures?.selection} @${bookingCodeFixtures?.odd}`}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <p>
                        {bookingCodeFixtures?.fixture.homeTeam} vs{" "}
                        {bookingCodeFixtures?.fixture.awayTeam}
                      </p>
                      <Icon icon="mingcute:time-line" width="15" />
                    </div>
                  </>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {Teams || bookingResquestValue ? (
        <>
          <form
            onSubmit={(e) => {
              setShowPotentialWin(!showPotentialWin);
              e.preventDefault();
            }}
          >
            <div className="totalstake">
              <label>Total Stake</label>
              <input
                className="valueinput"
                type="number"
                value={stake}
                placeholder="min. 10"
                onChange={handleBetting}
              />
            </div>
            <div className="potentialwin">
              <p>Potential Win:</p>
              <p className="winAmount">{`₦${calculatePotentialWin()}`}</p>
            </div>
            <input className="btnstyle" type="submit" value="Place Bet" />
          </form>
        </>
      ) : null}
    </div>
  );
}

export default BettingSlip;
