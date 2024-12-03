import "../../css/BettingSlip.css";
import React, { useEffect, useState, useContext } from "react";
import { OddContext } from "../../context/oddContext";
import { AuthApis } from "../../api";
import { Icon } from "@iconify/react";

const apiValues = new AuthApis();

function BettingSlip() {
  const { setOdds, Odds, setTeams, Teams, handleRemoveGame } =
    useContext(OddContext);
  const [stake, setStake] = useState(100);
  const [newGames, setNewGames] = useState([]);
  const [showPotentialWin, setShowPotentialWin] = useState(null);
  const [responseValue, setResponseValue] = useState(null);
  const [succesfulPlayedGames, setSuccesfulPlayedGames] = useState(null);
  const [BookingCode, setBookingCode] = useState(null);
  const [bookingResquestValue, setBookingRequestValue] = useState(null);
  const [confirmRequest, setConfirmRequest] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponseValue(true);
    try {
      if (Teams.length === 1) {
        const { fixtureId, selection, odd } = Teams[0];
        setNewGames({ fixtureId: toString(fixtureId), selection, odd, stake });
        const value = await apiValues.handleOfflineSingle({
          fixtureId,
          selection,
          stake,
          odd,
        });
        setResponseValue(value);
        setShowPotentialWin(!showPotentialWin);
        setSuccesfulPlayedGames(true);
      } else if (Teams.length > 1) {
        const multipleGames = Teams.map((team) => ({
          fixtureId: team.fixtureId,
          selection: team.selection,
          odd: team.odd,
        }));
        setNewGames({
          games: multipleGames,
          stake,
        });
        const value = await apiValues.handleOfflineSingle({
          games: multipleGames,
          stake,
        });
        setSuccesfulPlayedGames(true);
        setResponseValue(value);
      }
    } catch (error) {
      console.error("Error processing games:", error);
    }
  };

  const isBookingCodeValid = BookingCode?.length > 0;
  const isSelectionList = Teams?.length > 1;

  const handleBetting = (event) => {
    setStake(event.target.value);
  };

  const handleCodeValue = (event) => {
    setBookingCode(event.target.value);
  };

  const handleBookingSubmit = async (event) => {
    setConfirmRequest(!confirmRequest);
    event.preventDefault();
    setError(null);
    const value = await apiValues.handleBookingCode(BookingCode);
    setConfirmRequest(null);
    if (value.success) {
      setConfirmRequest(false);
      setBookingRequestValue(true);
    } else {
      setConfirmRequest(false);
      setError(value.response.data.error);
    }
    setConfirmRequest(false);
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

  const handleClearGames = () => {
    setOdds(null);
    setTeams(null);
    setStake(100);
    setShowPotentialWin(null);
    setResponseValue(null);
    setSuccesfulPlayedGames(null);
    setNewGames([]);
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
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowPotentialWin(!showPotentialWin);
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
          </div>

          {showPotentialWin && (
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
            <button
              onClick={() => {
                setBookingRequestValue(null);
                setBookingCode("");
                setError(null);
              }}
            >
              remove all
            </button>
            <p>List of Games</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BettingSlip;
